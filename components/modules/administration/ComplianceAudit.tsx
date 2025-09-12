import React, { useState } from 'react';
import { DocumentCheckIcon, ExclamationTriangleIcon, ClockIcon, UserIcon, EyeIcon, MagnifyingGlassIcon, FunnelIcon, DocumentArrowDownIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  result: 'success' | 'failed' | 'warning';
}

interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'warning' | 'pending';
  lastCheck: string;
  nextCheck: string;
  category: 'data' | 'security' | 'access' | 'financial';
  details: string;
  actions?: string[];
}

interface ComplianceReport {
  id: string;
  name: string;
  type: 'gdpr' | 'sox' | 'hipaa' | 'pci' | 'internal';
  generatedDate: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  findings: number;
  criticalIssues: number;
  downloadUrl: string;
}

const ComplianceAudit: React.FC = () => {
  const [activeTab, setActiveTab] = useState('audit-logs');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterResult, setFilterResult] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Sample audit logs
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2025-09-12T14:30:45',
      user: 'John Smith',
      action: 'User Login',
      resource: 'Authentication System',
      details: 'Successful login from admin panel',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      result: 'success'
    },
    {
      id: '2',
      timestamp: '2025-09-12T14:25:12',
      user: 'Sarah Johnson',
      action: 'Order Modification',
      resource: 'Order #ORD-2025-1234',
      details: 'Modified order delivery address',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      result: 'success'
    },
    {
      id: '3',
      timestamp: '2025-09-12T14:20:33',
      user: 'Anonymous',
      action: 'Failed Login Attempt',
      resource: 'Authentication System',
      details: 'Multiple failed login attempts detected',
      ipAddress: '203.124.45.67',
      userAgent: 'curl/7.68.0',
      result: 'failed'
    },
    {
      id: '4',
      timestamp: '2025-09-12T14:15:20',
      user: 'Mike Chen',
      action: 'Data Export',
      resource: 'Customer Database',
      details: 'Exported customer contact list (500 records)',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      result: 'warning'
    },
    {
      id: '5',
      timestamp: '2025-09-12T14:10:15',
      user: 'Lisa Wang',
      action: 'Financial Report Access',
      resource: 'Financial Dashboard',
      details: 'Accessed Q3 financial reports',
      ipAddress: '192.168.1.115',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      result: 'success'
    },
    {
      id: '6',
      timestamp: '2025-09-12T14:05:08',
      user: 'David Brown',
      action: 'User Account Creation',
      resource: 'User Management',
      details: 'Created new user account for Emma Davis',
      ipAddress: '192.168.1.120',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      result: 'success'
    }
  ];

  // Sample compliance checks
  const complianceChecks: ComplianceCheck[] = [
    {
      id: '1',
      name: 'Data Encryption Standards',
      description: 'Verify all sensitive data is encrypted at rest and in transit',
      status: 'compliant',
      lastCheck: '2025-09-10',
      nextCheck: '2025-10-10',
      category: 'security',
      details: 'All data encryption requirements met. TLS 1.3 implemented.',
      actions: ['Maintain current encryption standards', 'Monitor certificate expiry']
    },
    {
      id: '2',
      name: 'User Access Reviews',
      description: 'Regular review of user access permissions and privileges',
      status: 'warning',
      lastCheck: '2025-09-01',
      nextCheck: '2025-09-15',
      category: 'access',
      details: '12 users have not logged in for 90+ days. Access review required.',
      actions: ['Review inactive user accounts', 'Update access permissions', 'Disable unused accounts']
    },
    {
      id: '3',
      name: 'Data Retention Policy',
      description: 'Compliance with data retention and deletion policies',
      status: 'compliant',
      lastCheck: '2025-09-08',
      nextCheck: '2025-10-08',
      category: 'data',
      details: 'All data retention policies are being followed correctly.',
      actions: ['Continue scheduled data purging', 'Update retention schedules']
    },
    {
      id: '4',
      name: 'Financial Controls',
      description: 'SOX compliance for financial reporting and controls',
      status: 'non-compliant',
      lastCheck: '2025-09-05',
      nextCheck: '2025-09-12',
      category: 'financial',
      details: 'Missing segregation of duties in invoice approval process.',
      actions: ['Implement dual approval workflow', 'Update financial procedures', 'Train finance team']
    },
    {
      id: '5',
      name: 'Backup and Recovery',
      description: 'Ensure backup systems meet recovery requirements',
      status: 'warning',
      lastCheck: '2025-09-11',
      nextCheck: '2025-09-18',
      category: 'data',
      details: 'Recent backup test showed longer than expected recovery time.',
      actions: ['Optimize backup procedures', 'Test recovery scenarios', 'Upgrade backup infrastructure']
    }
  ];

  // Sample compliance reports
  const complianceReports: ComplianceReport[] = [
    {
      id: '1',
      name: 'Q3 2025 SOX Compliance Report',
      type: 'sox',
      generatedDate: '2025-09-10',
      status: 'completed',
      findings: 3,
      criticalIssues: 1,
      downloadUrl: '/reports/sox-q3-2025.pdf'
    },
    {
      id: '2',
      name: 'GDPR Data Processing Audit',
      type: 'gdpr',
      generatedDate: '2025-09-08',
      status: 'completed',
      findings: 5,
      criticalIssues: 0,
      downloadUrl: '/reports/gdpr-audit-2025.pdf'
    },
    {
      id: '3',
      name: 'Internal Security Assessment',
      type: 'internal',
      generatedDate: '2025-09-12',
      status: 'in-progress',
      findings: 0,
      criticalIssues: 0,
      downloadUrl: ''
    },
    {
      id: '4',
      name: 'PCI DSS Compliance Review',
      type: 'pci',
      generatedDate: '2025-09-15',
      status: 'scheduled',
      findings: 0,
      criticalIssues: 0,
      downloadUrl: ''
    }
  ];

  const getResultColor = (result: string) => {
    switch (result) {
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'non-compliant':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'pending':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'in-progress':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'scheduled':
        return 'text-gray-700 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = filterAction === 'all' || log.action.toLowerCase().includes(filterAction.toLowerCase());
    const matchesResult = filterResult === 'all' || log.result === filterResult;
    
    return matchesSearch && matchesAction && matchesResult;
  });

  const exportAuditLog = () => {
    alert('Audit log exported successfully! The file will be downloaded shortly.');
  };

  const generateComplianceReport = (type: string) => {
    alert(`Generating ${type.toUpperCase()} compliance report. You will be notified when it's ready.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance & Audit</h1>
          <p className="text-gray-600">Monitor compliance status and audit system activities</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('audit-logs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'audit-logs'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Audit Logs
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'compliance'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Compliance
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'reports'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {activeTab === 'audit-logs' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search audit logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Actions</option>
                  <option value="login">Login</option>
                  <option value="modification">Modification</option>
                  <option value="export">Data Export</option>
                  <option value="access">Access</option>
                  <option value="creation">Creation</option>
                </select>
                <select
                  value={filterResult}
                  onChange={(e) => setFilterResult(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Results</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="warning">Warning</option>
                </select>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
                <button
                  onClick={exportAuditLog}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <DocumentArrowDownIcon className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Audit Logs ({filteredLogs.length})</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200" onClick={() => setSelectedLog(log)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{log.user}</span>
                        <span className="text-gray-600">{log.action}</span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getResultColor(log.result)}`}>
                          {log.result.charAt(0).toUpperCase() + log.result.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                        <div>Resource: {log.resource}</div>
                        <div>IP: {log.ipAddress}</div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Checks', count: complianceChecks.length, color: 'text-blue-600' },
              { label: 'Compliant', count: complianceChecks.filter(c => c.status === 'compliant').length, color: 'text-green-600' },
              { label: 'Non-Compliant', count: complianceChecks.filter(c => c.status === 'non-compliant').length, color: 'text-red-600' },
              { label: 'Warnings', count: complianceChecks.filter(c => c.status === 'warning').length, color: 'text-yellow-600' }
            ].map((stat, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
                  </div>
                  <DocumentCheckIcon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Checks */}
          <div className="space-y-4">
            {complianceChecks.map((check) => (
              <div key={check.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{check.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getComplianceStatusColor(check.status)}`}>
                        {check.status.charAt(0).toUpperCase() + check.status.replace('-', ' ').slice(1)}
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {check.category.charAt(0).toUpperCase() + check.category.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{check.description}</p>
                    <p className="text-sm text-gray-700 mb-3">{check.details}</p>
                    
                    {check.actions && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {check.actions.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        Last check: {check.lastCheck}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        Next check: {check.nextCheck}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <button
                      onClick={() => alert('Running compliance check...')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Run Check
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Compliance Reports</h2>
            <div className="flex gap-2">
              <button
                onClick={() => generateComplianceReport('gdpr')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Generate GDPR Report
              </button>
              <button
                onClick={() => generateComplianceReport('sox')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Generate SOX Report
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceReports.map((report) => (
              <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {report.type.toUpperCase()}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getReportStatusColor(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.replace('-', ' ').slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Generated:</span>
                    <span className="text-gray-900">{report.generatedDate}</span>
                  </div>
                  {report.status === 'completed' && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Findings:</span>
                        <span className="text-gray-900">{report.findings}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Critical Issues:</span>
                        <span className={report.criticalIssues > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                          {report.criticalIssues}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                
                {report.status === 'completed' && report.downloadUrl && (
                  <button
                    onClick={() => alert('Downloading report...')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <DocumentArrowDownIcon className="h-4 w-4" />
                    Download Report
                  </button>
                )}
                
                {report.status === 'in-progress' && (
                  <div className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm text-center">
                    Report in progress...
                  </div>
                )}
                
                {report.status === 'scheduled' && (
                  <div className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm text-center">
                    Scheduled for generation
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Audit Log Details</h2>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">User</p>
                  <p className="font-medium text-gray-900">{selectedLog.user}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Action</p>
                  <p className="font-medium text-gray-900">{selectedLog.action}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resource</p>
                  <p className="font-medium text-gray-900">{selectedLog.resource}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Result</p>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getResultColor(selectedLog.result)}`}>
                    {selectedLog.result.charAt(0).toUpperCase() + selectedLog.result.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Timestamp</p>
                  <p className="font-medium text-gray-900">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">IP Address</p>
                  <p className="font-medium text-gray-900">{selectedLog.ipAddress}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Details</p>
                <p className="text-gray-900">{selectedLog.details}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">User Agent</p>
                <p className="text-gray-900 text-sm break-all">{selectedLog.userAgent}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setSelectedLog(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
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

export default ComplianceAudit;