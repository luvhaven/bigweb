'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type, duration = 5000) => {
    const id = Date.now().toString() + Math.random()
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }]
    }))

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id)
        }))
      }, duration)
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
}))

const toastIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle
}

const toastStyles = {
  success: 'bg-green-500/10 border-green-500/50 text-green-500',
  error: 'bg-red-500/10 border-red-500/50 text-red-500',
  info: 'bg-blue-500/10 border-blue-500/50 text-blue-500',
  warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500'
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-3 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={`
                relative flex items-center gap-3 p-4 rounded-lg border backdrop-blur-xl
                ${toastStyles[toast.type]}
                shadow-lg hover:shadow-xl transition-shadow
              `}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <p className="flex-1 text-sm font-medium text-foreground">
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Helper function for easy toast usage
export const toast = {
  success: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'success', duration),
  error: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'error', duration),
  info: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'info', duration),
  warning: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'warning', duration)
}
