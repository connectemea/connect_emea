import React, { useState } from 'react';
import { Users, Calendar, CheckCircle, ExternalLink, BarChart3, Clock } from 'lucide-react';

function Dashboard() {
    // Sample data - you can replace these with actual values
    const [stats, setStats] = useState({
        eventsCoordinated: 12,
        totalInterns: 45,
        passedInterns: 38,
        activeInterns: 32,
        completionRate: 84.4
    });

    const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Icon className="h-8 w-8" style={{ color: color }} />
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            {title}
                        </dt>
                        <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                                {value}
                            </div>
                            {subtitle && (
                                <div className="ml-2 flex items-baseline text-sm text-gray-600">
                                    {subtitle}
                                </div>
                            )}
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );

    const QuickLink = ({ href, title, description, icon: Icon }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border hover:border-blue-300"
        >
            <div className="flex items-start">
                <Icon className="h-6 w-6 text-blue-600 mt-1" />
                <div className="ml-3 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        {title}
                        <ExternalLink className="h-4 w-4 ml-2 text-gray-400" />
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </a>
    );

    return (
        <div className="min-h-[calc(100vh-120px)]  p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Internship Program Dashboard</h1>
                    <p className="mt-2 text-gray-600">Overview of program metrics and quick access to important resources</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Calendar}
                        title="Events Coordinated"
                        value={stats.eventsCoordinated}
                        color="#3B82F6"
                    />
                    <StatCard
                        icon={Users}
                        title="Total Interns"
                        value={stats.totalInterns}
                        color="#10B981"
                    />
                    <StatCard
                        icon={CheckCircle}
                        title="Passed Interns"
                        value={stats.passedInterns}
                        color="#8B5CF6"
                        subtitle={`${stats.completionRate}% success rate`}
                    />
                    <StatCard
                        icon={Clock}
                        title="Active Interns"
                        value={stats.activeInterns}
                        color="#F59E0B"
                    />
                </div>

                {/* Progress Overview */}
                {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                        Program Progress
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Completion Rate</span>
                                <span>{stats.completionRate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${stats.completionRate}%` }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Active Participation</span>
                                <span>{((stats.activeInterns / stats.totalInterns) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(stats.activeInterns / stats.totalInterns) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <QuickLink
                            href="https://www.notion.so/Dashboard-92a9fc045b184f50a1709c34d1aeccfc"
                            title="Notion Dashboard"
                            description="Access the main program dashboard with detailed analytics and reports"
                            icon={BarChart3}
                        />
                        <QuickLink
                            href="https://www.notion.so/3d43a57d502e4d7cbdebb44dd69b5b3c?v=bd5b50022e894915b087c54ace9b24e2"
                            title="Meetings List"
                            description="View and manage all scheduled meetings and events"
                            icon={Calendar}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>Dashboard last updated: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;