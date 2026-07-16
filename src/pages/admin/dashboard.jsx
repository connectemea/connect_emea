import React, { useState, useEffect } from 'react';
import {
  Users, Calendar, CheckCircle, ExternalLink, BarChart3, Clock,
  FolderGit2, ArrowRight, Laptop, Code, Globe, Github, Briefcase, GraduationCap
} from 'lucide-react';
import { supabase } from '@/config/supabase';
import { Link } from 'react-router-dom';

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
    description: 'Connect EMEA official organization landing page.',
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
  }
];

function CategoryIcon({ category }) {
  const cls = "w-5 h-5 text-orange-600";
  switch (category) {
    case 'GitHub': return <Github className={cls} />;
    case 'Website': return <Globe className={cls} />;
    case 'Hiring': return <Briefcase className={cls} />;
    case 'Internship': return <Laptop className={cls} />;
    case 'Internal Tools': return <Code className={cls} />;
    default: return <FolderGit2 className={cls} />;
  }
}

function Dashboard() {
  const [metrics, setMetrics] = useState({
    eventsCount: 0,
    activeMembers: 0,
    alumniCount: 0,
    projectsCount: 0
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        // 1. Fetch Events count
        const { count: eventsCount, error: evErr } = await supabase
          .from('events')
          .select('*', { count: 'exact', head: true });
        
        // 2. Fetch Teams status
        const { data: teamData, error: teamErr } = await supabase
          .from('teams')
          .select('status');

        let activeCount = 0;
        let alumniCount = 0;
        if (teamData) {
          activeCount = teamData.filter(m => m.status === 'Active').length;
          alumniCount = teamData.filter(m => m.status === 'Alumni').length;
        }

        // 3. Fetch Projects (database or localStorage fallback)
        let projectsList = [];
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('name', { ascending: true });
          
          if (error) throw error;
          projectsList = data || [];
        } catch (projErr) {
          // localStorage fallback
          const locals = localStorage.getItem('connect_projects');
          if (locals) {
            projectsList = JSON.parse(locals);
          } else {
            projectsList = SEED_PROJECTS;
          }
        }

        setProjects(projectsList.slice(0, 6)); // Display first 6 in dashboard

        setMetrics({
          eventsCount: eventsCount || 0,
          activeMembers: activeCount,
          alumniCount: alumniCount,
          projectsCount: projectsList.length
        });
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, subtitle, bg }) => (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-200">
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center ${color} flex-shrink-0`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-zinc-900">{value}</p>
        <p className="text-xs text-zinc-500 font-medium truncate">{title}</p>
        {subtitle && <p className="text-[10px] text-zinc-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Community & Platforms Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Overview of community metrics, active members, and quick access to organization platforms</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Calendar}
          title="Events Coordinated"
          value={loading ? '...' : metrics.eventsCount}
          color="text-blue-600"
          bg="bg-blue-50"
          subtitle="Total community events"
        />
        <StatCard
          icon={Users}
          title="Active Members"
          value={loading ? '...' : metrics.activeMembers}
          color="text-emerald-600"
          bg="bg-emerald-50"
          subtitle="Currently active in projects"
        />
        <StatCard
          icon={GraduationCap}
          title="Community Alumni"
          value={loading ? '...' : metrics.alumniCount}
          color="text-violet-600"
          bg="bg-violet-50"
          subtitle="Alumni community members"
        />
        <StatCard
          icon={FolderGit2}
          title="Connected Projects"
          value={loading ? '...' : metrics.projectsCount}
          color="text-orange-600"
          bg="bg-orange-50"
          subtitle="Portals, blogs, and toolkits"
        />
      </div>

      {/* Dynamic Projects Quick Links Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
            <Laptop className="h-5 w-5 text-orange-500" />
            Connected Portals & Projects
          </h2>
          <Link
            to="/dashboard/projects"
            className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Manage Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {projects.length === 0 && !loading ? (
          <div className="bg-white rounded-2xl border border-zinc-100 p-8 text-center">
            <p className="text-zinc-500 text-sm">No connected projects listed.</p>
            <Link to="/dashboard/projects" className="text-xs text-orange-600 hover:underline mt-2 inline-block font-semibold">
              Go to Projects Manager to add one
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, idx) => (
              <a
                key={idx}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-5 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600">
                        <CategoryIcon category={project.category} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-zinc-950 text-sm truncate group-hover:text-orange-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">{project.category}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mt-1 mb-4 h-[36px] overflow-hidden">
                    {project.description || 'Quick access link to portal.'}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-orange-600 pt-2 border-t border-zinc-50">
                  <span className="truncate max-w-[180px] text-zinc-400 font-medium">{project.url ? project.url.replace(/^https?:\/\//, '') : 'No URL'}</span>
                  <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Launch
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Community Distribution Summary */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6">
        <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-orange-500" />
          Community Member Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-600 mb-1.5">
                <span>Active Members Rate</span>
                <span>{loading ? '...' : `${((metrics.activeMembers / (metrics.activeMembers + metrics.alumniCount || 1)) * 100).toFixed(1)}%`}</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: loading ? '0%' : `${(metrics.activeMembers / (metrics.activeMembers + metrics.alumniCount || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-600 mb-1.5">
                <span>Alumni Members Rate</span>
                <span>{loading ? '...' : `${((metrics.alumniCount / (metrics.activeMembers + metrics.alumniCount || 1)) * 100).toFixed(1)}%`}</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: loading ? '0%' : `${(metrics.alumniCount / (metrics.activeMembers + metrics.alumniCount || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-zinc-50 rounded-xl p-4 border border-zinc-100">
            <p className="text-xs font-semibold text-zinc-500">Quick Tip</p>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              You can add and update your organization projects under the **Projects** tab. Any added project will automatically be listed here on this dashboard for easy access!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;