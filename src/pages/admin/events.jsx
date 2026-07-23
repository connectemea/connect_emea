import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Calendar, Clock, MapPin, User, Plus, Trash2, Image as ImageIcon,
  FileText, Target, Edit, X, Eye, EyeOff, Link, CheckCircle, XCircle,
  Search, ChevronDown, Loader2, Filter, Grid, List, Phone, ExternalLink,
  Info, Check, Sparkles
} from 'lucide-react';
import { supabase , deleteFile} from '../../config/supabase';
import handleImageUpload from '../../components/uploadimage';
import { resolveAsset } from '../../utils/resolveAsset';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import ImagePreview from '../../components/ImagePreview';
import { toast } from 'sonner';

const PAGE_SIZE = 10;
const EVENT_TYPES = ['Bootcamp', 'Hackathon', 'Talk Session', 'Workshop', 'Conference', 'Webinar', 'Networking', 'Other'];
const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' }
];
const REG_STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' }
];

const initialFormData = {
  title: '',
  date: '',
  time: '',
  location: '',
  description: '',
  big_description: '',
  objectives: '',
  thumbnail: null,
  gallery: [],
  link: '',
  type: 'Talk Session',
  coordinator_name: '',
  coordinator_whatsapp: '',
  status: 'draft',
  reg_status: 'open',
  highlights: []
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("view");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [thumbnail_img, setThumbnail_Img] = useState(null);
  const [images, setImages] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [regStatusDialogOpen, setRegStatusDialogOpen] = useState(false);
  const [eventToAction, setEventToAction] = useState(null);
  const [actionType, setActionType] = useState('');
  const [viewEvent, setViewEvent] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination + filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [regStatusFilter, setRegStatusFilter] = useState('All');
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);
  const loaderRef = useRef(null);

  const [formData, setFormData] = useState({ ...initialFormData });
  const [highlightInput, setHighlightInput] = useState('');
  const [stats, setStats] = useState({ total: 0, published: 0, activeReg: 0, drafts: 0 });

  const fetchStats = async () => {
    try {
      const { data } = await supabase.from('events').select('status, reg_status');
      if (data) {
        setStats({
          total: data.length,
          published: data.filter(e => e.status === 'published').length,
          activeReg: data.filter(e => e.reg_status === 'open').length,
          drafts: data.filter(e => e.status === 'draft').length
        });
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchEvents = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const from = reset ? 0 : pageRef.current * PAGE_SIZE;
      let query = supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })
        .range(from, from + PAGE_SIZE - 1);

      if (searchQuery.trim()) {
        query = query.ilike('title', `%${searchQuery.trim()}%`);
      }
      if (statusFilter !== 'All') {
        query = query.eq('status', statusFilter);
      }
      if (typeFilter !== 'All') {
        query = query.eq('type', typeFilter);
      }
      if (regStatusFilter !== 'All') {
        query = query.eq('reg_status', regStatusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      if (reset) {
        setEvents(data || []);
        pageRef.current = 1;
      } else {
        setEvents(prev => [...prev, ...((data || []).filter(item => !prev.some(p => p.id === item.id)))]);
        pageRef.current += 1;
      }
      setHasMore((data || []).length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching events: ", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, typeFilter, regStatusFilter]);

  useEffect(() => {
    pageRef.current = 0;
    fetchEvents(true);
    fetchStats();
  }, [searchQuery, statusFilter, typeFilter, regStatusFilter]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchEvents(false);
      }
    }, { threshold: 0.1 });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, fetchEvents]);

  // Set form data when editing an event
  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        date: editingEvent.date || '',
        time: editingEvent.time || '',
        location: editingEvent.location || '',
        description: editingEvent.description || '',
        big_description: editingEvent.big_description || '',
        objectives: editingEvent.objectives || '',
        thumbnail: editingEvent.thumbnail || null,
        gallery: editingEvent.gallery || [],
        link: editingEvent.link || '',
        type: editingEvent.type || 'Talk Session',
        coordinator_name: editingEvent.coordinator_name || '',
        coordinator_whatsapp: editingEvent.coordinator_whatsapp || '',
        status: editingEvent.status || 'draft',
        reg_status: editingEvent.reg_status || 'open',
        highlights: editingEvent.highlights || []
      });
      setThumbnail_Img(null);
      setImages([]);
      setActiveTab("add");
    }
  }, [editingEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Thumbnail image size must be less than 2MB');
        return;
      }
      setThumbnail_Img(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          thumbnail: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange2 = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const currentCount = formData.gallery.length;
      const newCount = currentCount + files.length;

      if (newCount > 2) {
        toast.error(`Maximum 2 gallery images allowed. You have selected ${files.length} but already have ${currentCount}.`);
        return;
      }

      for (const file of files) {
        if (file.size > 2 * 1024 * 1024) {
          toast.error(`File ${file.name} exceeds 2MB size limit`);
          return;
        }
      }

      setImages(prev => [...prev, ...files]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            gallery: [...prev.gallery, e.target.result],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeThumbnail = () => {
    setThumbnail_Img(null);
    setFormData(prev => ({
      ...prev,
      thumbnail: null
    }));
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => {
      const newGallery = [...prev.gallery];
      newGallery.splice(index, 1);
      return { ...prev, gallery: newGallery };
    });
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()]
      }));
      setHighlightInput('');
    }
  };

  const removeHighlight = (index) => {
    setFormData(prev => {
      const newHighlights = [...prev.highlights];
      newHighlights.splice(index, 1);
      return { ...prev, highlights: newHighlights };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Event title is required");
      return;
    }
    setIsSubmitting(true);

    try {
      let thumbnailUrl = formData.thumbnail;
      if (thumbnail_img) {
        thumbnailUrl = await handleImageUpload(thumbnail_img, `${formData.title}_${Date.now()}`);
      }

      const newGalleryUrls = [];
      for (const image of images) {
        const url = await handleImageUpload(image, `${formData.title}_${Date.now()}`);
        if (url) newGalleryUrls.push(url);
      }

      const galleryUrls = formData.gallery.map((item) =>
        item.startsWith("data:image/") ? newGalleryUrls.shift() : item
      ).filter(Boolean);

      const eventData = {
        ...formData,
        thumbnail: thumbnailUrl,
        gallery: galleryUrls,
        updated_at: new Date(),
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);
        if (error) throw error;
        toast.success("Event updated successfully!");
      } else {
        eventData.created_at = new Date();
        const { error } = await supabase
          .from('events')
          .insert([eventData]);
        if (error) throw error;
        toast.success("Event created successfully!");
      }

      setFormData({ ...initialFormData });
      setThumbnail_Img(null);
      setImages([]);
      setEditingEvent(null);
      setActiveTab("view");
      fetchEvents(true);
      fetchStats();
    } catch (error) {
      console.error("Error saving event: ", error);
      toast.error(error.message || "Failed to save event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete thumbnail
      if (eventToAction.thumbnail) {
        await deleteFile("connect_assets", eventToAction.thumbnail);
      }

      // Delete gallery images
      if (eventToAction.gallery?.length) {
        await Promise.all(
          eventToAction.gallery.map((image) =>
            deleteFile("connect_assets", image)
          )
        );
      }

      // Delete database record
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventToAction.id);

      if (error) throw error;

      toast.success("Event deleted");
      setDeleteDialogOpen(false);
      fetchEvents(true);
      fetchStats();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleStatusUpdate = async () => {
    try {
      const { error } = await supabase
        .from('events')
        .update({
          [actionType]: eventToAction.newValue,
          updated_at: new Date()
        })
        .eq('id', eventToAction.id);
      if (error) throw error;

      toast.success(`Event ${actionType.replace('_', ' ')} updated`);

      if (actionType === 'status') {
        setStatusDialogOpen(false);
      } else {
        setRegStatusDialogOpen(false);
      }

      fetchEvents(true);
      fetchStats();
    } catch (error) {
      console.error("Error updating status: ", error);
      toast.error("Failed to update status");
    }
  };

  const openStatusDialog = (event, type, newValue) => {
    setEventToAction({ id: event.id, newValue });
    setActionType(type);

    if (type === 'status') {
      setStatusDialogOpen(true);
    } else {
      setRegStatusDialogOpen(true);
    }
  };

  const openDeleteDialog = (event) => {
    setEventToAction(event);
    setDeleteDialogOpen(true);
  };

  const handleViewEvent = (event) => {
    setViewEvent(event);
    setSheetOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setFormData({ ...initialFormData });
    setThumbnail_Img(null);
    setImages([]);
    setActiveTab("view");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Events Management</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Schedule workshops, bootcamps, conferences, and talk sessions</p>
        </div>
        <button
          onClick={() => { setEditingEvent(null); setFormData({ ...initialFormData }); setActiveTab(activeTab === "view" ? "add" : "view"); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-orange-200"
        >
          {activeTab === "view" ? (
            <>
              <Plus className="w-4 h-4" /> Add Event
            </>
          ) : (
            'View Events list'
          )}
        </button>
      </div>

      {/* Stats Dashboard */}
      {activeTab === "view" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Events', value: stats.total, icon: <Calendar className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Published Events', value: stats.published, icon: <CheckCircle className="w-5 h-5" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Open Registrations', value: stats.activeReg, icon: <Sparkles className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Drafts', value: stats.drafts, icon: <FileText className="w-5 h-5" />, color: 'text-zinc-600', bg: 'bg-zinc-100' },
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
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(val) => { if (val === 'add' && !editingEvent) setFormData({ ...initialFormData }); setActiveTab(val); }} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md bg-zinc-100 p-1 rounded-xl">
          <TabsTrigger value="view" className="rounded-lg text-sm font-semibold py-2">View Events List</TabsTrigger>
          <TabsTrigger value="add" className="rounded-lg text-sm font-semibold py-2">
            {editingEvent ? 'Edit Event Details' : 'Create Event'}
          </TabsTrigger>
        </TabsList>

        {/* VIEW TAB */}
        <TabsContent value="view" className="space-y-4 outline-none mt-4">
          {/* Filters card */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-4 space-y-3">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search events by title..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-2">
                {/* Event Type Filter */}
                <div className="relative flex-1 sm:flex-initial">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <select
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative flex-1 sm:flex-initial">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>

                {/* Reg Status Filter */}
                <div className="relative flex-1 sm:flex-initial">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <select
                    value={regStatusFilter}
                    onChange={e => setRegStatusFilter(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="All">All Registration</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-zinc-200 rounded-xl p-1 bg-zinc-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'}`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {(searchQuery || statusFilter !== 'All' || typeFilter !== 'All' || regStatusFilter !== 'All') && (
              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-zinc-500">
                  Showing {events.length} results matching filter criteria.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setStatusFilter('All'); setTypeFilter('All'); setRegStatusFilter('All'); }}
                  className="text-xs font-semibold text-orange-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* LOADING STATE */}
          {events.length === 0 && loading ? (
            <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-3" />
              <p className="text-zinc-500 font-semibold">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            /* EMPTY STATE */
            <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center">
              <Calendar className="w-12 h-12 text-zinc-200 mx-auto mb-3" />
              <p className="text-zinc-500 font-semibold">No events scheduled</p>
              <p className="text-sm text-zinc-400 mt-1">Create your first event to showcase it to the community.</p>
              <button
                onClick={() => setActiveTab("add")}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Event
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => {
                const resolvedThumb = resolveAsset(event.thumbnail);
                return (
                  <div key={event.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      {/* Card Cover image */}
                      <div className="relative h-44 bg-zinc-50 overflow-hidden border-b border-zinc-100">
                        {resolvedThumb ? (
                          <img
                            src={resolvedThumb}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-300">
                            <ImageIcon className="w-10 h-10" />
                          </div>
                        )}
                        {/* Overlay status tags */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${event.status === 'published' ? 'bg-emerald-500 text-white border-emerald-500' :
                              event.status === 'draft' ? 'bg-amber-500 text-white border-amber-500' :
                                'bg-zinc-500 text-white border-zinc-500'
                            }`}>
                            {event.status === 'published' ? 'Published' : event.status === 'draft' ? 'Draft' : 'Archived'}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-sm bg-white ${event.reg_status === 'open' ? 'text-emerald-600 border-emerald-100' : 'text-red-600 border-red-100'
                            }`}>
                            {event.reg_status === 'open' ? 'Reg Open' : 'Reg Closed'}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded-md">{event.type}</span>
                        <h3 className="font-bold text-zinc-950 text-base mt-3 line-clamp-1 leading-snug group-hover:text-orange-600 transition-colors" title={event.title}>
                          {event.title}
                        </h3>
                        <p className="text-zinc-500 text-xs mt-1.5 line-clamp-2 h-8 leading-relaxed">
                          {event.description || 'No description provided.'}
                        </p>

                        <div className="mt-4 pt-3.5 border-t border-zinc-50 space-y-2">
                          <div className="flex items-center text-xs text-zinc-500 gap-2">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                            <span className="font-semibold text-zinc-700">{formatDate(event.date)}</span>
                            {event.time && (
                              <>
                                <span className="text-zinc-300">•</span>
                                <Clock className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                                <span>{event.time}</span>
                              </>
                            )}
                          </div>
                          {event.location && (
                            <div className="flex items-center text-xs text-zinc-500 gap-2">
                              <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-5 py-3.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                      <button
                        onClick={() => handleViewEvent(event)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-zinc-700 hover:text-zinc-950 hover:underline"
                      >
                        Details
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </button>

                      <div className="flex gap-1">
                        <button
                          onClick={() => { handleEdit(event); }}
                          className="p-1.5 rounded-lg hover:bg-zinc-200/60 text-zinc-500 hover:text-zinc-900 transition-colors"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Quick switch status */}
                        <button
                          onClick={() => openStatusDialog(
                            event,
                            'status',
                            event.status === 'published' ? 'draft' : 'published'
                          )}
                          className="p-1.5 rounded-lg hover:bg-zinc-200/60 text-zinc-500 hover:text-zinc-900 transition-colors"
                          title={event.status === 'published' ? 'Move to Draft' : 'Publish Event'}
                        >
                          {event.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => openDeleteDialog(event)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW (Beautiful sleek table) */
            <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Event Details</th>
                      <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</th>
                      <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                      <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Registration</th>
                      <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {events.map((event) => {
                      const resolvedThumb = resolveAsset(event.thumbnail);
                      return (
                        <tr key={event.id} className="hover:bg-zinc-50/50 transition-colors group">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                                {resolvedThumb ? (
                                  <img src={resolvedThumb} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-orange-400 bg-orange-50">
                                    <ImageIcon className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-zinc-950 text-sm truncate group-hover:text-orange-600 transition-colors">{event.title}</p>
                                <p className="text-xs text-zinc-400 truncate flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 flex-shrink-0" />
                                  {event.location || 'No Location'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600">
                              {event.type}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="text-xs space-y-0.5 text-zinc-500">
                              <p className="font-semibold text-zinc-700">{formatDate(event.date)}</p>
                              {event.time && <p>{event.time}</p>}
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${event.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                event.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                  'bg-zinc-100 text-zinc-700 border-zinc-200'
                              }`}>
                              {event.status === 'published' ? 'Published' : event.status === 'draft' ? 'Draft' : 'Archived'}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${event.reg_status === 'open' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                              }`}>
                              {event.reg_status === 'open' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {event.reg_status === 'open' ? 'Open' : 'Closed'}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleViewEvent(event)}
                                className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(event)}
                                className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950 transition-colors"
                                title="Edit Event"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openDeleteDialog(event)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
        </TabsContent>

        {/* ADD / EDIT FORM TAB */}
        <TabsContent value="add" className="outline-none mt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT TWO COLUMNS: Info & Descriptions */}
              <div className="lg:col-span-2 space-y-6">

                {/* General Details Card */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-4 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
                    <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                      <Info className="w-4.5 h-4.5 text-orange-500" />
                      General Event Details
                    </h3>
                    <span className="text-[10px] text-zinc-400 font-semibold">* Required Fields</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Event Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Build EMEA Q&A Session"
                      required
                      className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Event Type *</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                      >
                        {EVENT_TYPES.map((t, idx) => (
                          <option key={idx} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Location / Venue</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Seminar Hall, Discord"
                        className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Time *</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Registration / Event URL</label>
                    <div className="relative">
                      <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        placeholder="https://buildemea.connectemea.in"
                        className="w-full pl-10 pr-4 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Descriptions Card */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-4 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                      <FileText className="w-4.5 h-4.5 text-orange-500" />
                      Descriptions & Scope
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Short Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Brief single-sentence tagline or overview..."
                      className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Detailed Description</label>
                    <textarea
                      name="big_description"
                      value={formData.big_description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Detailed schedule, requirements, syllabus, guest profiles, etc..."
                      className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Objectives</label>
                    <textarea
                      name="objectives"
                      value={formData.objectives}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="What will the participants learn or build? List key takeaways..."
                      className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT ONE COLUMN: Media, Meta, Highlights */}
              <div className="space-y-6">

                {/* Settings Card */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-4 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                      <Target className="w-4.5 h-4.5 text-orange-500" />
                      Status & Coordinators
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Publish Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                      >
                        {STATUS_OPTIONS.map((o, idx) => (
                          <option key={idx} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Registration Status</label>
                      <select
                        name="reg_status"
                        value={formData.reg_status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                      >
                        {REG_STATUS_OPTIONS.map((o, idx) => (
                          <option key={idx} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Coordinator Name</label>
                    <input
                      type="text"
                      name="coordinator_name"
                      value={formData.coordinator_name}
                      onChange={handleInputChange}
                      placeholder="Full name of event coordinator"
                      className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Coordinator WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="tel"
                        name="coordinator_whatsapp"
                        value={formData.coordinator_whatsapp}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 9988776655"
                        className="w-full pl-10 pr-4 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Upload Card */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-4 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                      <ImageIcon className="w-4.5 h-4.5 text-orange-500" />
                      Event Media / Assets
                    </h3>
                  </div>

                  {/* Thumbnail Image Zone */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Thumbnail Cover (Max 2MB)</label>
                    <div className="flex flex-col gap-3">
                      {formData.thumbnail ? (
                        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200">
                          <img src={formData.thumbnail} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={removeThumbnail}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="border-2 border-dashed border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-zinc-50/50 hover:border-orange-200 cursor-pointer transition-colors text-center">
                          <ImageIcon className="w-8 h-8 text-zinc-400 mb-1.5" />
                          <span className="text-xs font-semibold text-zinc-700">Upload Cover Photo</span>
                          <span className="text-[10px] text-zinc-400 mt-0.5">Click to choose image</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Gallery Images Zone */}
                  {/* <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1.5 flex justify-between">
                      <span>Gallery Images (Max 2, 2MB each)</span>
                      <span className="text-zinc-400 text-[10px] font-bold">{formData.gallery.length} / 2</span>
                    </label>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2.5">
                      {formData.gallery.map((img, idx) => (
                        <div key={idx} className="relative h-20 rounded-lg overflow-hidden bg-zinc-50 border border-zinc-100">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {formData.gallery.length < 2 && (
                      <label className="border-2 border-dashed border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-zinc-50/50 hover:border-orange-200 cursor-pointer transition-colors text-center">
                        <ImageIcon className="w-6 h-6 text-zinc-400 mb-1" />
                        <span className="text-xs font-semibold text-zinc-700">Add Gallery Image</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange2} />
                      </label>
                    )}
                  </div> */}
                </div>

                {/* Highlights Card */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-4 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                      <Sparkles className="w-4.5 h-4.5 text-orange-500" />
                      Key Highlights
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={highlightInput}
                      onChange={e => setHighlightInput(e.target.value)}
                      placeholder="Add an event highlight point..."
                      className="flex-1 px-3 py-1.5 text-xs border border-zinc-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  <ul className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {formData.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start justify-between bg-zinc-50 border border-zinc-100 px-3 py-2 rounded-xl text-xs text-zinc-700">
                        <span className="leading-relaxed pr-2 break-all">{h}</span>
                        <button
                          type="button"
                          onClick={() => removeHighlight(idx)}
                          className="text-zinc-400 hover:text-red-500 flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                    {formData.highlights.length === 0 && (
                      <p className="text-[11px] text-zinc-400 text-center py-2">No highlights added yet.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Form Actions bar */}
            <div className="flex gap-3 bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editingEvent ? 'Save Event Changes' : 'Publish & Create Event'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-3 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      {/* EVENT VIEW SHEET (SLIDING DRAWER) */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto p-0 border-l border-zinc-100 bg-white">
          {viewEvent && (
            <div className="flex flex-col h-full">
              {/* Image Banner Header */}
              <div className="relative h-60 bg-zinc-50 border-b border-zinc-100 flex-shrink-0">
                {resolveAsset(viewEvent.thumbnail) ? (
                  <img
                    src={resolveAsset(viewEvent.thumbnail)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-200">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                {/* Header Action Close button */}
                <button
                  onClick={() => setSheetOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 rounded bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {viewEvent.type}
                  </span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold shadow-sm ${viewEvent.reg_status === 'open' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {viewEvent.reg_status === 'open' ? 'Registration Open' : 'Registration Closed'}
                  </span>
                </div>
              </div>

              {/* Drawer Content Body */}
              <div className="flex-1 p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950 leading-tight">{viewEvent.title}</h2>
                  <p className="text-xs text-zinc-400 font-semibold mt-1 uppercase tracking-widest">
                    Status: <span className="text-zinc-700 font-bold">{viewEvent.status}</span>
                  </p>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-2 gap-4 bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-600">
                    <Calendar className="w-4.5 h-4.5 text-orange-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-zinc-900">{formatDate(viewEvent.date)}</p>
                      <p className="text-[10px] text-zinc-400">Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-600">
                    <Clock className="w-4.5 h-4.5 text-orange-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-zinc-900">{viewEvent.time || '—'}</p>
                      <p className="text-[10px] text-zinc-400">Time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-600 col-span-2 pt-2 border-t border-zinc-200/60">
                    <MapPin className="w-4.5 h-4.5 text-orange-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-zinc-900">{viewEvent.location || '—'}</p>
                      <p className="text-[10px] text-zinc-400">Venue</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {viewEvent.description && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Overview</h4>
                    <p className="text-sm text-zinc-700 leading-relaxed font-semibold">{viewEvent.description}</p>
                  </div>
                )}

                {/* Detailed Description */}
                {viewEvent.big_description && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Detailed Information</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{viewEvent.big_description}</p>
                  </div>
                )}

                {/* Objectives */}
                {viewEvent.objectives && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Objectives & Learnings</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{viewEvent.objectives}</p>
                  </div>
                )}

                {/* Highlights */}
                {viewEvent.highlights && viewEvent.highlights.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Highlights</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {viewEvent.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-zinc-600 bg-zinc-50 border border-zinc-100 rounded-xl p-2.5">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Coordinator */}
                {(viewEvent.coordinator_name || viewEvent.coordinator_whatsapp) && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Coordinator Contact</h4>
                    <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-zinc-950">{viewEvent.coordinator_name || 'N/A'}</p>
                        <p className="text-[10px] text-zinc-400">Event Coordinator</p>
                      </div>
                      {viewEvent.coordinator_whatsapp && (
                        <a
                          href={`https://wa.me/${viewEvent.coordinator_whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" /> Chat
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Registration link */}
                {viewEvent.link && (
                  <div className="pt-2">
                    <a
                      href={viewEvent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-center rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Link className="w-4 h-4" /> Go to Event Website
                    </a>
                  </div>
                )}

                {/* Gallery */}
                {viewEvent.gallery && viewEvent.gallery.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Gallery Preview</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {viewEvent.gallery.map((img, idx) => (
                        <ImagePreview
                          key={idx}
                          src={img}
                          alt=""
                          size="w-full h-24 object-cover rounded-xl"
                          modalSize="max-w-4xl"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* DELETE DIALOG */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white rounded-2xl max-w-sm p-6">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-950 font-bold text-center">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm text-center">
              This event will be deleted permanently. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 mt-4 sm:flex-row flex-col">
            <AlertDialogCancel className="rounded-xl border border-zinc-200 text-zinc-700 flex-1 py-2 font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white rounded-xl flex-1 py-2 font-semibold border-0">
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* STATUS UPDATE DIALOG */}
      <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <AlertDialogContent className="bg-white rounded-2xl max-w-sm p-6">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-amber-500" />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-950 font-bold text-center">Update Publish Status</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm text-center">
              Do you want to toggle the publish status of this event?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 mt-4 sm:flex-row flex-col">
            <AlertDialogCancel className="rounded-xl border border-zinc-200 text-zinc-700 flex-1 py-2 font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStatusUpdate} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex-1 py-2 font-semibold border-0">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* REGISTRATION STATUS UPDATE DIALOG */}
      <AlertDialog open={regStatusDialogOpen} onOpenChange={setRegStatusDialogOpen}>
        <AlertDialogContent className="bg-white rounded-2xl max-w-sm p-6">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-emerald-500" />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-950 font-bold text-center">Toggle Registration</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm text-center">
              Do you want to toggle registrations for this event?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 mt-4 sm:flex-row flex-col">
            <AlertDialogCancel className="rounded-xl border border-zinc-200 text-zinc-700 flex-1 py-2 font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStatusUpdate} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex-1 py-2 font-semibold border-0">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}