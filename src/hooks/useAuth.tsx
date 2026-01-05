'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, SupabaseClient } from '@supabase/supabase-js'

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

    // Initialise session and listen for auth changes
    useEffect(() => {
        let mounted = true
        console.log('AuthProvider: Mounting...')

        // Failsafe: If nothing happens within 5 seconds, stop loading
        const timeoutId = setTimeout(() => {
            if (mounted && loading) {
                console.warn('AuthProvider: Auth timed out, forcing loading false')
                setLoading(false)
            }
        }, 5000)

        const initializeAuth = async () => {
            console.log('AuthProvider: initializeAuth starting...')
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                if (error) {
                    console.error('AuthProvider: getSession error', error)
                }

                if (mounted) {
                    // console.log('AuthProvider: Session retrieved', session?.user?.email)
                    setUser(session?.user ?? null)

                    if (session?.user) {
                        // console.log('AuthProvider: Loading profile...')
                        await loadProfile(session.user)
                        // console.log('AuthProvider: Profile loaded')
                    }
                }
            } catch (error) {
                console.error('AuthProvider: Error checking session:', error)
            } finally {
                if (mounted) {
                    // console.log('AuthProvider: Setting loading false (init)')
                    setLoading(false)
                    clearTimeout(timeoutId)
                }
            }
        }

        initializeAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            // console.log('AuthProvider: Auth state change:', event)
            if (!mounted) return

            setUser(session?.user ?? null)

            if (session?.user) {
                await loadProfile(session.user)
            } else {
                setProfile(null)
            }
            // console.log('AuthProvider: Setting loading false (auth change)')
            setLoading(false)
            clearTimeout(timeoutId)
        })

        return () => {
            mounted = false
            clearTimeout(timeoutId)
            subscription.unsubscribe()
        }
    }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

    const loadProfile = async (currentUser: User) => {
        try {
            // First try fetching by ID
            let { data, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('id', currentUser.id)
                .single()

            // If not found by ID, try fetching by email
            // We use the passed currentUser object because React state 'user' might be stale
            if (!data && currentUser.email) {
                const { data: emailData } = await supabase
                    .from('admin_users')
                    .select('*')
                    .eq('email', currentUser.email)
                    .single()

                if (emailData) {
                    data = emailData
                    error = null
                }
            }

            if (error) {
                console.log('No admin profile found or error:', error.message)
                setProfile(null)
            } else {
                setProfile(data as Profile)
            }
        } catch (e) {
            console.error('Unexpected error loading profile:', e)
            setProfile(null)
        }
    }

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        // Immediate state update to prevent redirect race condition
        if (data.session?.user) {
            setUser(data.session.user)
            // Don't await profile loading to prevent login blocking
            loadProfile(data.session.user).catch(err =>
                console.error('Background profile load failed:', err)
            )
        }
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
        setUser(null)
        setProfile(null)
    }

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user) throw new Error('No user logged in')
        const { data, error } = await supabase
            .from('admin_users')
            .update(updates as any)
            .eq('id', user.id)
            .select()
            .single()
        if (error) throw error
        setProfile(data as Profile)
    }

    const value: AuthContextType = {
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
