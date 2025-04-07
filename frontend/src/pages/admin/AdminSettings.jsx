import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings2, 
  Bell, 
  Mail, 
  Shield, 
  CreditCard,
  Globe,
  Save,
  AlertCircle
} from 'lucide-react';

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'EziProperty',
      siteDescription: 'Your trusted real estate platform',
      contactEmail: 'support@eziproperty.com',
      contactPhone: '+1 (555) 123-4567',
      address: '123 Business Street, Suite 100, New York, NY 10001',
      timezone: 'America/New_York',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY'
    },
    notifications: {
      emailNotifications: true,
      propertyApprovals: true,
      newUsers: true,
      systemUpdates: true,
      marketingEmails: false,
      dailyReports: true,
      weeklyReports: true,
      monthlyReports: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      failedLoginAttempts: 5,
      ipWhitelist: ['192.168.1.1', '10.0.0.1'],
      sslEnabled: true,
      backupFrequency: 'daily'
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: true,
      commissionRate: 5,
      minimumPayout: 100,
      payoutSchedule: 'weekly',
      currencyConversion: true,
      taxRate: 8.5
    },
    integrations: {
      googleAnalytics: true,
      googleMaps: true,
      facebookPixel: true,
      mailchimp: true,
      slack: false,
      zapier: false
    }
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
            <p className="text-gray-600 mt-1">Configure platform settings and preferences</p>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-4 sm:mt-0 px-4 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Settings2 className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Site Name</label>
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, siteName: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F3703A] focus:ring-[#F3703A] sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input
                  type="email"
                  value={settings.general.contactEmail}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, contactEmail: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F3703A] focus:ring-[#F3703A] sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Timezone</label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, timezone: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F3703A] focus:ring-[#F3703A] sm:text-sm"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, [key]: e.target.checked }
                    })}
                    className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F3703A] focus:ring-[#F3703A] sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password Expiry (days)</label>
                <input
                  type="number"
                  value={settings.security.passwordExpiry}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F3703A] focus:ring-[#F3703A] sm:text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorAuth: e.target.checked }
                  })}
                  className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication</label>
              </div>
            </div>
          </motion.div>

          {/* Payment Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Payment Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                <input
                  type="number"
                  value={settings.payment.commissionRate}
                  onChange={(e) => setSettings({
                    ...settings,
                    payment: { ...settings.payment, commissionRate: parseFloat(e.target.value) }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F3703A] focus:ring-[#F3703A] sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Payout ($)</label>
                <input
                  type="number"
                  value={settings.payment.minimumPayout}
                  onChange={(e) => setSettings({
                    ...settings,
                    payment: { ...settings.payment, minimumPayout: parseFloat(e.target.value) }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F3703A] focus:ring-[#F3703A] sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                <input
                  type="number"
                  value={settings.payment.taxRate}
                  onChange={(e) => setSettings({
                    ...settings,
                    payment: { ...settings.payment, taxRate: parseFloat(e.target.value) }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F3703A] focus:ring-[#F3703A] sm:text-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* Integration Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Integration Settings</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.integrations).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      integrations: { ...settings.integrations, [key]: e.target.checked }
                    })}
                    className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 