// Event Form Component (2nd Tab)
function EventForm({ onSuccess, editingEvent }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [thumbnail_img, setThumbnail_Img] = useState(null);
    const [images, setImages] = useState([]);
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
                type: editingEvent.type || '',
                coordinator_name: editingEvent.coordinator_name || '',
                coordinator_whatsapp: editingEvent.coordinator_whatsapp || '',
                status: editingEvent.status || 'draft',
                reg_status: editingEvent.reg_status || 'open',
                highlights: editingEvent.highlights || []
            });
            setThumbnail_Img(null);
            setImages([]);
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

    const handleFileChange2 = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Check if adding these files would exceed the maximum limit
            const currentCount = formData.gallery.length;
            const newCount = currentCount + files.length;

            if (newCount > 2) {
                alert(`Maximum 2 images allowed. You already have ${currentCount} images.`);
                return;
            }

            // Check each file size (max 2MB)
            for (const file of files) {
                if (file.size > 2 * 1024 * 1024) {
                    alert(`File ${file.name} exceeds 2MB size limit`);
                    return;
                }
            }

            setImages(files);

            // Create previews for gallery images
            const previews = [];
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previews.push(e.target.result);
                    if (previews.length === files.length) {
                        setFormData({
                            ...formData,
                            gallery: [...formData.gallery, ...previews]
                        });
                    }
                };
                reader.readAsDataURL(file);
            }
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
        const newGallery = [...formData.gallery];
        newGallery.splice(index, 1);
        setFormData({
            ...formData,
            gallery: newGallery
        });
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
            // Upload thumbnail image to Cloudinary if a new one was selected
            let thumbnailUrl = formData.thumbnail;
            if (thumbnail_img) {
                thumbnailUrl = await handleImageUpload(thumbnail_img);
            }

            // Upload new gallery images to Cloudinary
            const newGalleryUrls = [];
            for (const image of images) {
                const url = await handleImageUpload(image);
                if (url) newGalleryUrls.push(url);
            }

            // Combine existing gallery URLs with new ones
            const existingGalleryUrls = formData.gallery.filter(item => typeof item === 'string');
            const galleryUrls = [...existingGalleryUrls, ...newGalleryUrls];

            // Prepare event data for Firebase
            const eventData = {
                title: formData.title,
                date: formData.date,
                time: formData.time,
                location: formData.location,
                description: formData.description,
                big_description: formData.big_description,
                objectives: formData.objectives,
                thumbnail: thumbnailUrl,
                gallery: galleryUrls,
                link: formData.link,
                type: formData.type,
                coordinator_name: formData.coordinator_name,
                coordinator_whatsapp: formData.coordinator_whatsapp,
                status: formData.status,
                reg_status: formData.reg_status,
                highlights: formData.highlights,
                updatedAt: new Date()
            };

            if (editingEvent) {
                // Update existing event
                await updateDoc(doc(db, "events", editingEvent.id), eventData);
                // console.log("Event updated with ID: ", editingEvent.id);
            } else {
                // Add new event
                eventData.createdAt = new Date();
                const docRef = await addDoc(collection(db, "events"), eventData);
                // console.log("Event created with ID: ", docRef.id);
            }

            // Reset form
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

            // Call success callback
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error("Error saving event: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const cancelEdit = () => {
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

        // Navigate back to view tab
        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <div className="px-6 py-4 bg-gray-50">
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
                                <img
                                 draggable={false} // prevent dragging
                                 onDragStart={(e) => e.preventDefault()}
                                    src={formData.thumbnail}
                                    alt="Thumbnail preview"
                                    className="h-20 w-20 object-cover rounded"
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
                                    <img
                                         draggable={false} // prevent dragging
                                         onDragStart={(e) => e.preventDefault()}
                                        src={image}
                                        alt={`Gallery preview ${index}`}
                                        className="h-20 w-20 object-cover rounded"
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
        </div>
    );
}

export default EventForm;