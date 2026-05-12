// Client-side data management system
// Uses localStorage to persist data and simulate backend

export interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  year: string
  client: string
  result: string
  technologies: string[]
  featured: boolean
  visible: boolean
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  firstName: string
  lastName: string
  email: string
  company: string
  inspiration: string
  budget: string
  message: string
  status: 'unread' | 'read' | 'replied'
  createdAt: string
}

export interface SiteSettings {
  siteName: string
  siteTagline: string
  contactEmail: string
  contactPhone: string
  heroTitle: string
  heroSubtitle: string
  aboutText: string
  servicesEnabled: boolean
  portfolioEnabled: boolean
  updatedAt: string
}

export interface AdminUser {
  email: string
  password: string
  name: string
  role: string
}

// Initialize default data
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'karat',
    title: 'Karat Financial',
    category: 'Fintech Platform',
    description: 'Revolutionary fintech platform for creators',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90',
    year: '2024',
    client: 'Karat Inc.',
    result: '+340% user growth',
    technologies: ['Next.js', 'TypeScript', 'Stripe'],
    featured: true,
    visible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'stellar',
    title: 'Stellar Networks',
    category: 'Blockchain Infrastructure',
    description: 'Enterprise blockchain solution',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=90',
    year: '2024',
    client: 'Stellar Corp',
    result: '+250% transaction speed',
    technologies: ['React', 'Web3', 'Solidity'],
    featured: true,
    visible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'innovate',
    title: 'Innovate SaaS',
    category: 'Enterprise Software',
    description: 'Next-gen enterprise management platform',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90',
    year: '2023',
    client: 'Innovate Inc',
    result: '+180% productivity',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
    featured: true,
    visible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'velocity',
    title: 'Velocity Commerce',
    category: 'E-commerce Platform',
    description: 'High-performance e-commerce solution',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=90',
    year: '2023',
    client: 'Velocity Ltd',
    result: '+420% conversions',
    technologies: ['Next.js', 'Shopify', 'Tailwind'],
    featured: false,
    visible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'BIGWEB',
  siteTagline: 'Elite Web Development',
  contactEmail: 'hello@bigweb.com',
  contactPhone: '+1 (555) 123-4567',
  heroTitle: 'Transform Your Digital Presence',
  heroSubtitle: 'Award-Winning Design',
  aboutText: 'We craft exceptional digital experiences that drive measurable results.',
  servicesEnabled: true,
  portfolioEnabled: true,
  updatedAt: new Date().toISOString()
}

// Super Admin Account
const SUPER_ADMIN: AdminUser = {
  email: 'dorizowan@gmail.com',
  password: '&DannyDev1&',
  name: 'Daniel Oriazowan',
  role: 'Super Admin'
}

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'bigweb_projects',
  MESSAGES: 'bigweb_messages',
  SETTINGS: 'bigweb_settings',
  ADMIN_USER: 'bigweb_admin_user',
  INITIALIZED: 'bigweb_initialized'
}

// Initialize data store
export function initializeDataStore() {
  if (typeof window === 'undefined') return
  
  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED)
  if (!initialized) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS))
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS))
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]))
    localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(SUPER_ADMIN))
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true')
  }
}

// Admin Authentication
export function validateAdmin(email: string, password: string): AdminUser | null {
  if (typeof window === 'undefined') return null
  
  // Ensure admin user is stored
  let adminData = localStorage.getItem(STORAGE_KEYS.ADMIN_USER)
  if (!adminData) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(SUPER_ADMIN))
    adminData = JSON.stringify(SUPER_ADMIN)
  }
  
  const admin: AdminUser = JSON.parse(adminData)
  
  // Trim inputs
  const trimmedEmail = email.trim().toLowerCase()
  const trimmedPassword = password.trim()
  const adminEmail = admin.email.trim().toLowerCase()
  
  // Check credentials (case-insensitive email)
  if (trimmedEmail === adminEmail && trimmedPassword === admin.password) {
    return admin
  }
  
  return null
}

// Projects CRUD
export function getProjects(): Project[] {
  if (typeof window === 'undefined') return DEFAULT_PROJECTS
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS)
  return data ? JSON.parse(data) : DEFAULT_PROJECTS
}

export function getVisibleProjects(): Project[] {
  return getProjects().filter(p => p.visible)
}

export function getProjectById(id: string): Project | null {
  return getProjects().find(p => p.id === id) || null
}

export function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
  const projects = getProjects()
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  projects.push(newProject)
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
  return newProject
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getProjects()
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) return null
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
  return projects[index]
}

export function deleteProject(id: string): boolean {
  const projects = getProjects()
  const filtered = projects.filter(p => p.id !== id)
  if (filtered.length === projects.length) return false
  
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered))
  return true
}

// Messages CRUD
export function getMessages(): Message[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES)
  return data ? JSON.parse(data) : []
}

export function getUnreadMessagesCount(): number {
  return getMessages().filter(m => m.status === 'unread').length
}

export function createMessage(message: Omit<Message, 'id' | 'status' | 'createdAt'>): Message {
  const messages = getMessages()
  const newMessage: Message = {
    ...message,
    id: Date.now().toString(),
    status: 'unread',
    createdAt: new Date().toISOString()
  }
  messages.unshift(newMessage)
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
  return newMessage
}

export function updateMessageStatus(id: string, status: Message['status']): boolean {
  const messages = getMessages()
  const index = messages.findIndex(m => m.id === id)
  if (index === -1) return false
  
  messages[index].status = status
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
  return true
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages()
  const filtered = messages.filter(m => m.id !== id)
  if (filtered.length === messages.length) return false
  
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filtered))
  return true
}

// Settings CRUD
export function getSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS)
  return data ? JSON.parse(data) : DEFAULT_SETTINGS
}

export function updateSettings(updates: Partial<SiteSettings>): SiteSettings {
  const settings = getSettings()
  const updated = {
    ...settings,
    ...updates,
    updatedAt: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated))
  return updated
}

// Event system for real-time updates
const listeners: { [key: string]: Function[] } = {}

export function subscribeToChanges(key: string, callback: Function) {
  if (!listeners[key]) listeners[key] = []
  listeners[key].push(callback)
  
  return () => {
    listeners[key] = listeners[key].filter(cb => cb !== callback)
  }
}

export function notifyChanges(key: string) {
  if (listeners[key]) {
    listeners[key].forEach(callback => callback())
  }
}
