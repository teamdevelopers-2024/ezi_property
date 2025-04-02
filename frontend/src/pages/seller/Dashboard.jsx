import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  Building2,
  Settings,
  LogOut,
  Plus,
  MessageSquare,
  Bell,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  ChevronRight,
  ArrowUpRight,
  Star,
  Search,
  Users,
  ArrowLeft
} from 'lucide-react';

const SellerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProperty, setEditingProperty] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const menuItems = [
    { id: 'overview', icon: Home, label: 'Overview', path: '/seller/dashboard' },
    { id: 'properties', icon: Building2, label: 'My Properties', path: '/seller/properties' },
    { id: 'add-property', icon: Plus, label: 'Add Property', path: '/seller/properties/add' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', path: '/seller/messages' },
    { id: 'notifications', icon: Bell, label: 'Notifications', path: '/seller/notifications' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/seller/settings' },
  ];

  const statsData = [
    { label: 'Total Properties', value: '12', change: '+12%', icon: Building2 },
    { label: 'Active Listings', value: '8', change: '+8%', icon: TrendingUp },
    { label: 'Total Views', value: '2,456', change: '+24%', icon: BarChart3 },
    { label: 'Total Inquiries', value: '45', change: '+18%', icon: MessageSquare }
  ];

  const recentProperties = [
    {
      _id: '1',
      title: 'Luxury Villa in Prime Location',
      price: 2500000,
      status: 'active',
      views: 156,
      inquiries: 8,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: '2',
      title: 'Modern Apartment in City Center',
      price: 1200000,
      status: 'pending',
      views: 98,
      inquiries: 5,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: '3',
      title: 'Commercial Space in Business District',
      price: 3500000,
      status: 'active',
      views: 234,
      inquiries: 12,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setActiveTab('add-property');
  };

  const handleSaveProperty = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the property
    setEditingProperty(null);
    setActiveTab('properties');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-2">Here's what's happening with your properties</p>
            </motion.div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#FFF5F0] rounded-lg">
                      <stat.icon className="w-6 h-6 text-[#F3703A]" />
                    </div>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Properties</h2>
                <button 
                  onClick={() => setActiveTab('properties')}
                  className="text-[#F3703A] hover:text-[#E35D2A] flex items-center"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {recentProperties.map((property, index) => (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{property.title}</h3>
                      <div className="flex items-center text-[#F3703A] font-semibold mb-2">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {formatPrice(property.price)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          {property.views} views
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {property.inquiries} inquiries
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.status === 'active' ? 'bg-green-100 text-green-800' :
                        property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        );
      case 'properties':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
              <button
                onClick={() => {
                  setEditingProperty(null);
                  setActiveTab('add-property');
                }}
                className="px-4 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E35D2A] transition-colors flex items-center cursor-pointer"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Property
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProperties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <div className="flex items-center text-[#F3703A] font-bold mb-2">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {formatPrice(property.price)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        {property.views} views
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {property.inquiries} inquiries
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.status === 'active' ? 'bg-green-100 text-green-800' :
                        property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                      <button 
                        onClick={() => handleEditProperty(property)}
                        className="text-[#F3703A] hover:text-[#E35D2A] cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 'add-property':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h1>
              <button
                onClick={() => setActiveTab('properties')}
                className="flex items-center text-gray-600 hover:text-[#F3703A] transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Properties
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <form onSubmit={handleSaveProperty} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                    <input
                      type="text"
                      defaultValue={editingProperty?.title}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                      placeholder="Enter property title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                      type="number"
                      defaultValue={editingProperty?.price}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      defaultValue={editingProperty?.location}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select 
                      defaultValue={editingProperty?.type}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent cursor-pointer"
                    >
                      <option value="">Select property type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="land">Land</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    defaultValue={editingProperty?.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                    rows="4"
                    placeholder="Enter property description"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#F3703A] transition-colors">
                    <div className="flex flex-col items-center">
                      <Plus className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E35D2A] transition-colors cursor-pointer"
                  >
                    {editingProperty ? 'Save Changes' : 'Add Property'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-600">No messages yet</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-600">No notifications yet</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-600">Settings content will be here</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ 
          type: "spring", 
          stiffness: 100,
          damping: 20,
          mass: 0.5
        }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 bg-gradient-to-br from-[#F3703A] to-[#E35D2A]">
            <Link to="/" className="text-2xl font-bold text-white cursor-pointer">
              EZI Property
            </Link>
            <p className="text-white/80 mt-2 text-sm">Seller Dashboard</p>
          </div>

          {/* User Info */}
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F3703A] to-[#E35D2A] flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 mb-1 group cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-[#FFF5F0] text-[#F3703A] shadow-sm' 
                    : 'hover:bg-[#FFF5F0] text-gray-700 hover:text-[#F3703A]'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-[#F3703A] text-white' 
                    : 'bg-white group-hover:bg-[#FFF5F0]'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-6">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-white group-hover:bg-red-50 transition-colors">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-[#F3703A] hover:bg-[#FFF5F0] rounded-full transition-colors cursor-pointer">
                <Bell className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
