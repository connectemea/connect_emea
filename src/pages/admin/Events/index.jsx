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

// Main Events Manager Component with Tabs
function Events() {
    const [activeTab, setActiveTab] = useState("view");

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
                            <TabsTrigger value="add">Add Event</TabsTrigger>
                        </TabsList>

                        {/* View Events Tab */}
                        <TabsContent value="view" className="p-0">
                            <EventsList />
                        </TabsContent>

                        {/* Add/Edit Event Tab */}
                        <TabsContent value="add" className="p-0">
                            <EventForm onSuccess={() => setActiveTab("view")} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Events;