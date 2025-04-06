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
  ArrowLeft,
  X,
  ArrowRight
} from 'lucide-react';
import logo from '../../assets/images/logo.png';
import whiteLogo from '../../assets/images/white_logo_with_text.png';

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
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'add-property', label: 'Add Property', icon: Plus },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
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
              className="mb-6 md:mb-8"
            >
              <h1 className="text-xl md:text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-sm md:text-base text-gray-600 mt-2">Here's what's happening with your properties</p>
            </motion.div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-2 md:p-3 bg-[#FFF5F0] rounded-lg">
                      <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-[#F3703A]" />
                    </div>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-xs md:text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Properties</h2>
                <button 
                  onClick={() => setActiveTab('properties')}
                  className="text-[#F3703A] hover:text-[#E35D2A] flex items-center text-sm"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-3 md:space-y-4">
                {recentProperties.map((property, index) => (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden mr-3 md:mr-4">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base truncate">{property.title}</h3>
                      <div className="flex items-center text-[#F3703A] font-semibold mb-2 text-sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {formatPrice(property.price)}
                      </div>
                      <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-600">
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
                    <div className="ml-2 md:ml-4">
                      <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
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

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('add-property')}
                className="flex items-center p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-[#FFF5F0] rounded-lg mr-4">
                  <Home className="w-6 h-6 text-[#F3703A]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">Add New Property</h3>
                  <p className="text-sm text-gray-600">List a new property for sale or rent</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('notifications')}
                className="flex items-center p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-[#FFF5F0] rounded-lg mr-4">
                  <Bell className="w-6 h-6 text-[#F3703A]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">View Notifications</h3>
                  <p className="text-sm text-gray-600">Check your recent notifications</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('settings')}
                className="flex items-center p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-[#FFF5F0] rounded-lg mr-4">
                  <Settings className="w-6 h-6 text-[#F3703A]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">Account Settings</h3>
                  <p className="text-sm text-gray-600">Manage your profile and preferences</p>
                </div>
              </motion.button>
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {editingProperty 
                    ? 'Update your property details below' 
                    : 'Fill in the details to list your property'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('properties')}
                className="flex items-center text-gray-600 hover:text-[#F3703A] transition-colors group w-fit"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Properties
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <form onSubmit={handleSaveProperty} className="space-y-8">
                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Property Title</label>
                        <input
                          type="text"
                          defaultValue={editingProperty?.title}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                          placeholder="Enter property title"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            defaultValue={editingProperty?.price}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                            placeholder="Enter price"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          defaultValue={editingProperty?.location}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                          placeholder="Enter location"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Property Type</label>
                        <select 
                          defaultValue={editingProperty?.type}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50 cursor-pointer"
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
                  </div>

                  {/* Description Section */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Property Description</label>
                      <textarea
                        defaultValue={editingProperty?.description}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                        rows="4"
                        placeholder="Enter detailed description of your property"
                      ></textarea>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {['Bedrooms', 'Bathrooms', 'Garage', 'Swimming Pool', 'Garden', 'Security', 'Parking', 'Furnished'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={feature.toLowerCase()}
                            className="w-4 h-4 text-[#F3703A] border-gray-300 rounded focus:ring-[#F3703A]"
                          />
                          <label htmlFor={feature.toLowerCase()} className="text-sm text-gray-700">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Images Section */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Images</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#F3703A] transition-colors aspect-square">
                        <div className="flex flex-col items-center justify-center h-full">
                          <Plus className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-gray-600">Add Image</p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="relative aspect-square">
                          <img
                            src={`https://source.unsplash.com/random/300x300?house,${i}`}
                            alt={`Property ${i}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#F3703A] text-white rounded-lg hover:bg-[#E35D2A] transition-colors flex items-center space-x-2"
                    >
                      <span>{editingProperty ? 'Save Changes' : 'Add Property'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
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
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1 p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-[#FFF5F0] text-[#F3703A]' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 w-72 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 bg-gradient-to-br from-[#F3703A] to-[#E35D2A]">
            <Link to="/" className="block">
              <img src={whiteLogo} alt="EZI Property" className="h-8" />
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
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 mb-1 group ${
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
              className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-white group-hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-72 pb-16 md:pb-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Mobile Logo */}
            <Link to="/" className="md:hidden">
              <img src={logo} alt="EZI Property" className="h-6" />
            </Link>

            {/* Search Bar */}
            <div className="flex items-center w-full md:w-96">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search properties, messages, or settings..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                />
              </div>
              <button className="ml-2 px-4 py-2.5 bg-[#F3703A] text-white rounded-lg hover:bg-[#E35D2A] transition-colors flex items-center justify-center shadow-sm hover:shadow-md">
                <Search className="w-5 h-5 md:hidden" />
                <span className="hidden md:block">Search</span>
              </button>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
            <button
                onClick={() => setActiveTab('notifications')}
                className={`p-2 text-gray-600 hover:text-[#F3703A] hover:bg-[#FFF5F0] rounded-full transition-colors relative ${
                  activeTab === 'notifications' ? 'text-[#F3703A] bg-[#FFF5F0]' : ''
                }`}
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F3703A] to-[#E35D2A] flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
