'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, SupabaseClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

type Profile = any

interface AuthContextType {
    user: User | null
    profile: Profile | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    signOut: () => Promise<void>
    updateProfile: (updates: Partial<Profile>) => Promise<void>
    supabase: SupabaseClient
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [supabase] = useState(() => createClient())
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const loadProfile = useCallback(async (currentUser: User) => {
        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('id', currentUser.id)
                .single()

            if (data) {
                setProfile(data)
            } else {
                console.warn('No admin profile found for user:', currentUser.id)
                // Fallback or handle missing profile
                setProfile(null)
            }
        } catch (e) {
            console.error('Error loading profile:', e)
        }
    }, [supabase])

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                setUser(session?.user ?? null)
                if (session?.user) {
                    await loadProfile(session.user)
                }
            } catch (error) {
                console.error('Error initializing auth:', error)
            } finally {
                setLoading(false)
            }
        }

        initializeAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state change:', event)
            setUser(session?.user ?? null)

            if (session?.user) {
                // Load profile in background, don't block UI if not needed immediately
                loadProfile(session.user)
            } else {
                setProfile(null)
            }

            if (event === 'SIGNED_OUT') {
                router.refresh()
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, router, loadProfile])



    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        // onAuthStateChange will handle state updates
    }

    const signUp = async (email: string, password: string, fullName: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
        })
        if (error) throw error
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setProfile(null)
        router.push('/admin/login')
    }

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user) return
        const { data, error } = await supabase
            .from('admin_users')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single()

        if (error) throw error
        setProfile(data)
    }

    const value = {
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        supabase
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export function usePermissions() {
    const { profile } = useAuth()

    const hasPermission = (permission: string): boolean => {
        if (!profile) return false
        if (profile.role === 'admin' || profile.role === 'super_admin') return true
        // Add granular permissions if needed
        return false
    }

    const hasRole = (role: string | string[]): boolean => {
        if (!profile) return false
        if (Array.isArray(role)) return role.includes(profile.role)
        return profile.role === role
    }

    return {
        hasPermission,
        hasRole,
        isAdmin: profile?.role === 'admin' || profile?.role === 'super_admin',
        isEditor: profile?.role === 'editor',
    }
}
