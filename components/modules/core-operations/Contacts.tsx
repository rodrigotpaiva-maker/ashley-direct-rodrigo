import React, { useState } from 'react';
import { 
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  BuildingOfficeIcon,
  UserIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  mobile?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  territory: string;
  type: 'dealer' | 'distributor' | 'licensee' | 'supplier' | 'internal';
  status: 'active' | 'inactive';
  lastContact: string;
  notes: string;
  favorite: boolean;
  tags: string[];
}

interface ContactsProps {
  className?: string;
}

const Contacts: React.FC<ContactsProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);

  const contacts: Contact[] = [
    {
      id: '1',
      firstName: 'Michael',
      lastName: 'Johnson',
      title: 'Store Manager',
      company: 'Premier Furniture Store',
      email: 'm.johnson@premierfurniture.com',
      phone: '(555) 123-4567',
      mobile: '(555) 987-6543',
      address: '1234 Main Street',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30309',
      territory: 'Southeast',
      type: 'dealer',
      status: 'active',
      lastContact: '2024-03-10',
      notes: 'Key decision maker for large orders. Prefers phone communication.',
      favorite: true,
      tags: ['VIP', 'Large Orders', 'Decision Maker']
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Williams',
      title: 'Distribution Manager',
      company: 'HomeStyle Distribution Center',
      email: 's.williams@homestyledist.com',
      phone: '(555) 234-5678',
      address: '567 Commerce Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60607',
      territory: 'Midwest',
      type: 'distributor',
      status: 'active',
      lastContact: '2024-03-08',
      notes: 'Handles regional distribution for Midwest territory.',
      favorite: false,
      tags: ['Regional', 'Distribution']
    },
    {
      id: '3',
      firstName: 'David',
      lastName: 'Chen',
      title: 'Operations Director',
      company: 'Luxury Furnishings LLC',
      email: 'd.chen@luxuryfurn.com',
      phone: '(555) 345-6789',
      mobile: '(555) 876-5432',
      address: '890 Design Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      territory: 'Southeast',
      type: 'licensee',
      status: 'active',
      lastContact: '2024-03-05',
      notes: 'Licensed dealer specializing in high-end furniture collections.',
      favorite: true,
      tags: ['Luxury', 'High-End', 'Licensee']
    },
    {
      id: '4',
      firstName: 'Jennifer',
      lastName: 'Martinez',
      title: 'Procurement Manager',
      company: 'Ashley Furniture Industries',
      email: 'j.martinez@ashleyfurniture.com',
      phone: '(555) 456-7890',
      address: 'One Ashley Way',
      city: 'Arcadia',
      state: 'WI',
      zipCode: '54612',
      territory: 'Corporate',
      type: 'internal',
      status: 'active',
      lastContact: '2024-03-12',
      notes: 'Internal contact for procurement and vendor management.',
      favorite: false,
      tags: ['Internal', 'Procurement']
    },
    {
      id: '5',
      firstName: 'Robert',
      lastName: 'Taylor',
      title: 'Supply Chain Manager',
      company: 'Quality Components Inc',
      email: 'r.taylor@qualitycomp.com',
      phone: '(555) 567-8901',
      address: '123 Industrial Park',
      city: 'Grand Rapids',
      state: 'MI',
      zipCode: '49501',
      territory: 'Midwest',
      type: 'supplier',
      status: 'active',
      lastContact: '2024-03-01',
      notes: 'Key supplier for hardware components and mechanisms.',
      favorite: false,
      tags: ['Supplier', 'Hardware']
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || contact.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getContactTypeIcon = (type: string) => {
    switch (type) {
      case 'dealer': return BuildingOfficeIcon;
      case 'distributor': return UserGroupIcon;
      case 'licensee': return StarIcon;
      case 'supplier': return TagIcon;
      case 'internal': return UserIcon;
      default: return UserIcon;
    }
  };

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case 'dealer': return 'bg-blue-100 text-blue-800';
      case 'distributor': return 'bg-purple-100 text-purple-800';
      case 'licensee': return 'bg-orange-100 text-orange-800';
      case 'supplier': return 'bg-green-100 text-green-800';
      case 'internal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const favoriteContacts = contacts.filter(contact => contact.favorite);
  const recentContacts = contacts.sort((a, b) => 
    new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime()
  ).slice(0, 5);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
              <p className="text-gray-600 mt-1">Relationship and contact management</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddContact(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="dealer">Dealers</option>
              <option value="distributor">Distributors</option>
              <option value="licensee">Licensees</option>
              <option value="supplier">Suppliers</option>
              <option value="internal">Internal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredContacts.map((contact) => {
            const TypeIcon = getContactTypeIcon(contact.type);
            return (
              <div 
                key={contact.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                      {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        {contact.favorite && (
                          <StarIconSolid className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-gray-600">{contact.title}</p>
                      <p className="text-gray-600">{contact.company}</p>
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <EnvelopeIcon className="w-3 h-3" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <PhoneIcon className="w-3 h-3" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          getContactTypeColor(contact.type)
                        }`}>
                          {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <MapPinIcon className="w-3 h-3" />
                          <span>{contact.city}, {contact.state}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <ClockIcon className="w-3 h-3" />
                          <span>Last contact: {contact.lastContact}</span>
                        </div>
                      </div>
                      
                      {contact.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {contact.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Contacts</span>
                <span className="font-semibold text-gray-900">{contacts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dealers</span>
                <span className="font-semibold text-blue-600">
                  {contacts.filter(c => c.type === 'dealer').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Distributors</span>
                <span className="font-semibold text-purple-600">
                  {contacts.filter(c => c.type === 'distributor').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Favorites</span>
                <span className="font-semibold text-yellow-600">{favoriteContacts.length}</span>
              </div>
            </div>
          </div>

          {/* Favorite Contacts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorites</h3>
            <div className="space-y-3">
              {favoriteContacts.map((contact) => (
                <div key={contact.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                    {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{contact.company}</p>
                  </div>
                  <StarIconSolid className="w-4 h-4 text-yellow-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Contacts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h3>
            <div className="space-y-3">
              {recentContacts.map((contact) => {
                const TypeIcon = getContactTypeIcon(contact.type);
                return (
                  <div key={contact.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      getContactTypeColor(contact.type).replace('text-', 'text-white bg-').replace('-100', '-600')
                    }`}>
                      <TypeIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="text-xs text-gray-600">{contact.lastContact}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Import Contacts
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Export Contacts
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Sync with CRM
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Send Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Details Modal (when selectedContact is set) */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                    {selectedContact.firstName.charAt(0)}{selectedContact.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </h3>
                    <p className="text-gray-600">{selectedContact.title}</p>
                    <p className="text-gray-600">{selectedContact.company}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <p className="text-sm text-gray-900">{selectedContact.mobile || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Territory</label>
                    <p className="text-sm text-gray-900">{selectedContact.territory}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="text-sm text-gray-900">
                    {selectedContact.address}<br/>
                    {selectedContact.city}, {selectedContact.state} {selectedContact.zipCode}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-sm text-gray-900">{selectedContact.notes}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Edit Contact
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;