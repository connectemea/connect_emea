
// Events List Component (1st Tab)
function EventsList() {
    const [events, setEvents] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [regStatusDialogOpen, setRegStatusDialogOpen] = useState(false);
    const [eventToAction, setEventToAction] = useState(null);
    const [actionType, setActionType] = useState('');
    const [viewEvent, setViewEvent] = useState(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    // Fetch events from Firebase
    const fetchEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            const eventsData = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({ id: doc.id, ...doc.data() });
            });
            // Sort events by date (newest first)
            eventsData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setEvents(eventsData);
        } catch (error) {
            console.error("Error fetching events: ", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

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

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "events", eventToAction.id));
            setDeleteDialogOpen(false);
            fetchEvents(); // Refresh the events list
        } catch (error) {
            console.error("Error deleting event: ", error);
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

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
    ];
    const regStatusOptions = [
        { value: 'open', label: 'Open' },
        { value: 'closed', label: 'Closed' }
    ];

    return (
        <div className="px-6 py-4">
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
                <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No events created yet</p>
                    <p className="text-gray-400">Click "Add Event" to create your first event</p>
                </div>
            ) : (
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
                                                <img
                                                draggable={false} // prevent dragging
                                                onDragStart={(e) => e.preventDefault()}
                                                    src={event.thumbnail}
                                                    alt={event.title}
                                                    className="h-10 w-10 object-cover rounded mr-3"
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
                                            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                                                <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                                                    <SheetHeader>
                                                        <SheetTitle>{viewEvent?.title}</SheetTitle>
                                                        <SheetDescription>
                                                            Event details and information
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    {viewEvent && (
                                                        <div className="grid gap-4 py-4">
                                                            {viewEvent.thumbnail && (
                                                                <img
                                                                draggable={false} // prevent dragging
                                                                onDragStart={(e) => e.preventDefault()}
                                                                    src={viewEvent.thumbnail}
                                                                    alt={viewEvent.title}
                                                                    className="w-full h-48 object-cover rounded-md"
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
                                                                            <img 
                                                                            draggable={false} // prevent dragging
                                                                            onDragStart={(e) => e.preventDefault()}
                                                                             key={index} src={image} alt={`Gallery ${index}`} className="w-full h-24 object-cover rounded" />
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
                                                onClick={() => window.location.href = `/events?edit=${event.id}`}
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


export default EventsList;