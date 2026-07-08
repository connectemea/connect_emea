import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Plus, Trash2, Image as ImageIcon, FileText, Target, Edit, X, Eye, EyeOff, Link, CheckCircle, XCircle } from 'lucide-react';
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import handleImageUpload from '../../components/uploadimage';
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
import { set } from 'react-hook-form';
import ImagePreview from '../../components/ImagePreview';

function Events() {
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState("view");
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

    const [formData, setFormData] = useState({
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
        type: '',
        coordinator_name: '',
        coordinator_whatsapp: '',
        status: 'draft',
        reg_status: 'open',
        highlights: []
    });

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
        type: '',
        coordinator_name: '',
        coordinator_whatsapp: '',
        status: 'draft',
        reg_status: 'open',
        highlights: []
    };

    const [highlightInput, setHighlightInput] = useState('');

    // Event types for the select box
    const eventTypes = ['Bootcamp', 'Hackathon', 'Talk Session', 'Workshop', 'Conference', 'Webinar', 'Networking', 'Other'];
    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
    ];
    const regStatusOptions = [
        { value: 'open', label: 'Open' },
        { value: 'closed', label: 'Closed' }
    ];

    // Fetch events from Firebase
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            const eventsData = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({ id: doc.id, ...doc.data() });
            });
            // Sort events by date (newest first)
            eventsData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setEvents(eventsData);
            // console.log(eventsData)
        } catch (error) {
            console.error("Error fetching events: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Set form data when editing an event
    useEffect(() => {
        if (editingEvent) {
            // console.log('Editing event:', editingEvent);
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
                type: editingEvent.type || '',
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
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            setThumbnail_Img(file);

            // Preview the file
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData({
                    ...formData,
                    thumbnail: e.target.result
                });
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
                alert(`Maximum 2 images allowed. You already have ${currentCount} images.`);
                return;
            }

            for (const file of files) {
                if (file.size > 2 * 1024 * 1024) {
                    alert(`File ${file.name} exceeds 2MB size limit`);
                    return;
                }
            }

            setImages((prev) => [...prev, ...files]);

            // Push base64 previews directly into formData.gallery
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFormData((prev) => ({
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
        setFormData({
            ...formData,
            thumbnail: null
        });
    };

    const removeGalleryImage = (index) => {
        setFormData((prev) => {
            const newGallery = [...prev.gallery];
            newGallery.splice(index, 1);
            return { ...prev, gallery: newGallery };
        });
        setImages((prev) => prev.filter((_, i) => i !== index));
    };


    const addHighlight = () => {
        if (highlightInput.trim()) {
            setFormData({
                ...formData,
                highlights: [...formData.highlights, highlightInput.trim()]
            });
            setHighlightInput('');
        }
    };

    const removeHighlight = (index) => {
        const newHighlights = [...formData.highlights];
        newHighlights.splice(index, 1);
        setFormData({
            ...formData,
            highlights: newHighlights
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let thumbnailUrl = formData.thumbnail;
            if (thumbnail_img) {
                thumbnailUrl = await handleImageUpload(thumbnail_img);
            }

            // Upload only `images` (new files)
            const newGalleryUrls = [];
            for (const image of images) {
                const url = await handleImageUpload(image);
                if (url) newGalleryUrls.push(url);
            }

            // Final gallery = replace previews with real URLs
            const galleryUrls = formData.gallery.map((item) =>
                item.startsWith("data:image/") ? newGalleryUrls.shift() : item
            );

            const eventData = {
                ...formData,
                thumbnail: thumbnailUrl,
                gallery: galleryUrls,
                updatedAt: new Date(),
            };

            if (editingEvent) {
                await updateDoc(doc(db, "events", editingEvent.id), eventData);
                setEvents((prev) =>
                    prev.map((ev) =>
                        ev.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : ev
                    )
                );
            } else {
                eventData.createdAt = new Date();
                const docRef = await addDoc(collection(db, "events"), eventData);
                setEvents((prev) => [...prev, { ...eventData, id: docRef.id }]);
            }

            // Reset
            setFormData({ ...initialFormData }); // define initialFormData as your blank form object
            setThumbnail_Img(null);
            setImages([]);
            setEditingEvent(null);
            setActiveTab("view");
        } catch (error) {
            console.error("Error saving event: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };



    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "events", eventToAction.id));
            setDeleteDialogOpen(false);
            fetchEvents(); // Refresh the events list
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
    };

    const handleStatusUpdate = async () => {
        try {
            await updateDoc(doc(db, "events", eventToAction.id), {
                [actionType]: eventToAction.newValue,
                updatedAt: new Date()
            });

            if (actionType === 'status') {
                setStatusDialogOpen(false);
            } else {
                setRegStatusDialogOpen(false);
            }

            fetchEvents(); // Refresh the events list
        } catch (error) {
            console.error("Error updating event status: ", error);
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
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const cancelEdit = () => {
        setEditingEvent(null);
        setFormData({
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
            type: '',
            coordinator_name: '',
            coordinator_whatsapp: '',
            status: 'draft',
            reg_status: 'open',
            highlights: []
        });
        setThumbnail_Img(null);
        setImages([]);
        setActiveTab("view");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-8 w-8 text-blue-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Events Manager</h1>
                                <p className="text-sm text-gray-500">Create and manage your events</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setActiveTab("add")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Add Event
                        </Button>
                    </div>

                    {/* Tabs for View Events and Add Event */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 p-2">
                            <TabsTrigger value="view">View Events</TabsTrigger>
                            <TabsTrigger value="add">{editingEvent ? 'Edit Event' : 'Add Event'}</TabsTrigger>
                        </TabsList>

                        {/* View Events Tab */}
                        <TabsContent value="view" className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Events ({events.length})
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Filter:</span>
                                    <select className="text-sm border border-gray-300 rounded px-2 py-1">
                                        <option value="all">All Events</option>
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>

                            {events.length === 0 ? (
                                loading ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 text-lg">Loading events...</p>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg">No events created yet</p>
                                        <p className="text-gray-400">Click "Add Event" to create your first event</p>
                                    </div>
                                )) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Event
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date & Time
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Registration
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {events.map((event) => (
                                                <tr key={event.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center">
                                                            {event.thumbnail && (
                                                                <ImagePreview
                                                                    src={event.thumbnail}
                                                                    alt={event.title}
                                                                    size="h-10 w-10 object-cover rounded mr-3"
                                                                />
                                                            )}
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                                                <div className="text-sm text-gray-500">{event.location}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                                            {event.type}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="text-sm text-gray-900">
                                                            <div className="flex items-center">
                                                                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                                                {formatDate(event.date)}
                                                            </div>
                                                            <div className="flex items-center mt-1">
                                                                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                                                {event.time}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center">
                                                            <Badge
                                                                variant="outline"
                                                                className={
                                                                    event.status === 'published' ? 'bg-green-100 text-green-800' :
                                                                        event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                                                            'bg-gray-100 text-gray-800'
                                                                }
                                                            >
                                                                {event.status === 'published' && <Eye className="h-3 w-3 mr-1" />}
                                                                {event.status === 'draft' && <EyeOff className="h-3 w-3 mr-1" />}
                                                                {statusOptions.find(s => s.value === event.status)?.label || event.status}
                                                            </Badge>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => openStatusDialog(
                                                                    event,
                                                                    'status',
                                                                    event.status === 'published' ? 'draft' : 'published'
                                                                )}
                                                                className="ml-2 text-gray-400 hover:text-gray-600"
                                                            >
                                                                {event.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center">
                                                            <Badge
                                                                variant="outline"
                                                                className={
                                                                    event.reg_status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                                }
                                                            >
                                                                {event.reg_status === 'open' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                                                {event.reg_status === 'open' ? 'Open' : 'Closed'}
                                                            </Badge>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => openStatusDialog(
                                                                    event,
                                                                    'reg_status',
                                                                    event.reg_status === 'open' ? 'closed' : 'open'
                                                                )}
                                                                className="ml-2 text-gray-400 hover:text-gray-600"
                                                            >
                                                                {event.reg_status === 'open' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                                            </Button>
                                                        </div>
                                                        {event.link && event.reg_status === 'open' && (
                                                            <a
                                                                href={event.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="mt-1 inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                                                            >
                                                                <Link className="h-3 w-3 mr-1" />
                                                                Registration Link
                                                            </a>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <Sheet open={sheetOpen} onOpenChange={setSheetOpen} >
                                                                <SheetTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => handleViewEvent(event)}
                                                                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                        View
                                                                    </Button>
                                                                </SheetTrigger>
                                                                <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                                                                    <SheetHeader>
                                                                        <SheetTitle>{viewEvent?.title}</SheetTitle>
                                                                        <SheetDescription>
                                                                            Event details and information
                                                                        </SheetDescription>
                                                                    </SheetHeader>
                                                                    {viewEvent && (
                                                                        <div className="grid gap-4 py-4">
                                                                            {viewEvent.thumbnail && (
                                                                                <ImagePreview
                                                                                    src={viewEvent.thumbnail}
                                                                                    alt={viewEvent.title}
                                                                                    size="w-full h-48 object-cover rounded-md"
                                                                                />
                                                                            )}
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Type</Label>
                                                                                    <p>{viewEvent.type}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Date</Label>
                                                                                    <p>{formatDate(viewEvent.date)}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Time</Label>
                                                                                    <p>{viewEvent.time}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Location</Label>
                                                                                    <p>{viewEvent.location || 'N/A'}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Status</Label>
                                                                                    <p>{statusOptions.find(s => s.value === viewEvent.status)?.label || viewEvent.status}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Registration</Label>
                                                                                    <p>{regStatusOptions.find(s => s.value === viewEvent.reg_status)?.label || viewEvent.reg_status}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <Label className="text-sm font-medium">Description</Label>
                                                                                <p>{viewEvent.description || 'No description available'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <Label className="text-sm font-medium">Detailed Description</Label>
                                                                                <p>{viewEvent.big_description || 'No detailed description available'}</p>
                                                                            </div>
                                                                            {viewEvent.objectives && (
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Objectives</Label>
                                                                                    <p>{viewEvent.objectives}</p>
                                                                                </div>
                                                                            )}
                                                                            {viewEvent.highlights && viewEvent.highlights.length > 0 && (
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Highlights</Label>
                                                                                    <ul className="list-disc pl-5">
                                                                                        {viewEvent.highlights.map((highlight, index) => (
                                                                                            <li key={index}>{highlight}</li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                            {viewEvent.coordinator_name && (
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Coordinator</Label>
                                                                                    <p>{viewEvent.coordinator_name}</p>
                                                                                </div>
                                                                            )}
                                                                            {viewEvent.coordinator_whatsapp && (
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Coordinator WhatsApp</Label>
                                                                                    <p>{viewEvent.coordinator_whatsapp}</p>
                                                                                </div>
                                                                            )}
                                                                            {viewEvent.link && (
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Registration Link</Label>
                                                                                    <a href={viewEvent.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                                        {viewEvent.link}
                                                                                    </a>
                                                                                </div>
                                                                            )}
                                                                            {viewEvent.gallery && viewEvent.gallery.length > 0 && (
                                                                                <div>
                                                                                    <Label className="text-sm font-medium">Gallery</Label>
                                                                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                                                                        {viewEvent.gallery.map((image, index) => (
                                                                                            <ImagePreview
                                                                                                key={index}
                                                                                                src={image}
                                                                                                alt={`Gallery ${index}`}
                                                                                                size="w-full h-24 object-cover rounded"
                                                                                                modalSize="max-w-4xl"
                                                                                            />
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    <SheetFooter>
                                                                        <SheetClose asChild>
                                                                            <Button>Close</Button>
                                                                        </SheetClose>
                                                                    </SheetFooter>
                                                                </SheetContent>
                                                            </Sheet>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleEdit(event)}
                                                                className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => openDeleteDialog(event)}
                                                                className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </TabsContent>

                        {/* Add/Edit Event Tab */}
                        <TabsContent value="add" className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                {editingEvent ? 'Edit Event' : 'Create New Event'}
                            </h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="title" className="mb-1">
                                            Event Title *
                                        </Label>
                                        <Input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter event title"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="type" className="mb-1">
                                            Event Type *
                                        </Label>
                                        <Select
                                            name="type"
                                            value={formData.type}
                                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Event Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {eventTypes.map((type, index) => (
                                                    <SelectItem key={index} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="date" className="mb-1">
                                            Date *
                                        </Label>
                                        <Input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="time" className="mb-1">
                                            Time *
                                        </Label>
                                        <Input
                                            type="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="location" className="mb-1">
                                            Location
                                        </Label>
                                        <Input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="Enter location"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="status" className="mb-1">
                                            Status
                                        </Label>
                                        <Select
                                            name="status"
                                            value={formData.status}
                                            onValueChange={(value) => setFormData({ ...formData, status: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions.map((option, index) => (
                                                    <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="reg_status" className="mb-1">
                                            Registration Status
                                        </Label>
                                        <Select
                                            name="reg_status"
                                            value={formData.reg_status}
                                            onValueChange={(value) => setFormData({ ...formData, reg_status: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Registration Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {regStatusOptions.map((option, index) => (
                                                    <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="coordinator_name" className="mb-1">
                                            Coordinator Name
                                        </Label>
                                        <Input
                                            type="text"
                                            name="coordinator_name"
                                            value={formData.coordinator_name}
                                            onChange={handleInputChange}
                                            placeholder="Enter coordinator name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="coordinator_whatsapp" className="mb-1">
                                            Coordinator WhatsApp
                                        </Label>
                                        <Input
                                            type="tel"
                                            name="coordinator_whatsapp"
                                            value={formData.coordinator_whatsapp}
                                            onChange={handleInputChange}
                                            placeholder="Enter WhatsApp number"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="description" className="mb-1">
                                        Short Description
                                    </Label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Brief description of the event"
                                        rows="2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="big_description" className="mb-1">
                                        Detailed Description
                                    </Label>
                                    <textarea
                                        name="big_description"
                                        value={formData.big_description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Comprehensive description of the event"
                                        rows="4"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="objectives" className="mb-1">
                                        Objectives
                                    </Label>
                                    <textarea
                                        name="objectives"
                                        value={formData.objectives}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="What participants will learn/achieve"
                                        rows="3"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-1">
                                        Event Highlights
                                    </Label>
                                    <div className="flex gap-2 mb-2">
                                        <Input
                                            type="text"
                                            value={highlightInput}
                                            onChange={(e) => setHighlightInput(e.target.value)}
                                            placeholder="Add a highlight point"
                                        />
                                        <Button
                                            type="button"
                                            onClick={addHighlight}
                                            variant="outline"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <ul className="space-y-1">
                                        {formData.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                                                <span>{highlight}</span>
                                                <Button
                                                    type="button"
                                                    onClick={() => removeHighlight(index)}
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="mb-1">
                                            Thumbnail Image (Max 2MB)
                                        </Label>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Input
                                                type="file"
                                                name="thumbnail"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                id="thumbnail-upload"
                                                accept="image/*"
                                            />
                                            <Label
                                                htmlFor="thumbnail-upload"
                                                className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md flex items-center gap-2"
                                            >
                                                <ImageIcon className="h-4 w-4" />
                                                Upload Thumbnail
                                            </Label>
                                        </div>
                                        {formData.thumbnail && (
                                            <div className="relative inline-block mt-2">
                                                <ImagePreview
                                                    src={formData.thumbnail}
                                                    alt="Thumbnail preview"
                                                    size="h-20 w-20 object-cover rounded"
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={removeThumbnail}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 h-6 w-6"
                                                    size="icon"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label className="mb-1">
                                            Gallery Images (Max 2 images, 2MB each)
                                            <span className="text-xs text-gray-500 ml-1">
                                                {formData.gallery.length}/2
                                            </span>
                                        </Label>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Input
                                                type="file"
                                                name="gallery"
                                                onChange={handleFileChange2}
                                                className="hidden"
                                                id="gallery-upload"
                                                accept="image/*"
                                                multiple
                                                disabled={formData.gallery.length >= 2}
                                            />
                                            <Label
                                                htmlFor="gallery-upload"
                                                className={`cursor-pointer px-4 py-2 rounded-md flex items-center gap-2 ${formData.gallery.length >= 2
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                                    }`}
                                            >
                                                <ImageIcon className="h-4 w-4" />
                                                {formData.gallery.length >= 2 ? 'Maximum reached' : 'Upload Gallery Images'}
                                            </Label>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {formData.gallery.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <ImagePreview
                                                        src={image}
                                                        alt={`Gallery preview ${index}`}
                                                        size="h-20 w-20 object-cover rounded"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 h-6 w-6"
                                                        size="icon"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="link" className="mb-1">
                                        Registration Link
                                    </Label>
                                    <Input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/event"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
                                    >
                                        {isSubmitting
                                            ? (editingEvent ? 'Updating...' : 'Creating...')
                                            : (editingEvent ? 'Update Event' : 'Create Event')
                                        }
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={cancelEdit}
                                        variant="outline"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the event
                            and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Status Update Dialog */}
            <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Event Status</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change the status of this event?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleStatusUpdate}>
                            Update Status
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Registration Status Update Dialog */}
            <AlertDialog open={regStatusDialogOpen} onOpenChange={setRegStatusDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Registration Status</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change the registration status of this event?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleStatusUpdate}>
                            Update Registration
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default Events;