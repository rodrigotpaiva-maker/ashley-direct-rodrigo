import React, { useState } from 'react';
import { 
  CalendarDaysIcon,
  ClockIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TruckIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'delivery' | 'meeting' | 'deadline' | 'maintenance';
  date: string;
  time: string;
  duration: string;
  attendees?: string[];
  location?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

interface BusinessCalendarProps {
  className?: string;
}

const BusinessCalendar: React.FC<BusinessCalendarProps> = ({ className = '' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const events: Event[] = [
    {
      id: '1',
      title: 'Weekly Delivery Coordination',
      description: 'Review delivery schedules and coordinate with warehouse team',
      type: 'meeting',
      date: '2024-03-15',
      time: '09:00',
      duration: '1 hour',
      attendees: ['John Anderson', 'Sarah Wilson', 'Mike Roberts'],
      location: 'Conference Room A',
      priority: 'high',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Furniture Delivery - Premier Store',
      description: 'Ashley Sofa Collection delivery to Premier Furniture Store',
      type: 'delivery',
      date: '2024-03-15',
      time: '14:00',
      duration: '3 hours',
      location: 'Atlanta, GA',
      priority: 'medium',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Quarter-End Financial Review',
      description: 'Review Q1 financial performance and prepare reports',
      type: 'deadline',
      date: '2024-03-31',
      time: '17:00',
      duration: '2 hours',
      priority: 'high',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'System Maintenance Window',
      description: 'Scheduled platform maintenance and updates',
      type: 'maintenance',
      date: '2024-03-17',
      time: '02:00',
      duration: '4 hours',
      priority: 'medium',
      status: 'scheduled'
    },
    {
      id: '5',
      title: 'Dealer Training Session',
      description: 'New product training for Southeast dealers',
      type: 'meeting',
      date: '2024-03-20',
      time: '10:00',
      duration: '2 hours',
      attendees: ['Training Team', 'Regional Dealers'],
      location: 'Virtual Meeting',
      priority: 'medium',
      status: 'scheduled'
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'delivery': return TruckIcon;
      case 'meeting': return UsersIcon;
      case 'deadline': return ExclamationTriangleIcon;
      case 'maintenance': return BuildingOfficeIcon;
      default: return CalendarDaysIcon;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'delivery': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-green-100 text-green-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate > today && eventDate <= nextWeek;
  }).slice(0, 5);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <CalendarDaysIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Business Calendar</h1>
              <p className="text-gray-600 mt-1">Operational scheduling and planning</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="w-4 h-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 min-w-48 text-center">
                {getMonthName(currentDate)}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Today
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {(['month', 'week', 'day'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    viewMode === mode
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            {todayEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarDaysIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No events scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => {
                  const IconComponent = getEventTypeIcon(event.type);
                  return (
                    <div key={event.id} className={`flex items-start space-x-3 p-4 border-l-4 bg-gray-50 rounded-lg ${getPriorityColor(event.priority)}`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        getEventTypeColor(event.type).replace('text-', 'text-white bg-').replace('-100', '-600')
                      }`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <ClockIcon className="w-3 h-3" />
                            <span>{event.time} ({event.duration})</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            getEventTypeColor(event.type)
                          }`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                          {event.location && (
                            <span className="text-xs text-gray-500">{event.location}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* All Events List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Events</h3>
            <div className="space-y-3">
              {filteredEvents.map((event) => {
                const IconComponent = getEventTypeIcon(event.type);
                return (
                  <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        getEventTypeColor(event.type).replace('text-', 'text-white bg-').replace('-100', '-600')
                      }`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{event.date} at {event.time}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            getEventTypeColor(event.type)
                          }`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${
                        event.priority === 'high' ? 'bg-red-500' :
                        event.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const IconComponent = getEventTypeIcon(event.type);
                return (
                  <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      getEventTypeColor(event.type).replace('text-', 'text-white bg-').replace('-100', '-600')
                    }`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                      <p className="text-xs text-gray-600">{event.date} at {event.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calendar Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Events</span>
                <span className="font-semibold text-gray-900">{events.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Today's Events</span>
                <span className="font-semibold text-blue-600">{todayEvents.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold text-green-600">{upcomingEvents.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Priority</span>
                <span className="font-semibold text-red-600">
                  {events.filter(e => e.priority === 'high').length}
                </span>
              </div>
            </div>
          </div>

          {/* Event Types Legend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
            <div className="space-y-2">
              {[
                { type: 'delivery', label: 'Deliveries', icon: TruckIcon },
                { type: 'meeting', label: 'Meetings', icon: UsersIcon },
                { type: 'deadline', label: 'Deadlines', icon: ExclamationTriangleIcon },
                { type: 'maintenance', label: 'Maintenance', icon: BuildingOfficeIcon }
              ].map(({ type, label, icon: Icon }) => (
                <div key={type} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    getEventTypeColor(type).replace('text-', 'text-white bg-').replace('-100', '-600')
                  }`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">{label}</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">
                    {events.filter(e => e.type === type).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCalendar;