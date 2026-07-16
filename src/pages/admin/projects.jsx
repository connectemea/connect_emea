import React, { useState, useEffect, useCallback } from 'react';
import {
  FolderGit2, ExternalLink, Plus, Edit2, Trash2, Search, Filter,
  ChevronDown, Loader2, Globe, Github, AlertTriangle, Copy, Check,
  Laptop, Code, Link, Briefcase, X
} from 'lucide-react';
import { supabase } from '@/config/supabase';
import { toast } from 'sonner';

const CATEGORIES = ['Hiring', 'Internship', 'Events', 'Website', 'GitHub', 'Publications', 'Internal Tools', 'Education', 'Showcase', 'Other'];
const STATUSES = ['Active', 'Maintenance', 'Deprecated'];

const SEED_PROJECTS = [
  {
    name: 'Connect Foundation Website',
    description: 'The official live website of the Connect Foundation community.',
    url: 'https://connectfoundation.in/',
    category: 'Website',
    status: 'Active'
  },
  {
    name: 'Hiring Portal',
    description: 'Connect EMEA\'s official hiring platform for team members and interns.',
    url: 'https://hiring.connectemea.in',
    category: 'Hiring',
    status: 'Active'
  },
  {
    name: 'Interns Portal',
    description: 'Platform for intern tracking, training, and coordination.',
    url: 'https://interns.connectemea.in',
    category: 'Internship',
    status: 'Active'
  },
  {
    name: 'Elevate Hacknight',
    description: 'Official site for Elevate hackathons and community events.',
    url: 'https://elevate.connectemea.in',
    category: 'Events',
    status: 'Active'
  },
  {
    name: 'Main Website',
    description: 'Connect EMEA official organization landing page with different dark designs.',
    url: 'https://connect-emea-website.vercel.app',
    category: 'Website',
    status: 'Active'
  },
  {
    name: 'GitHub Organization',
    description: 'Open source repositories and project codebases for Connect EMEA.',
    url: 'https://github.com/connectemea',
    category: 'GitHub',
    status: 'Active'
  },
  {
    name: 'Letterpad Blog',
    description: 'Official blogging and news publication platform.',
    url: 'https://connect-letterpad.vercel.app',
    category: 'Publications',
    status: 'Active'
  },
  {
    name: 'Events Upload',
    description: 'Internal asset and banner uploading service for events.',
    url: 'https://connect-events-upload.vercel.app',
    category: 'Internal Tools',
    status: 'Active'
  },
  {
    name: 'Bibliotheca',
    description: 'Resource library, reading list, and knowledge base.',
    url: 'https://bibliotheca.connectemea.in',
    category: 'Education',
    status: 'Active'
  },
  {
    name: 'Build EMEA',
    description: 'Project building space and developer showcase board.',
    url: 'https://buildemea.connectemea.in/#/',
    category: 'Showcase',
    status: 'Active'
  }
];

const emptyForm = {
  name: '',
  description: '',
  url: '',
  category: 'Website',
  status: 'Active'
};

function StatusBadge({ status }) {
  const cls = status === 'Active'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : status === 'Maintenance'
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-zinc-100 text-zinc-600 border-zinc-200';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}

function CategoryIcon({ category }) {
  const cls = "w-4 h-4 text-zinc-500";
  switch (category) {
    case 'GitHub': return <Github className={cls} />;
    case 'Website': return <Globe className={cls} />;
    case 'Hiring': return <Briefcase className={cls} />;
    case 'Internship': return <Laptop className={cls} />;
    case 'Internal Tools': return <Code className={cls} />;
    default: return <FolderGit2 className={cls} />;
  }
}

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group flex flex-col justify-between h-full">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600">
              <CategoryIcon category={project.category} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-zinc-950 text-base truncate group-hover:text-orange-600 transition-colors">{project.name}</h3>
              <p className="text-xs text-zinc-400 font-medium truncate">{project.category}</p>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-zinc-600 text-sm line-clamp-3 mb-4 leading-relaxed h-[60px] overflow-hidden">
          {project.description || 'No description provided.'}
        </p>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            <Link className="w-3.5 h-3.5" />
            <span className="truncate max-w-[200px]">{project.url.replace(/^https?:\/\//, '')}</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        )}
      </div>

      <div className="px-5 py-3.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
          {project.is_local ? 'Local Mode' : 'Cloud Database'}
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => onEdit(project)}
            className="p-1.5 rounded-lg hover:bg-zinc-200/60 text-zinc-500 hover:text-zinc-950 transition-colors"
            title="Edit Project"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(project)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors"
            title="Remove Project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, onSaved }) {
  const [form, setForm] = useState(project ? { ...project } : { ...emptyForm });
  const [saving, setSaving] = useState(false);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Project Name is required'); return; }
    setSaving(true);

    try {
      if (project?.id) {
        if (project.is_local) {
          // Local Storage update
          const locals = JSON.parse(localStorage.getItem('connect_projects') || '[]');
          const updated = locals.map(p => p.id === project.id ? { ...form, updated_at: new Date() } : p);
          localStorage.setItem('connect_projects', JSON.stringify(updated));
          toast.success('Project updated locally');
        } else {
          // Supabase update
          const payload = { ...form };
          delete payload.id;
          delete payload.created_at;
          delete payload.updated_at;
          const { error } = await supabase.from('projects').update(payload).eq('id', project.id);
          if (error) throw error;
          toast.success('Project updated in Supabase');
        }
      } else {
        // Create new
        const isLocalOnly = localStorage.getItem('connect_projects_use_local') === 'true';
        if (isLocalOnly) {
          const locals = JSON.parse(localStorage.getItem('connect_projects') || '[]');
          const newProj = {
            ...form,
            id: 'local_' + Math.random().toString(36).slice(2, 9),
            is_local: true,
            created_at: new Date(),
            updated_at: new Date()
          };
          localStorage.setItem('connect_projects', JSON.stringify([...locals, newProj]));
          toast.success('Project added locally');
        } else {
          const { error } = await supabase.from('projects').insert([form]);
          if (error) throw error;
          toast.success('Project added to Supabase');
        }
      }
      onSaved();
    } catch (err) {
      toast.error(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900">{project ? 'Edit Project' : 'Add Project'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Project Name *</label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="e.g. Hiring Portal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Project URL (Redirect Link)</label>
            <input
              type="url"
              value={form.url}
              onChange={e => set('url', e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="https://hiring.connectemea.in"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              placeholder="Briefly describe what this project is for..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {project ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ project, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  
  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (project.is_local) {
        const locals = JSON.parse(localStorage.getItem('connect_projects') || '[]');
        const filtered = locals.filter(p => p.id !== project.id);
        localStorage.setItem('connect_projects', JSON.stringify(filtered));
        toast.success('Project deleted locally');
      } else {
        const { error } = await supabase.from('projects').delete().eq('id', project.id);
        if (error) throw error;
        toast.success('Project deleted from Supabase');
      }
      onDeleted();
    } catch (err) {
      toast.error(err.message || 'Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 text-center mb-1">Remove Project</h3>
        <p className="text-sm text-zinc-500 text-center mb-6">
          Remove <span className="font-semibold text-zinc-800">{project.name}</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-semibold">Cancel</button>
          <button onClick={handleDelete} disabled={deleting}
            className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editProject, setEditProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteProject, setDeleteProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [localMode, setLocalMode] = useState(false);
  const [stats, setStats] = useState({ total: 0, active: 0, maintenance: 0, categories: 0 });

  const sqlCode = `-- Run this in your Supabase SQL Editor to create the projects table:
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  url text,
  category text default 'Website',
  status text default 'Active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.projects enable row level security;

-- Create policies (Allow everyone to select, authenticated users to insert/update/delete)
create policy "Allow public read access" on public.projects for select using (true);
create policy "Allow full access for authenticated admins" on public.projects for all using (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    toast.success('SQL code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStats = (list) => {
    setStats({
      total: list.length,
      active: list.filter(p => p.status === 'Active').length,
      maintenance: list.filter(p => p.status === 'Maintenance').length,
      categories: new Set(list.map(p => p.category)).size
    });
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Try to fetch from Supabase
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        // If table doesn't exist, we fall back to localStorage
        console.warn("Supabase projects table error (using local storage fallback):", error);
        throw error;
      }

      localStorage.setItem('connect_projects_use_local', 'false');
      setLocalMode(false);
      setProjects(data || []);
      calculateStats(data || []);
    } catch (err) {
      // Fallback: load from localStorage
      setLocalMode(true);
      localStorage.setItem('connect_projects_use_local', 'true');
      
      let locals = localStorage.getItem('connect_projects');
      if (!locals) {
        // Initialize with default SEED_PROJECTS if not present
        const seeded = SEED_PROJECTS.map((p, idx) => ({
          ...p,
          id: `seed_${idx}`,
          is_local: true,
          created_at: new Date(),
          updated_at: new Date()
        }));
        localStorage.setItem('connect_projects', JSON.stringify(seeded));
        locals = JSON.stringify(seeded);
      }

      const parsedLocals = JSON.parse(locals);
      setProjects(parsedLocals);
      calculateStats(parsedLocals);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSaved = () => {
    setShowModal(false);
    setEditProject(null);
    fetchProjects();
  };

  const handleDeleted = () => {
    setDeleteProject(null);
    fetchProjects();
  };

  // Client side search and filter
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) || 
                          p.description?.toLowerCase().includes(search.toLowerCase()) ||
                          p.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Projects Management</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Manage connected portals, tools, and organization repositories</p>
        </div>
        <button
          onClick={() => { setEditProject(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-orange-200"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* SQL Setup Helper (Visible only in local storage fallback mode) */}
      {localMode && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm animate-pulse-subtle">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600 flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 text-sm">Supabase Sync Required</h4>
              <p className="text-xs text-zinc-600 mt-0.5 max-w-xl">
                The projects are currently running in **Local Mode** because the `projects` table does not exist in your Supabase database. Click copy to copy the setup script and run it in the SQL Editor.
              </p>
            </div>
          </div>
          <button
            onClick={copySql}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 shadow-sm transition-all flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied SQL!' : 'Copy SQL Schema'}
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: stats.total, icon: <FolderGit2 className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Active Status', value: stats.active, icon: <Check className="w-5 h-5" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'In Maintenance', value: stats.maintenance, icon: <AlertTriangle className="w-5 h-5" />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Categories', value: stats.categories, icon: <Briefcase className="w-5 h-5" />, color: 'text-violet-600', bg: 'bg-violet-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">{s.value}</p>
              <p className="text-xs text-zinc-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, description, or category..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer">
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer">
              <option value="All">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>
        {(search || categoryFilter !== 'All' || statusFilter !== 'All') && (
          <p className="text-xs text-zinc-500 mt-2 pl-1">Showing {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 && !loading ? (
        <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center">
          <FolderGit2 className="w-12 h-12 text-zinc-200 mx-auto mb-3" />
          <p className="text-zinc-500 font-medium">No projects found</p>
          <p className="text-sm text-zinc-400 mt-1">Try adjusting your filters or add a new project</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onEdit={proj => { setEditProject(proj); setShowModal(true); }}
              onDelete={setDeleteProject}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <ProjectModal
          project={editProject}
          onClose={() => { setShowModal(false); setEditProject(null); }}
          onSaved={handleSaved}
        />
      )}

      {deleteProject && (
        <DeleteConfirm
          project={deleteProject}
          onClose={() => setDeleteProject(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}
