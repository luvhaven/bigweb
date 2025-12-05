'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

// Profile type - can come from admin_users table or user metadata
interface UserProfile {
    role: 'admin' | 'editor' | 'viewer'
    name?: string
    avatar?: string
}

// Admin user type with role
interface AdminUser extends User {
    role?: 'admin' | 'editor' | 'viewer'
    name?: string
    avatar?: string
}

interface AuthContextType {
    user: AdminUser | null
    session: Session | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>
    signOut: () => Promise<void>
    isAdmin: boolean
    isEditor: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper to fetch user profile
async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
    try {
        // Try to fetch from admin_users table
        const { data, error } = await supabase
            .from('admin_users')
            .select('role, name, avatar')
            .eq('id', userId)
            .single()

        if (error || !data) {
            // If no admin profile, assume viewer role
            return { role: 'viewer' }
        }

        return data as UserProfile
    } catch {
        return { role: 'viewer' }
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            try {
                const { data: { session: initialSession } } = await supabase.auth.getSession()
                setSession(initialSession)

                if (initialSession?.user) {
                    const profile = await fetchUserProfile(initialSession.user.id)

                    setUser({
                        ...initialSession.user,
                        role: profile?.role || 'viewer',
                        name: profile?.name || initialSession.user.email?.split('@')[0],
                        avatar: profile?.avatar
                    })
                }
            } catch (error) {
                console.error('Error getting session:', error)
            } finally {
                setLoading(false)
            }
        }

        getInitialSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event: AuthChangeEvent, newSession: Session | null) => {
                setSession(newSession)

                if (newSession?.user) {
                    const profile = await fetchUserProfile(newSession.user.id)

                    setUser({
                        ...newSession.user,
                        role: profile?.role || 'viewer',
                        name: profile?.name || newSession.user.email?.split('@')[0],
                        avatar: profile?.avatar
                    })
                } else {
                    setUser(null)
                }

                if (event === 'SIGNED_OUT') {
                    router.push('/admin/login')
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [router])

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                return { error }
            }

            return { error: null }
        } catch (error) {
            return { error: error as Error }
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setSession(null)
    }

    const value: AuthContextType = {
        user,
        session,
        loading,
        signIn,
        signOut,
        isAdmin: user?.role === 'admin',
        isEditor: user?.role === 'admin' || user?.role === 'editor'
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

// Hook for protected routes
export function useRequireAuth(requiredRole?: 'admin' | 'editor') {
    const { user, loading, isAdmin, isEditor } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login')
        }

        if (!loading && user && requiredRole === 'admin' && !isAdmin) {
            router.push('/admin')
        }

        if (!loading && user && requiredRole === 'editor' && !isEditor) {
            router.push('/admin')
        }
    }, [user, loading, isAdmin, isEditor, requiredRole, router])

    return { user, loading, isAdmin, isEditor }
}
