import React, { useState, useMemo } from 'react';
import { ExternalLink, User, MapPin, Mail, Phone, Linkedin, Github, Instagram, Search, Filter } from 'lucide-react';
import TeamsData from '@/const/data/Teams';

// Define types based on your TeamsData structure
// interface Social {
//     linkedin?: string;
//     github?: string;
//     instagram?: string;
//     twitter?: string;
//     behance?: string;
// }

// interface Intern {
//     id: number;
//     name: string;
//     role: string;
//     position: string;
//     image: string;
//     email: string;
//     phone: string;
//     status: string;
//     place: string;
//     social: Social;
// }

function Interns() {
    // Use TeamsData as internsData
    const internsData = [...TeamsData.InternsData, ...TeamsData.FoundersData];
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Alumni':
            case 'Passout':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Drop':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Get unique statuses and roles for filters
    const statusOptions = ['All', ...new Set(internsData.map(intern => intern.status))];
    const roleOptions = ['All', ...new Set(internsData.map(intern => intern.role))];

    // Filter interns based on search term and filters
    const filteredInterns = useMemo(() => {
        return internsData.filter(intern => {
            const matchesSearch =
                intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                intern.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                intern.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                intern.place.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'All' || intern.status === statusFilter;
            const matchesRole = roleFilter === 'All' || intern.role === roleFilter;

            return matchesSearch && matchesStatus && matchesRole;
        });
    }, [internsData, searchTerm, statusFilter, roleFilter]);


    const getDiffDepartments = (data) => {
        const departments = new Set(data.map(intern => intern.role));
        return departments.size;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">Interns Dashboard</h1>
                        <a
                            href="https://www.notion.so/bf253aaca89340e6857fabd7761abf96?v=876e473fe9da43dcbea47ef86d13427c"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View in Notion
                        </a>
                    </div>
                    <p className="text-gray-600">Manage and track intern information and progress</p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Bar */}
                        <div >
                            <h6 className="mb-1 font-medium text-gray-700">Search Interns</h6>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search interns..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                />
                            </div>
                        </div>


                        {/* Status Filter */}
                        <div >
                            <h6 className="mb-1 font-medium text-gray-700">Filter by Status</h6>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none appearance-none"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* Role Filter */}
                        <div >
                            <h6 className="md:col-span-3 text-gray-500 font-medium">Filter by Role</h6>
                            <div className="relative">

                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none appearance-none"
                                >
                                    {roleOptions.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Interns</h3>
                        <p className="text-3xl font-bold text-gray-900">{internsData.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 border">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Active Interns</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {internsData.filter(intern => intern.status === 'Active').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 border">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Alumni</h3>
                        <p className="text-3xl font-bold text-blue-600">
                            {internsData.filter(intern => intern.status === 'Alumni' || intern.status === 'Passout').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 border">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Departments</h3>
                        <p className="text-3xl font-bold text-orange-600">
                            {getDiffDepartments(internsData)}
                        </p>
                    </div>
                </div>

                {/* Results Count */}
                {searchTerm || statusFilter !== 'All' || roleFilter !== 'All' ? (
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing {filteredInterns.length} of {internsData.length} interns
                            {searchTerm && ` matching "${searchTerm}"`}
                            {statusFilter !== 'All' && ` with status "${statusFilter}"`}
                            {roleFilter !== 'All' && ` in role "${roleFilter}"`}
                        </p>
                    </div>
                ) : null}

                {/* Interns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInterns.length > 0 ? (
                        filteredInterns.map((intern) => (
                            <div key={intern.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            {intern.image ? (
                                                <img
                                                    loading="lazy"
                                                    draggable={false} // prevent dragging
                                                    onDragStart={(e) => e.preventDefault()} src={intern.image} alt={intern.name} className="w-10 h-10 rounded-full object-cover" />
                                            ) : (
                                                <User className="w-6 h-6 text-orange-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{intern.name}</h3>
                                            <p className="text-sm text-gray-500">{intern.role}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(intern.status)}`}>
                                        {intern.status}
                                    </span>
                                </div>

                                {/* Position */}
                                <div className="mb-4">
                                    <p className="font-medium text-gray-900">{intern.position}</p>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span className="truncate">{intern.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="w-4 h-4" />
                                        <span>{intern.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span>{intern.place}</span>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-2">Social Profiles</p>
                                    <div className="flex gap-3">
                                        {intern.social.linkedin && (
                                            <a
                                                href={intern.social.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {intern.social.github && (
                                            <a
                                                href={intern.social.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-800 hover:text-black transition-colors"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {intern.social.instagram && (
                                            <a
                                                href={intern.social.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-pink-600 hover:text-pink-800 transition-colors"
                                            >
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Search className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">No interns found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Interns;