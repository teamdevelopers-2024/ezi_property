import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Building2, Mail, Bell, CreditCard, Shield } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'EZI Property',
    siteDescription: 'Your trusted property listing platform',
    contactEmail: 'support@eziproperty.com',
    contactPhone: '+91 1234567890',
    address: '123 Property Street, City, Country',
    commissionRate: 5,
    minimumPropertyPrice: 100000,
    maximumPropertyPrice: 100000000,
    propertyVerificationRequired: true,
    emailNotifications: true,
    smsNotifications: true,
    maintenanceMode: false,
    allowNewRegistrations: true,
    maxPropertiesPerSeller: 50,
    maxImagesPerProperty: 10,
    maxPropertyDescriptionLength: 1000,
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    language: 'en',
    theme: 'light',
    security: {
      requireEmailVerification: true,
      requirePhoneVerification: true,
      maxLoginAttempts: 5,
      sessionTimeout: 30,
      passwordMinLength: 8,
      requireStrongPassword: true
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/admin/settings');
      setSettings(response.data);
    } catch (error) {
      showToast('Failed to fetch settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/admin/settings', settings);
      showToast('Settings updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3703A]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors duration-300 disabled:opacity-50"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          Save Changes
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <input
                type="text"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Property Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission Rate (%)
              </label>
              <input
                type="number"
                name="commissionRate"
                value={settings.commissionRate}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Property Price
              </label>
              <input
                type="number"
                name="minimumPropertyPrice"
                value={settings.minimumPropertyPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Property Price
              </label>
              <input
                type="number"
                name="maximumPropertyPrice"
                value={settings.maximumPropertyPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Properties Per Seller
              </label>
              <input
                type="number"
                name="maxPropertiesPerSeller"
                value={settings.maxPropertiesPerSeller}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Images Per Property
              </label>
              <input
                type="number"
                name="maxImagesPerProperty"
                value={settings.maxImagesPerProperty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Description Length
              </label>
              <input
                type="number"
                name="maxPropertyDescriptionLength"
                value={settings.maxPropertyDescriptionLength}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="requireEmailVerification"
                checked={settings.security.requireEmailVerification}
                onChange={handleSecurityChange}
                className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require Email Verification
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="requirePhoneVerification"
                checked={settings.security.requirePhoneVerification}
                onChange={handleSecurityChange}
                className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require Phone Verification
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                name="maxLoginAttempts"
                value={settings.security.maxLoginAttempts}
                onChange={handleSecurityChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                name="sessionTimeout"
                value={settings.security.sessionTimeout}
                onChange={handleSecurityChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Password Length
              </label>
              <input
                type="number"
                name="passwordMinLength"
                value={settings.security.passwordMinLength}
                onChange={handleSecurityChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="requireStrongPassword"
                checked={settings.security.requireStrongPassword}
                onChange={handleSecurityChange}
                className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require Strong Password
              </label>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Maintenance Mode
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="allowNewRegistrations"
                checked={settings.allowNewRegistrations}
                onChange={handleChange}
                className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Allow New Registrations
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              >
                <option value="Asia/Kolkata">India (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="Europe/London">London</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Format
              </label>
              <select
                name="dateFormat"
                value={settings.dateFormat}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ta">Tamil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings; 