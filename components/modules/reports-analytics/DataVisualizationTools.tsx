import React, { useState } from 'react';
import { ChartBarIcon, ChartPieIcon, PresentationChartLineIcon, TableCellsIcon, ArrowsPointingOutIcon, ArrowDownTrayIcon, EyeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface ChartData {
  name: string;
  value: number;
  category?: string;
}

interface ChartConfig {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'pie' | 'table';
  data: ChartData[];
  settings: {
    showLegend: boolean;
    showGrid: boolean;
    color: string;
    height: number;
  };
}

const DataVisualizationTools: React.FC = () => {
  const [activeChart, setActiveChart] = useState('sales-by-month');
  const [viewMode, setViewMode] = useState<'preview' | 'fullscreen'>('preview');
  const [showSettings, setShowSettings] = useState(false);

  // Sample chart configurations
  const chartConfigs: Record<string, ChartConfig> = {
    'sales-by-month': {
      id: 'sales-by-month',
      title: 'Monthly Sales Performance',
      type: 'bar',
      data: [
        { name: 'Jan', value: 245000 },
        { name: 'Feb', value: 287000 },
        { name: 'Mar', value: 312000 },
        { name: 'Apr', value: 298000 },
        { name: 'May', value: 356000 },
        { name: 'Jun', value: 389000 },
        { name: 'Jul', value: 434000 },
        { name: 'Aug', value: 398000 }
      ],
      settings: {
        showLegend: true,
        showGrid: true,
        color: '#3b82f6',
        height: 300
      }
    },
    'revenue-by-category': {
      id: 'revenue-by-category',
      title: 'Revenue by Product Category',
      type: 'pie',
      data: [
        { name: 'Living Room', value: 1250000, category: 'Furniture' },
        { name: 'Bedroom', value: 987000, category: 'Furniture' },
        { name: 'Dining Room', value: 876000, category: 'Furniture' },
        { name: 'Office', value: 654000, category: 'Furniture' },
        { name: 'Outdoor', value: 432000, category: 'Furniture' },
        { name: 'Accessories', value: 298000, category: 'Decor' }
      ],
      settings: {
        showLegend: true,
        showGrid: false,
        color: '#10b981',
        height: 300
      }
    },
    'customer-growth': {
      id: 'customer-growth',
      title: 'Customer Acquisition Trend',
      type: 'line',
      data: [
        { name: 'Q1 2024', value: 1250 },
        { name: 'Q2 2024', value: 1487 },
        { name: 'Q3 2024', value: 1672 },
        { name: 'Q4 2024', value: 1923 },
        { name: 'Q1 2025', value: 2156 },
        { name: 'Q2 2025', value: 2398 }
      ],
      settings: {
        showLegend: false,
        showGrid: true,
        color: '#8b5cf6',
        height: 250
      }
    },
    'top-products-table': {
      id: 'top-products-table',
      title: 'Top 10 Products by Revenue',
      type: 'table',
      data: [
        { name: 'Ashley Signature Design Sofa Set', value: 127540, category: 'Living Room' },
        { name: 'North Shore Dining Collection', value: 98320, category: 'Dining Room' },
        { name: 'Millennium Bedroom Suite', value: 87650, category: 'Bedroom' },
        { name: 'Bolanburg Counter Height Table', value: 76890, category: 'Dining Room' },
        { name: 'Trinell TV Stand Collection', value: 65440, category: 'Living Room' },
        { name: 'Realyn Office Desk Set', value: 54320, category: 'Office' },
        { name: 'Lettner Light Gray Bedroom Set', value: 48760, category: 'Bedroom' },
        { name: 'Whitesburg Dining Room Table', value: 43210, category: 'Dining Room' },
        { name: 'Willowton Two-tone Bedroom Set', value: 39870, category: 'Bedroom' },
        { name: 'Valebeck Brown Home Office Set', value: 36540, category: 'Office' }
      ],
      settings: {
        showLegend: false,
        showGrid: true,
        color: '#ef4444',
        height: 400
      }
    }
  };

  const currentChart = chartConfigs[activeChart];
  const maxValue = Math.max(...currentChart.data.map(d => d.value));

  const renderBarChart = (config: ChartConfig) => {
    return (
      <div className="space-y-4">
        <div className="h-64 flex items-end justify-between gap-2">
          {config.data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  backgroundColor: config.settings.color,
                  height: `${(item.value / maxValue) * 200}px`,
                  minHeight: '10px'
                }}
                title={`${item.name}: $${item.value.toLocaleString()}`}
              />
              <div className="text-xs text-gray-600 mt-2 text-center">
                {item.name}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 text-center">
          Revenue in USD
        </div>
      </div>
    );
  };

  const renderPieChart = (config: ChartConfig) => {
    const total = config.data.reduce((sum, item) => sum + item.value, 0);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    
    return (
      <div className="flex items-center justify-center space-x-8">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {config.data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage * 2.51} 251`;
              const strokeDashoffset = -index * 2.51 * (config.data.slice(0, index).reduce((sum, prev) => sum + prev.value, 0) / total);
              
              return (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r="40"
                  fill="transparent"
                  stroke={colors[index % colors.length]}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="hover:stroke-opacity-80 transition-opacity duration-200 cursor-pointer"
                  title={`${item.name}: $${item.value.toLocaleString()} (${percentage.toFixed(1)}%)`}
                />
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          {config.data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            return (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-gray-600">
                    ${item.value.toLocaleString()} ({percentage.toFixed(1)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLineChart = (config: ChartConfig) => {
    const points = config.data.map((item, index) => {
      const x = (index / (config.data.length - 1)) * 300;
      const y = 150 - ((item.value / maxValue) * 120);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="space-y-4">
        <div className="relative h-40">
          <svg viewBox="0 0 300 150" className="w-full h-full">
            {config.settings.showGrid && (
              <defs>
                <pattern id="grid" width="30" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 15" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
            )}
            {config.settings.showGrid && (
              <rect width="100%" height="100%" fill="url(#grid)" />
            )}
            <polyline
              fill="none"
              stroke={config.settings.color}
              strokeWidth="3"
              points={points}
              className="hover:stroke-opacity-80 transition-opacity duration-200"
            />
            {config.data.map((item, index) => {
              const x = (index / (config.data.length - 1)) * 300;
              const y = 150 - ((item.value / maxValue) * 120);
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={config.settings.color}
                  className="hover:r-6 transition-all duration-200 cursor-pointer"
                  title={`${item.name}: ${item.value.toLocaleString()}`}
                />
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          {config.data.map(item => (
            <span key={item.name}>{item.name}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderTable = (config: ChartConfig) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Product Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {config.data.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 text-gray-900">{item.name}</td>
                <td className="py-3 px-4 text-gray-600">{item.category}</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">
                  ${item.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderChart = (config: ChartConfig) => {
    switch (config.type) {
      case 'bar':
        return renderBarChart(config);
      case 'pie':
        return renderPieChart(config);
      case 'line':
        return renderLineChart(config);
      case 'table':
        return renderTable(config);
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  const exportChart = () => {
    // In a real app, this would export the chart as PNG/PDF
    alert('Chart exported successfully! In a real application, this would download the chart as an image or PDF.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Visualization Tools</h1>
          <p className="text-gray-600">Interactive charts and visual analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <Cog6ToothIcon className="h-4 w-4" />
            Settings
          </button>
          <button
            onClick={exportChart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Selection Sidebar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Charts</h2>
          <div className="space-y-2">
            {Object.values(chartConfigs).map((config) => {
              const Icon = config.type === 'bar' ? ChartBarIcon :
                          config.type === 'pie' ? ChartPieIcon :
                          config.type === 'line' ? PresentationChartLineIcon :
                          TableCellsIcon;
              
              return (
                <button
                  key={config.id}
                  onClick={() => setActiveChart(config.id)}
                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 flex items-center gap-3 ${
                    activeChart === config.id
                      ? 'bg-blue-50 border border-blue-200 text-blue-900'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium text-sm">{config.title}</div>
                    <div className="text-xs text-gray-500 capitalize">{config.type} chart</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Chart Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{currentChart.title}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode(viewMode === 'preview' ? 'fullscreen' : 'preview')}
                    className="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors duration-200"
                    title={viewMode === 'preview' ? 'Fullscreen' : 'Exit Fullscreen'}
                  >
                    {viewMode === 'preview' ? (
                      <ArrowsPointingOutIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Chart Content */}
            <div className={`p-6 ${viewMode === 'fullscreen' ? 'min-h-96' : ''}`}>
              {renderChart(currentChart)}
            </div>
          </div>

          {/* Chart Settings Panel */}
          {showSettings && (
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chart Color</label>
                  <input
                    type="color"
                    value={currentChart.settings.color}
                    className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                    onChange={(e) => {
                      // In a real app, this would update the chart configuration
                      console.log('Color changed to:', e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chart Height</label>
                  <input
                    type="range"
                    min="200"
                    max="500"
                    value={currentChart.settings.height}
                    className="w-full"
                    onChange={(e) => {
                      // In a real app, this would update the chart configuration
                      console.log('Height changed to:', e.target.value);
                    }}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {currentChart.settings.height}px
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showGrid"
                    checked={currentChart.settings.showGrid}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      // In a real app, this would update the chart configuration
                      console.log('Show grid changed to:', e.target.checked);
                    }}
                  />
                  <label htmlFor="showGrid" className="text-sm font-medium text-gray-700">
                    Show Grid
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showLegend"
                    checked={currentChart.settings.showLegend}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      // In a real app, this would update the chart configuration
                      console.log('Show legend changed to:', e.target.checked);
                    }}
                  />
                  <label htmlFor="showLegend" className="text-sm font-medium text-gray-700">
                    Show Legend
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationTools;