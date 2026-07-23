import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, Filter, Plus, Edit2, Trash2, User,
  Mail, Phone, MapPin, Linkedin, Github, Instagram,
  X, Check, Upload, ChevronDown, Loader2, Users, Crown, GraduationCap
} from 'lucide-react';
import { supabase, uploadFile , deleteFile } from '@/config/supabase';
import { resolveAsset } from '@/utils/resolveAsset';
import { toast } from 'sonner';

const PAGE_SIZE = 12;

const ROLES = ['Technical member', 'Designer', 'Content Writer', 'Marketing', 'Operations', 'Co-founder', 'Community Manager', 'Other'];
const STATUSES = ['Active', 'Alumni'];

const emptyForm = {
  name: '',
  role: 'Community Manager',
  position: '',
  email: '',
  phone: '',
  status: 'Active',
  place: '',
  image: '',
  social: { linkedin: '', github: '', instagram: '' },
  order_index: 0,
};

function StatusBadge({ status }) {
  const cls = status === 'Active'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : status === 'Alumni'
      ? 'bg-sky-50 text-sky-700 border-sky-200'
      : 'bg-zinc-100 text-zinc-600 border-zinc-200';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}

function MemberCard({ member, onEdit, onDelete }) {
  const imgSrc = resolveAsset(member.image);
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0 ring-2 ring-zinc-50">
              {imgSrc ? (
                <img src={imgSrc} alt={member.name} className="w-full h-full object-cover" />
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
          <div className="flex flex-col items-end gap-1.5">
            <StatusBadge status={member.status} />
            {member.order_index !== undefined && member.order_index !== null && (
              <span className="text-[10px] bg-zinc-50 border border-zinc-200 text-zinc-500 px-1.5 py-0.5 rounded font-mono font-medium">
                Order: {member.order_index}
              </span>
            )}
          </div>
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

        <div className="flex items-center justify-between pt-3 border-t border-zinc-50">
          <div className="flex gap-2">
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
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(member)}
              className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(member)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberModal({ member, onClose, onSaved }) {
  const [form, setForm] = useState(member ? { ...member, social: { linkedin: '', github: '', instagram: '', ...(member.social || {}) } } : { ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(member?.image ? resolveAsset(member.image) : null);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));
  const setSocial = (field, val) => setForm(f => ({ ...f, social: { ...f.social, [field]: val } }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setSaving(true);
    const fileName = form.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    try {
      let imageUrl = form.image || '';
      if (imageFile) {
        const publicUrl = await uploadFile(
          "connect_assets",
          imageFile,
          "interns",
          fileName
        );
        if (!publicUrl) throw new Error('Failed to upload image');
        imageUrl = publicUrl;
      }
      const payload = { ...form, image: imageUrl };
      delete payload.id;
      if (member?.id) {
        const { error } = await supabase.from('teams').update(payload).eq('id', member.id);
        if (error) throw error;
        toast.success('Member updated');
      } else {
        const { error } = await supabase.from('teams').insert([payload]);
        if (error) throw error;
        toast.success('Member added');
      }
      onSaved();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-zinc-900">{member ? 'Edit Member' : 'Add Member'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0 ring-2 ring-zinc-200">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-zinc-300" />
                </div>
              )}
            </div>
            <label className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Upload Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} required
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="Full name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Role</label>
              <select value={form.role} onChange={e => set('role', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white">
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-700 mb-1">Position / Title</label>
              <input value={form.position} onChange={e => set('position', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="e.g. Frontend Lead" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="+91 00000 00000" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Place</label>
              <input value={form.place} onChange={e => set('place', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="City, State" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white">
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Sort Order</label>
              <input type="number" value={form.order_index ?? 0} onChange={e => set('order_index', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="0" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-700 mb-2">Social Links</p>
            <div className="space-y-2">
              {[
                { key: 'linkedin', icon: <Linkedin className="w-4 h-4 text-sky-600" />, placeholder: 'LinkedIn URL' },
                { key: 'github', icon: <Github className="w-4 h-4 text-zinc-700" />, placeholder: 'GitHub URL' },
                { key: 'instagram', icon: <Instagram className="w-4 h-4 text-pink-600" />, placeholder: 'Instagram URL' },
              ].map(({ key, icon, placeholder }) => (
                <div key={key} className="flex items-center gap-2 px-3 py-2 border border-zinc-200 rounded-xl">
                  {icon}
                  <input value={form.social?.[key] || ''} onChange={e => setSocial(key, e.target.value)}
                    className="flex-1 text-sm outline-none bg-transparent" placeholder={placeholder} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {member ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ member, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);

      // Delete image from Storage
      if (member.image) {
        await deleteFile("connect_assets", member.image);
      }

      // Delete member from database
      const { error } = await supabase
        .from("teams")
        .delete()
        .eq("id", member.id);

      if (error) throw error;

      toast.success("Member removed");
      onDeleted();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to remove member");
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
        <h3 className="text-lg font-bold text-zinc-900 text-center mb-1">Remove Member</h3>
        <p className="text-sm text-zinc-500 text-center mb-6">
          Remove <span className="font-semibold text-zinc-800">{member.name}</span> from the team? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium">Cancel</button>
          <button onClick={handleDelete} disabled={deleting}
            className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60">
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TeamAdmin() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);
  const loaderRef = useRef(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [editMember, setEditMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteMember, setDeleteMember] = useState(null);
  const [stats, setStats] = useState({ total: 0, active: 0, alumni: 0, roles: 0 });

  const fetchStats = async () => {
    const { data } = await supabase.from('teams').select('status, role');
    if (!data) return;
    setStats({
      total: data.length,
      active: data.filter(m => m.status === 'Active').length,
      alumni: data.filter(m => m.status === 'Alumni').length,
      roles: new Set(data.map(m => m.role)).size,
    });
  };

  const fetchMembers = useCallback(async (reset = false) => {
    setLoading(true);
    const from = reset ? 0 : pageRef.current * PAGE_SIZE;
    let query = supabase.from('teams').select('*').order('order_index', { ascending: true }).range(from, from + PAGE_SIZE - 1);
    if (search) query = query.ilike('name', `%${search}%`);
    if (statusFilter !== 'All') query = query.eq('status', statusFilter);
    if (roleFilter !== 'All') query = query.eq('role', roleFilter);
    const { data, error } = await query;
    if (error) { toast.error(error.message); setLoading(false); return; }
    if (reset) {
      setMembers(data || []);
      pageRef.current = 1;
    } else {
      setMembers(prev => [...prev, ...((data || []).filter(item => !prev.some(p => p.id === item.id)))]);
      pageRef.current += 1;
    }
    setHasMore((data || []).length === PAGE_SIZE);
    setLoading(false);
  }, [search, statusFilter, roleFilter]);

  useEffect(() => {
    fetchStats();
    fetchMembers(true);
  }, [search, statusFilter, roleFilter]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchMembers(false);
      }
    }, { threshold: 0.1 });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, fetchMembers]);

  const handleSaved = () => {
    setShowModal(false);
    setEditMember(null);
    fetchStats();
    fetchMembers(true);
  };
  const handleDeleted = () => {
    setDeleteMember(null);
    fetchStats();
    fetchMembers(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Team Management</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Manage founders, interns, and alumni</p>
        </div>
        <button
          onClick={() => { setEditMember(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-orange-200"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: stats.total, icon: <Users className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Active', value: stats.active, icon: <Check className="w-5 h-5" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Alumni', value: stats.alumni, icon: <GraduationCap className="w-5 h-5" />, color: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Roles', value: stats.roles, icon: <Crown className="w-5 h-5" />, color: 'text-violet-600', bg: 'bg-violet-50' },
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
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer">
              <option value="All">All Status</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer">
              <option value="All">All Roles</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
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
          <p className="text-zinc-500 font-medium">No members found</p>
          <p className="text-sm text-zinc-400 mt-1">Try adjusting your filters or add a new member</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map(m => (
            <MemberCard key={m.id} member={m}
              onEdit={m => { setEditMember(m); setShowModal(true); }}
              onDelete={setDeleteMember}
            />
          ))}
        </div>
      )}

      {/* Load More Observer Trigger */}
      <div ref={loaderRef} className="h-16 flex items-center justify-center mt-4">
        {loading && (
          <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
            Loading more...
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <MemberModal
          member={editMember}
          onClose={() => { setShowModal(false); setEditMember(null); }}
          onSaved={handleSaved}
        />
      )}
      {deleteMember && (
        <DeleteConfirm member={deleteMember} onClose={() => setDeleteMember(null)} onDeleted={handleDeleted} />
      )}
    </div>
  );
}
