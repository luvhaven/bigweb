'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/client'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
    user: User | null
    profile: Profile | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    signOut: () => Promise<void>
    updateProfile: (updates: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    // Initialise session and listen for auth changes
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                loadProfile(session.user.id)
            } else {
                setLoading(false)
            }
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                loadProfile(session.user.id)
            } else {
                setProfile(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const loadProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) {
                if (error.code === 'PGRST116') {
                    // No profile found, which is expected for new users before trigger runs
                    console.log('No profile found for user:', userId)
                } else {
                    console.error('Error loading profile:', JSON.stringify(error, null, 2))
                }
                setProfile(null)
            } else {
                setProfile(data)
            }
        } catch (e) {
            console.error('Unexpected error loading profile:', e)
            setProfile(null)
        } finally {
            setLoading(false)
        }
    }

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
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
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user) throw new Error('No user logged in')
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single()
        if (error) throw error
        setProfile(data)
    }

    const value: AuthContextType = {
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
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

// Permission checking hook
export function usePermissions() {
    const { profile } = useAuth()

    const hasPermission = (permission: string): boolean => {
        if (!profile) return false
        if (profile.role === 'admin') return true
        const rolePermissions: Record<string, string[]> = {
            editor: ['manage_pages', 'publish_pages', 'manage_media'],
            client: [],
            viewer: [],
        }
        return rolePermissions[profile.role]?.includes(permission) ?? false
    }

    const hasRole = (role: string | string[]): boolean => {
        if (!profile) return false
        if (Array.isArray(role)) return role.includes(profile.role)
        return profile.role === role
    }

    return {
        hasPermission,
        hasRole,
        isAdmin: profile?.role === 'admin',
        isEditor: profile?.role === 'editor',
        isClient: profile?.role === 'client',
    }
}
