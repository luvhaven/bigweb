'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { projectsAPI } from '@/lib/api/projects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import AdminHeader from '@/components/admin/AdminHeader'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await projectsAPI.getAll()
      setProjects(data || [])
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await projectsAPI.delete(id)
      setProjects(projects.filter(p => p.id !== id))
      toast.success('Project deleted successfully')
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client_id?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <AdminHeader
            title="Projects"
            description="Manage your portfolio and client projects."
          />
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-accent hover:bg-accent/90">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-20">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
          <p className="text-muted-foreground mb-4">No projects found</p>
          <Link href="/admin/projects/new">
            <Button variant="outline">Create your first project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="aspect-video bg-secondary relative overflow-hidden">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                    project.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                    {project.status || 'Draft'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg line-clamp-1">{project.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/admin/projects/${project.id}`}>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description || 'No description provided.'}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                  <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  <Link href={`/admin/projects/${project.id}`}>
                    <Button variant="ghost" size="sm" className="h-8">
                      Details <Eye className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
