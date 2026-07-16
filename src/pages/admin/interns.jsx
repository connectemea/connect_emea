import React, { useState, useEffect, useCallback } from 'react';
import {
  User, MapPin, Mail, Phone, Linkedin, Github, Instagram,
  Search, Filter, X, ChevronDown, Loader2, Users, GraduationCap, Activity
} from 'lucide-react';
import { supabase } from '@/config/supabase';
import { resolveAsset } from '@/utils/resolveAsset';

const PAGE_SIZE = 12;
const STATUSES = ['All', 'Active', 'Alumni'];

function StatusBadge({ status }) {
  const cls = status === 'Active'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : status === 'Alumni'
    ? 'bg-sky-50 text-sky-700 border-sky-200'
    : 'bg-zinc-100 text-zinc-600 border-zinc-200';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}

function InternCard({ member }) {
  const imgSrc = resolveAsset(member.image);
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0 ring-2 ring-zinc-50">
            {imgSrc ? (
              <img src={imgSrc} alt={member.name} className="w-full h-full object-cover" loading="lazy" draggable={false} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-6 h-6 text-zinc-400" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-zinc-900 text-sm truncate">{member.name}</p>
            <p className="text-xs text-orange-600 font-medium truncate">{member.role}</p>
          </div>
        </div>
        <StatusBadge status={member.status} />
      </div>

      {member.position && (
        <p className="text-xs text-zinc-500 mb-3 truncate">{member.position}</p>
      )}

      <div className="space-y-1.5 mb-3">
        {member.email && (
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
        )}
        {member.phone && (
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{member.phone}</span>
          </div>
        )}
        {member.place && (
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{member.place}</span>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-3 border-t border-zinc-50">
        {member.social?.linkedin && (
          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-600 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.social?.github && (
          <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <Github className="w-4 h-4" />
          </a>
        )}
        {member.social?.instagram && (
          <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-pink-600 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Interns() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleFilter, setRoleFilter] = useState('All');
  const [stats, setStats] = useState({ total: 0, active: 0, alumni: 0, roles: 0 });

  const fetchStats = async () => {
    const { data } = await supabase.from('teams').select('status, role').neq('role', 'Co-founder');
    if (!data) return;
    const roles = [...new Set(data.map(m => m.role))];
    setRoleOptions(roles);
    setStats({
      total: data.length,
      active: data.filter(m => m.status === 'Active').length,
      alumni: data.filter(m => m.status === 'Alumni').length,
      roles: roles.length,
    });
  };

  const fetchMembers = useCallback(async (reset = false) => {
    setLoading(true);
    const from = reset ? 0 : page * PAGE_SIZE;
    let query = supabase.from('teams').select('*')
      .neq('role', 'Co-founder')
      .order('order_index', { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (search) query = query.ilike('name', `%${search}%`);
    if (statusFilter !== 'All') query = query.eq('status', statusFilter);
    if (roleFilter !== 'All') query = query.eq('role', roleFilter);
    const { data, error } = await query;
    if (error) { console.error(error); setLoading(false); return; }
    if (reset) {
      setMembers(data || []);
      setPage(1);
    } else {
      setMembers(prev => [...prev, ...(data || [])]);
      setPage(p => p + 1);
    }
    setHasMore((data || []).length === PAGE_SIZE);
    setLoading(false);
  }, [page, search, statusFilter, roleFilter]);

  useEffect(() => {
    fetchStats();
    fetchMembers(true);
  }, [search, statusFilter, roleFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Interns Directory</h1>
        <p className="text-sm text-zinc-500 mt-0.5">View all interns and alumni — use Team Management to add or edit</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Interns', value: stats.total, icon: <Users className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Active', value: stats.active, icon: <Activity className="w-5 h-5" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Alumni', value: stats.alumni, icon: <GraduationCap className="w-5 h-5" />, color: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Roles', value: stats.roles, icon: <Filter className="w-5 h-5" />, color: 'text-violet-600', bg: 'bg-violet-50' },
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
              placeholder="Search by name..."
              className="w-full pl-9 pr-9 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer">
              {STATUSES.map(s => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer">
              <option value="All">All Roles</option>
              {roleOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>
        {(search || statusFilter !== 'All' || roleFilter !== 'All') && (
          <p className="text-xs text-zinc-500 mt-2 pl-1">Showing {members.length} result{members.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {/* Grid */}
      {members.length === 0 && !loading ? (
        <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center">
          <Users className="w-12 h-12 text-zinc-200 mx-auto mb-3" />
          <p className="text-zinc-500 font-medium">No interns found</p>
          <p className="text-sm text-zinc-400 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map(m => <InternCard key={m.id} member={m} />)}
        </div>
      )}

      {/* Load More */}
      {(hasMore || loading) && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => fetchMembers(false)}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}