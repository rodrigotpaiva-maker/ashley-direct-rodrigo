import React, { useState } from 'react';
import { 
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

interface ChangePasswordProps {
  className?: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ className = '' }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const passwordRequirements = [
    { text: 'At least 8 characters long', met: false },
    { text: 'Contains uppercase letter', met: false },
    { text: 'Contains lowercase letter', met: false },
    { text: 'Contains number', met: false },
    { text: 'Contains special character', met: false }
  ];

  const recentSessions = [
    {
      id: 1,
      device: 'Windows Desktop',
      location: 'Atlanta, GA',
      timestamp: '2024-03-12 09:30:00',
      current: true,
      icon: ComputerDesktopIcon
    },
    {
      id: 2,
      device: 'iPhone 15 Pro',
      location: 'Atlanta, GA',
      timestamp: '2024-03-12 08:15:00',
      current: false,
      icon: DevicePhoneMobileIcon
    },
    {
      id: 3,
      device: 'MacBook Pro',
      location: 'Atlanta, GA',
      timestamp: '2024-03-11 17:45:00',
      current: false,
      icon: ComputerDesktopIcon
    }
  ];

  const securityHistory = [
    {
      id: 1,
      action: 'Password changed',
      timestamp: '2024-02-15 14:20:00',
      status: 'success'
    },
    {
      id: 2,
      action: 'Failed login attempt',
      timestamp: '2024-02-10 11:30:00',
      status: 'warning'
    },
    {
      id: 3,
      action: 'Account locked due to multiple failed attempts',
      timestamp: '2024-02-10 11:35:00',
      status: 'error'
    },
    {
      id: 4,
      action: 'Account unlocked by administrator',
      timestamp: '2024-02-10 12:00:00',
      status: 'info'
    }
  ];

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    const requirements = [
      /.{8,}/, // At least 8 characters
      /[A-Z]/, // Uppercase letter
      /[a-z]/, // Lowercase letter
      /\d/, // Number
      /[^A-Za-z0-9]/ // Special character
    ];

    requirements.forEach(req => {
      if (req.test(password)) strength++;
    });

    return strength;
  };

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, newPassword: value });
    const strength = evaluatePasswordStrength(value);
    setPasswordStrength(strength);
    
    // Update requirements
    passwordRequirements[0].met = value.length >= 8;
    passwordRequirements[1].met = /[A-Z]/.test(value);
    passwordRequirements[2].met = /[a-z]/.test(value);
    passwordRequirements[3].met = /\d/.test(value);
    passwordRequirements[4].met = /[^A-Za-z0-9]/.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = [];
    
    if (!formData.currentPassword) {
      errors.push('Current password is required');
    }
    
    if (passwordStrength < 4) {
      errors.push('New password does not meet strength requirements');
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      errors.push('New passwords do not match');
    }
    
    if (formData.currentPassword === formData.newPassword) {
      errors.push('New password must be different from current password');
    }
    
    setValidationErrors(errors);
    
    if (errors.length === 0) {
      // Submit password change
      console.log('Password change submitted');
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Very Weak';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <KeyIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
            <p className="text-gray-600 mt-1">Update your account security credentials</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Password Change Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Change Password Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Password</h3>
            
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircleIcon className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Please fix the following errors:</span>
                </div>
                <ul className="text-sm text-red-700 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? (
                      <EyeSlashIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Password Strength:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength <= 2 ? 'text-red-600' :
                        passwordStrength <= 3 ? 'text-yellow-600' :
                        passwordStrength <= 4 ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {formData.newPassword && formData.confirmPassword && (
                  <div className="mt-1 flex items-center space-x-1">
                    {formData.newPassword === formData.confirmPassword ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-600">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="w-4 h-4 text-red-600" />
                        <span className="text-xs text-red-600">Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
            <div className="space-y-3">
              {recentSessions.map((session) => {
                const IconComponent = session.icon;
                return (
                  <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.device}</p>
                        <p className="text-sm text-gray-600">{session.location}</p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <ClockIcon className="w-3 h-3" />
                          <span>{session.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.current ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Current Session
                        </span>
                      ) : (
                        <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                          Terminate
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Password Requirements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Requirements</h3>
            <div className="space-y-2">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {req.met ? (
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircleIcon className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={`text-sm ${
                    req.met ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <div className="flex items-center space-x-2 mb-3">
              <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Security Tips</h3>
            </div>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Use a unique password for your Ashley Direct account</li>
              <li>• Consider using a password manager</li>
              <li>• Never share your password with others</li>
              <li>• Log out when using shared computers</li>
              <li>• Change your password if you suspect it's compromised</li>
            </ul>
          </div>

          {/* Security History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security History</h3>
            <div className="space-y-3">
              {securityHistory.map((event) => (
                <div key={event.id} className="flex items-start space-x-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    event.status === 'success' ? 'bg-green-500' :
                    event.status === 'warning' ? 'bg-yellow-500' :
                    event.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.action}</p>
                    <p className="text-xs text-gray-500">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;