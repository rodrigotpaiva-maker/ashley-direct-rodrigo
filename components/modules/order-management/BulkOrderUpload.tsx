import React from 'react'

export function BulkOrderUpload() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Bulk Order Upload</h2>
      <p className="text-gray-600 mb-4">Upload CSV files to create multiple orders at once.</p>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="text-gray-500 mb-2">Drag and drop your CSV file here, or</div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Choose File
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Supported format: CSV with columns: SKU, Quantity, Price</p>
        <a href="#" className="text-blue-600 hover:underline">Download sample template</a>
      </div>
    </div>
  )
}