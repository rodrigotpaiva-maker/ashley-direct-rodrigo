import React, { useState } from 'react';
import { DocumentTextIcon, FolderIcon, MagnifyingGlassIcon, ArrowDownTrayIcon, EyeIcon, PencilIcon, TrashIcon, PlusIcon, CloudArrowUpIcon, TagIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'image' | 'video' | 'template' | 'guide';
  category: string;
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
  tags: string[];
  uploadedBy: string;
  fileUrl: string;
  previewUrl?: string;
}

interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  resourceCount: number;
  icon: React.ReactNode;
}

const ResourceLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample resource categories
  const categories: ResourceCategory[] = [
    {
      id: 'all',
      name: 'All Resources',
      description: 'View all available resources',
      resourceCount: 45,
      icon: <FolderIcon className="h-6 w-6" />
    },
    {
      id: 'marketing-materials',
      name: 'Marketing Materials',
      description: 'Brochures, flyers, and promotional content',
      resourceCount: 12,
      icon: <DocumentTextIcon className="h-6 w-6" />
    },
    {
      id: 'product-catalogs',
      name: 'Product Catalogs',
      description: 'Complete product catalogs and specifications',
      resourceCount: 8,
      icon: <DocumentTextIcon className="h-6 w-6" />
    },
    {
      id: 'training-materials',
      name: 'Training Materials',
      description: 'Employee training guides and videos',
      resourceCount: 15,
      icon: <DocumentTextIcon className="h-6 w-6" />
    },
    {
      id: 'templates',
      name: 'Templates',
      description: 'Document and design templates',
      resourceCount: 10,
      icon: <DocumentTextIcon className="h-6 w-6" />
    }
  ];

  // Sample resources
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Ashley Direct 2025 Product Catalog',
      description: 'Complete catalog featuring all furniture collections for business customers',
      type: 'document',
      category: 'product-catalogs',
      fileSize: '15.2 MB',
      uploadDate: '2025-09-01',
      downloadCount: 342,
      tags: ['catalog', 'products', '2025', 'furniture'],
      uploadedBy: 'Marketing Team',
      fileUrl: '/resources/catalog-2025.pdf',
      previewUrl: '/resources/catalog-2025-preview.jpg'
    },
    {
      id: '2',
      title: 'Office Furniture Buying Guide',
      description: 'Comprehensive guide to help customers choose the right office furniture',
      type: 'guide',
      category: 'marketing-materials',
      fileSize: '3.8 MB',
      uploadDate: '2025-08-15',
      downloadCount: 178,
      tags: ['guide', 'office', 'buying-guide', 'customers'],
      uploadedBy: 'Sales Team',
      fileUrl: '/resources/office-buying-guide.pdf'
    },
    {
      id: '3',
      title: 'Employee Training: Customer Service Excellence',
      description: 'Video training series on delivering exceptional customer service',
      type: 'video',
      category: 'training-materials',
      fileSize: '125.6 MB',
      uploadDate: '2025-08-20',
      downloadCount: 89,
      tags: ['training', 'customer-service', 'video', 'employees'],
      uploadedBy: 'HR Department',
      fileUrl: '/resources/customer-service-training.mp4'
    },
    {
      id: '4',
      title: 'Ergonomic Workspace Design Template',
      description: 'PowerPoint template for designing ergonomic workspaces',
      type: 'template',
      category: 'templates',
      fileSize: '2.1 MB',
      uploadDate: '2025-09-05',
      downloadCount: 56,
      tags: ['template', 'ergonomic', 'workspace', 'design'],
      uploadedBy: 'Design Team',
      fileUrl: '/resources/ergonomic-workspace-template.pptx'
    },
    {
      id: '5',
      title: 'Brand Guidelines 2025',
      description: 'Updated brand guidelines including logo usage, colors, and typography',
      type: 'document',
      category: 'marketing-materials',
      fileSize: '8.4 MB',
      uploadDate: '2025-08-10',
      downloadCount: 234,
      tags: ['brand', 'guidelines', 'logo', 'colors'],
      uploadedBy: 'Marketing Team',
      fileUrl: '/resources/brand-guidelines-2025.pdf'
    },
    {
      id: '6',
      title: 'Sustainability Report 2024',
      description: 'Annual sustainability report highlighting our environmental initiatives',
      type: 'document',
      category: 'marketing-materials',
      fileSize: '6.7 MB',
      uploadDate: '2025-07-30',
      downloadCount: 145,
      tags: ['sustainability', 'environment', 'report', '2024'],
      uploadedBy: 'Sustainability Team',
      fileUrl: '/resources/sustainability-report-2024.pdf'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'text-blue-700 bg-blue-100';
      case 'image':
        return 'text-green-700 bg-green-100';
      case 'video':
        return 'text-purple-700 bg-purple-100';
      case 'template':
        return 'text-orange-700 bg-orange-100';
      case 'guide':
        return 'text-indigo-700 bg-indigo-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const downloadResource = (resource: Resource) => {
    alert(`Downloading: ${resource.title}`);
  };

  const deleteResource = (resourceId: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      alert('Resource deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
          <p className="text-gray-600">Centralized repository for all marketing and business resources</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <CloudArrowUpIcon className="h-4 w-4" />
            Upload Resource
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 flex items-center gap-3 ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 border border-blue-200 text-blue-900'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="text-gray-500">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.resourceCount} items</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Resource Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <DocumentTextIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">{resource.fileSize}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {resource.uploadDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowDownTrayIcon className="h-3 w-3" />
                        {resource.downloadCount}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => downloadResource(resource)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        Download
                      </button>
                      <button
                        onClick={() => setSelectedResource(resource)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                          <div>
                            <h3 className="font-medium text-gray-900">{resource.title}</h3>
                            <p className="text-sm text-gray-600">{resource.description}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {resource.uploadDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <UserIcon className="h-4 w-4" />
                            {resource.uploadedBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <ArrowDownTrayIcon className="h-4 w-4" />
                            {resource.downloadCount} downloads
                          </div>
                          <div>{resource.fileSize}</div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resource.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setSelectedResource(resource)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium p-2 rounded hover:bg-blue-50 transition-colors duration-200"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => downloadResource(resource)}
                          className="text-green-600 hover:text-green-800 text-sm font-medium p-2 rounded hover:bg-green-50 transition-colors duration-200"
                          title="Download"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert('Edit functionality would be implemented here')}
                          className="text-gray-600 hover:text-gray-800 text-sm font-medium p-2 rounded hover:bg-gray-50 transition-colors duration-200"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteResource(resource.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium p-2 rounded hover:bg-red-50 transition-colors duration-200"
                          title="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upload New Resource</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Drop files here or click to browse</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter resource title"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {categories.filter(cat => cat.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter resource description"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="Enter tags separated by commas"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  alert('Resource uploaded successfully!');
                  setShowUploadModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Upload Resource
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resource Details Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Resource Details</h2>
              <button
                onClick={() => setSelectedResource(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{selectedResource.title}</h3>
                <p className="text-gray-600 mt-1">{selectedResource.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <span className={`inline-block text-xs px-2 py-1 rounded-full ${getTypeColor(selectedResource.type)}`}>
                    {selectedResource.type.charAt(0).toUpperCase() + selectedResource.type.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">File Size</p>
                  <p className="text-sm font-medium text-gray-900">{selectedResource.fileSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Upload Date</p>
                  <p className="text-sm font-medium text-gray-900">{selectedResource.uploadDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Downloads</p>
                  <p className="text-sm font-medium text-gray-900">{selectedResource.downloadCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uploaded By</p>
                  <p className="text-sm font-medium text-gray-900">{selectedResource.uploadedBy}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {selectedResource.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => downloadResource(selectedResource)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceLibrary;