import React, { useState } from 'react';

interface ProductSpec {
  id: string;
  productName: string;
  sku: string;
  category: string;
  specifications: {
    general: {
      manufacturer: string;
      collection: string;
      style: string;
      warranty: string;
    };
    dimensions: {
      length: number;
      width: number;
      height: number;
      weight: number;
      packaged_weight: number;
      seat_height?: number;
      seat_depth?: number;
    };
    materials: {
      primary_material: string;
      frame_material: string;
      upholstery?: string;
      finish: string;
      hardware: string;
    };
    features: {
      assembly_required: boolean;
      care_instructions: string;
      special_features: string[];
      color_options: string[];
    };
    compliance: {
      greenguard_certified: boolean;
      carb_compliant: boolean;
      fire_retardant: boolean;
      safety_standards: string[];
    };
  };
  technical_drawings: string[];
  assembly_instructions: string;
  care_guide: string;
  lastUpdated: string;
}

const ProductSpecifications: React.FC = () => {
  const [specifications] = useState<ProductSpec[]>([
    {
      id: 'SPEC-001',
      productName: 'Executive Leather Office Chair',
      sku: 'ASH-CH-001',
      category: 'Office Seating',
      specifications: {
        general: {
          manufacturer: 'Ashley Furniture Industries',
          collection: 'Executive Pro Series',
          style: 'Contemporary Executive',
          warranty: '5 Years Limited'
        },
        dimensions: {
          length: 28,
          width: 30,
          height: 48,
          weight: 55,
          packaged_weight: 65,
          seat_height: 19.5,
          seat_depth: 20
        },
        materials: {
          primary_material: 'Top-Grain Leather',
          frame_material: 'Reinforced Steel Frame',
          upholstery: 'Premium Leather with Contrast Stitching',
          finish: 'Hand-Rubbed Black Leather',
          hardware: 'Chrome-Plated Steel Hardware'
        },
        features: {
          assembly_required: true,
          care_instructions: 'Clean with leather conditioner monthly. Avoid direct sunlight.',
          special_features: [
            'Pneumatic Height Adjustment',
            'Tilt Lock Mechanism',
            'Lumbar Support',
            '360-Degree Swivel',
            'Heavy-Duty Casters'
          ],
          color_options: ['Black', 'Brown', 'Navy']
        },
        compliance: {
          greenguard_certified: true,
          carb_compliant: true,
          fire_retardant: true,
          safety_standards: ['ANSI/BIFMA X5.1', 'GREENGUARD Gold']
        }
      },
      technical_drawings: ['/specs/chair-executive-technical.pdf', '/specs/chair-executive-assembly.pdf'],
      assembly_instructions: 'Detailed assembly guide with step-by-step instructions and hardware identification.',
      care_guide: 'Professional leather care guidelines including cleaning schedule and recommended products.',
      lastUpdated: '2024-12-01'
    },
    {
      id: 'SPEC-002',
      productName: 'Modern Sectional Sofa',
      sku: 'ASH-SO-001',
      category: 'Living Room Seating',
      specifications: {
        general: {
          manufacturer: 'Ashley Furniture Industries',
          collection: 'Modern Living Collection',
          style: 'Contemporary Sectional',
          warranty: '3 Years Limited'
        },
        dimensions: {
          length: 108,
          width: 84,
          height: 35,
          weight: 185,
          packaged_weight: 210,
          seat_height: 18,
          seat_depth: 22
        },
        materials: {
          primary_material: 'Performance Fabric',
          frame_material: 'Kiln-Dried Hardwood Frame',
          upholstery: 'Stain-Resistant Performance Fabric',
          finish: 'Charcoal Gray Performance Fabric',
          hardware: 'Hidden Metal Connectors'
        },
        features: {
          assembly_required: true,
          care_instructions: 'Machine washable cushion covers. Vacuum regularly. Professional cleaning recommended annually.',
          special_features: [
            'Modular Design',
            'Reversible Seat Cushions',
            'High-Density Foam',
            'No-Sag Springs',
            'Removable Cushion Covers'
          ],
          color_options: ['Charcoal Gray', 'Navy Blue', 'Beige', 'Light Gray']
        },
        compliance: {
          greenguard_certified: false,
          carb_compliant: true,
          fire_retardant: true,
          safety_standards: ['CAL TB 117-2013', 'CPSC Guidelines']
        }
      },
      technical_drawings: ['/specs/sofa-sectional-technical.pdf', '/specs/sofa-sectional-layout.pdf'],
      assembly_instructions: 'Modular assembly guide with connector hardware and configuration options.',
      care_guide: 'Fabric care instructions including stain removal and maintenance schedule.',
      lastUpdated: '2024-11-28'
    },
    {
      id: 'SPEC-003',
      productName: 'Glass Top Conference Table',
      sku: 'ASH-TB-001',
      category: 'Office Tables',
      specifications: {
        general: {
          manufacturer: 'Ashley Furniture Industries',
          collection: 'Corporate Elite Series',
          style: 'Modern Professional',
          warranty: '2 Years Limited'
        },
        dimensions: {
          length: 96,
          width: 42,
          height: 30,
          weight: 120,
          packaged_weight: 140
        },
        materials: {
          primary_material: 'Tempered Glass',
          frame_material: 'Powder-Coated Steel Base',
          finish: 'Clear Tempered Glass Top',
          hardware: 'Adjustable Leveling Glides'
        },
        features: {
          assembly_required: true,
          care_instructions: 'Clean with glass cleaner. Use coasters to prevent scratches.',
          special_features: [
            '8-Person Capacity',
            'Cable Management System',
            'Scratch-Resistant Surface',
            'Adjustable Levelers',
            'Easy Assembly Design'
          ],
          color_options: ['Clear Glass/Black Base', 'Clear Glass/Silver Base']
        },
        compliance: {
          greenguard_certified: false,
          carb_compliant: true,
          fire_retardant: false,
          safety_standards: ['ANSI/BIFMA X5.5', 'CPSC Safety Standards']
        }
      },
      technical_drawings: ['/specs/table-conference-technical.pdf', '/specs/table-conference-assembly.pdf'],
      assembly_instructions: 'Glass handling safety guide and base assembly instructions.',
      care_guide: 'Glass care and maintenance guidelines including cleaning products and safety tips.',
      lastUpdated: '2024-11-15'
    }
  ]);

  const [selectedSpec, setSelectedSpec] = useState<ProductSpec | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const categories = [...new Set(specifications.map(spec => spec.category))];

  const filteredSpecs = specifications.filter(spec => {
    const matchesSearch = !searchTerm ||
      spec.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || spec.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const toggleSection = (specId: string, section: string) => {
    const key = `${specId}-${section}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isExpanded = (specId: string, section: string) => {
    return expandedSections[`${specId}-${section}`] || false;
  };

  const renderSpecSection = (title: string, data: any, specId: string, sectionKey: string) => {
    const expanded = isExpanded(specId, sectionKey);
    
    return (
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection(specId, sectionKey)}
          className="w-full px-4 py-3 text-left font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
        >
          {title}
          <svg
            className={`w-5 h-5 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded && (
          <div className="px-4 py-3 space-y-3">
            {typeof data === 'object' && !Array.isArray(data) ? (
              Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm text-gray-900">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-900">
                {Array.isArray(data) ? data.join(', ') : String(data)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Specifications</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name or SKU..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Specifications List */}
      <div className="space-y-6">
        {filteredSpecs.map((spec) => (
          <div key={spec.id} className="bg-white rounded-lg shadow-sm border">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{spec.productName}</h3>
                  <div className="flex space-x-4 mt-1">
                    <span className="text-sm text-gray-500">SKU: {spec.sku}</span>
                    <span className="text-sm text-gray-500">Category: {spec.category}</span>
                    <span className="text-sm text-gray-500">Updated: {spec.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedSpec(spec)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    View Full Details
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Specification Sections */}
            <div className="p-6 space-y-4">
              {renderSpecSection('General Information', spec.specifications.general, spec.id, 'general')}
              {renderSpecSection('Dimensions & Weight', spec.specifications.dimensions, spec.id, 'dimensions')}
              {renderSpecSection('Materials & Finish', spec.specifications.materials, spec.id, 'materials')}
              {renderSpecSection('Features & Care', spec.specifications.features, spec.id, 'features')}
              {renderSpecSection('Compliance & Standards', spec.specifications.compliance, spec.id, 'compliance')}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Specification Modal */}
      {selectedSpec && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-medium text-gray-900">{selectedSpec.productName}</h3>
                  <p className="text-gray-600">{selectedSpec.sku} - Complete Technical Specifications</p>
                </div>
                <button
                  onClick={() => setSelectedSpec(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Detailed Specifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">General Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      {Object.entries(selectedSpec.specifications.general).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className="text-sm text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Dimensions & Weight</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      {Object.entries(selectedSpec.specifications.dimensions).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className="text-sm text-gray-900">
                            {typeof value === 'number' ? `${value}${key.includes('weight') ? ' lbs' : '"'}` : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Materials & Finish</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      {Object.entries(selectedSpec.specifications.materials).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className="text-sm text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Features & Care</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Assembly Required</span>
                        <span className="text-sm text-gray-900">
                          {selectedSpec.specifications.features.assembly_required ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-700 mb-1">Care Instructions</span>
                        <p className="text-sm text-gray-900">{selectedSpec.specifications.features.care_instructions}</p>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-700 mb-1">Special Features</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedSpec.specifications.features.special_features.map((feature, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-700 mb-1">Color Options</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedSpec.specifications.features.color_options.map((color, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Compliance & Standards</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      {Object.entries(selectedSpec.specifications.compliance).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className="text-sm text-gray-900">
                            {Array.isArray(value) ? value.join(', ') : (typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Documentation</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="block text-sm font-medium text-gray-700 mb-2">Technical Drawings</span>
                        {selectedSpec.technical_drawings.map((drawing, index) => (
                          <a key={index} href={drawing} className="block text-sm text-blue-600 hover:text-blue-800">
                            Download Drawing {index + 1}
                          </a>
                        ))}
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-700 mb-1">Assembly Instructions</span>
                        <p className="text-sm text-gray-900">{selectedSpec.assembly_instructions}</p>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-700 mb-1">Care Guide</span>
                        <p className="text-sm text-gray-900">{selectedSpec.care_guide}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
                <button
                  onClick={() => setSelectedSpec(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Export PDF
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  Edit Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSpecifications;