import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
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
  ArrowRight,
  Edit,
  MapPin,
  Bed,
  Bath,
  Trash2
} from 'lucide-react';
import logo from '../../assets/images/logo.png';
import whiteLogo from '../../assets/images/white_logo_with_text.png';
import { toast, Toaster } from 'react-hot-toast';

const SellerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProperty, setEditingProperty] = useState(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0
  });
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProperties, setAllProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    propertyType: '',
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    features: [],
    images: [],
    location: {
      state: '',
      city: '',
      address: ''
    }
  });
  const [uploadingImages, setUploadingImages] = useState(false);
  const [showDummyProducts, setShowDummyProducts] = useState(false);
  const [showDummyData, setShowDummyData] = useState(false);
  const [dummyStats, setDummyStats] = useState({
    totalProperties: 12,
    activeListings: 8,
    totalViews: 2450,
    totalInquiries: 45
  });
  const [dummyProperties, setDummyProperties] = useState([
    {
      _id: '1',
      title: 'Luxury Villa in Mumbai',
      price: 25000000,
      propertyType: 'villa',
      description: 'A beautiful luxury villa with modern amenities',
      bedrooms: 4,
      bathrooms: 3,
      features: ['swimming_pool', 'garden', 'security', 'parking'],
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
      location: {
        state: 'Maharashtra',
        city: 'Mumbai',
        address: '123 Luxury Lane'
      },
      status: 'approved',
      views: 150,
      inquiries: 12
    },
    {
      _id: '2',
      title: 'Modern Apartment in Pune',
      price: 8500000,
      propertyType: 'apartment',
      description: 'Spacious apartment in prime location',
      bedrooms: 3,
      bathrooms: 2,
      features: ['parking', 'security', 'furnished'],
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
      location: {
        state: 'Maharashtra',
        city: 'Pune',
        address: '456 Modern Street'
      },
      status: 'pending',
      views: 85,
      inquiries: 8
    },
    {
      _id: '3',
      title: 'Commercial Space in Delhi',
      price: 15000000,
      propertyType: 'commercial',
      description: 'Prime commercial space for business',
      bedrooms: 0,
      bathrooms: 2,
      features: ['parking', 'security'],
      images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
      location: {
        state: 'Delhi',
        city: 'New Delhi',
        address: '789 Business Avenue'
      },
      status: 'approved',
      views: 200,
      inquiries: 15
    }
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch seller's properties using the correct endpoint
      const propertiesResponse = await api.get(`/users/${user._id}/properties`);
      const properties = propertiesResponse.data;

      // Set all properties
      setAllProperties(properties);

      // Calculate stats
      const totalProperties = properties.length;
      const activeListings = properties.filter(p => p.status === 'approved').length;
      const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
      const totalInquiries = properties.reduce((sum, p) => sum + (p.inquiries || 0), 0);

      setStats({
        totalProperties,
        activeListings,
        totalViews,
        totalInquiries
      });

      // Get recent properties (last 3)
      const recent = properties
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      
      setRecentProperties(recent);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard data. Please try again.';
      toast.error(errorMessage);
      
      // Reset states to prevent showing stale data
      setAllProperties([]);
      setRecentProperties([]);
      setStats({
        totalProperties: 0,
        activeListings: 0,
        totalViews: 0,
        totalInquiries: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/seller/login');
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
    { 
      label: 'Total Properties', 
      value: stats.totalProperties.toString(), 
      change: '+12%', 
      icon: Building2 
    },
    { 
      label: 'Active Listings', 
      value: stats.activeListings.toString(), 
      change: '+8%', 
      icon: TrendingUp 
    },
    { 
      label: 'Total Views', 
      value: stats.totalViews.toLocaleString(), 
      change: '+24%', 
      icon: BarChart3 
    },
    { 
      label: 'Total Inquiries', 
      value: stats.totalInquiries.toString(), 
      change: '+18%', 
      icon: MessageSquare 
    }
  ];

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setActiveTab('add-property');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        features: checked 
          ? [...prev.features, name]
          : prev.features.filter(f => f !== name)
      }));
    } else if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploadingImages(true);
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.post('/properties/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        uploadedImages.push(response.data.imageUrl);
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
      toast.success('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      const errorMessage = error.response?.data?.message || 'Failed to upload images. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const propertyData = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        propertyType: formData.propertyType,
        location: {
          state: formData.location.state,
          city: formData.location.city,
          address: formData.location.address
        }
      };

      if (editingProperty) {
        await api.put(`/properties/${editingProperty._id}`, propertyData);
        toast.success('Property updated successfully!');
      } else {
        await api.post('/properties', propertyData);
        toast.success('Property added successfully!');
      }

      // Reset form and fetch updated data
      setFormData({
        title: '',
        price: '',
        propertyType: '',
        description: '',
        bedrooms: 0,
        bathrooms: 0,
        features: [],
        images: [],
        location: {
          state: '',
          city: '',
          address: ''
        }
      });
      setEditingProperty(null);
      await fetchDashboardData();
      setActiveTab('properties');
    } catch (error) {
      console.error('Error saving property:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save property. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                  <p className="text-sm md:text-base text-gray-600 mt-2">Here's what's happening with your properties</p>
                </div>
                <button
                  onClick={() => setShowDummyData(!showDummyData)}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                    showDummyData 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-[#F3703A] text-white hover:bg-[#E35D2A]'
                  }`}
                >
                  {showDummyData ? 'Show Real Data' : 'Show Demo Data'}
                </button>
              </div>
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
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                    {showDummyData ? dummyStats[stat.label.toLowerCase().replace(' ', '')] : stat.value}
                  </h3>
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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F3703A]"></div>
                </div>
              ) : (showDummyData ? dummyProperties : recentProperties).length > 0 ? (
                <div className="space-y-3 md:space-y-4">
                  {(showDummyData ? dummyProperties : recentProperties).map((property, index) => (
                    <motion.div
                      key={property._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden mr-3 md:mr-4">
                        <img
                          src={property.images?.[0] || 'https://via.placeholder.com/150'}
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
                            {property.views || 0} views
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {property.inquiries || 0} inquiries
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 md:ml-4">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                          property.status === 'approved' ? 'bg-green-100 text-green-800' :
                          property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No properties listed yet. Add your first property to get started!
                </div>
              )}
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
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowDummyProducts(!showDummyProducts)}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                    showDummyProducts 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-[#F3703A] text-white hover:bg-[#E35D2A]'
                  }`}
                >
                  {showDummyProducts ? 'Show Real Properties' : 'Show Demo Properties'}
                </button>
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
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F3703A]"></div>
              </div>
            ) : (showDummyProducts ? dummyProperties : allProperties).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showDummyProducts ? dummyProperties : allProperties).map((property, index) => (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={property.images?.[0] || 'https://via.placeholder.com/150'}
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
                      
                      {/* Property Type and Location */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1" />
                          {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location.city}, {property.location.state}
                        </div>
                      </div>

                      {/* Bedrooms and Bathrooms */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                        </div>
                      </div>

                      {/* Features/Amenities */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {property.features.map((feature, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          {property.views || 0} views
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {property.inquiries || 0} inquiries
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex justify-between items-center mt-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          property.status === 'approved' ? 'bg-green-100 text-green-800' :
                          property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleEditProperty(property)}
                            className="px-3 py-1.5 bg-[#F3703A] text-white rounded-lg hover:bg-[#E35D2A] transition-colors flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProperty(property._id)}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#FFF5F0] rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-[#F3703A]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Listed</h3>
                <p className="text-gray-600 mb-6">You haven't listed any properties yet. Start by adding your first property!</p>
                <button
                  onClick={() => setActiveTab('add-property')}
                  className="px-6 py-3 bg-[#F3703A] text-white rounded-lg hover:bg-[#E35D2A] transition-colors flex items-center mx-auto cursor-pointer"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Property
                </button>
              </div>
            )}
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
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                          placeholder="Enter property title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                            placeholder="Enter price"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Property Type</label>
                        <select 
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50 cursor-pointer"
                          required
                        >
                          <option value="">Select property type</option>
                          <option value="house">House</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="land">Land</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                        <input
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                          placeholder="Number of bedrooms"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                        <input
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                          placeholder="Number of bathrooms"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Location</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          name="location.state"
                          value={formData.location.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                          placeholder="Enter state"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          name="location.city"
                          value={formData.location.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                          placeholder="Enter city"
                          required
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                          type="text"
                          name="location.address"
                          value={formData.location.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                          placeholder="Enter full address"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Property Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent bg-gray-50"
                        rows="4"
                        placeholder="Enter detailed description of your property"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {['garage', 'swimming_pool', 'garden', 'security', 'parking', 'furnished'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={feature}
                            name={feature}
                            checked={formData.features.includes(feature)}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-[#F3703A] border-gray-300 rounded focus:ring-[#F3703A]"
                          />
                          <label htmlFor={feature} className="text-sm text-gray-700">
                            {feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Property Images
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Plus className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          disabled={uploadingImages}
                        />
                      </label>
                    </div>
                    
                    {/* Image Preview Grid */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Property image ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {uploadingImages && (
                      <div className="text-sm text-gray-500">
                        Uploading images...
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProperty(null);
                        setFormData({
                          title: '',
                          price: '',
                          propertyType: '',
                          description: '',
                          bedrooms: 0,
                          bathrooms: 0,
                          features: [],
                          images: [],
                          location: {
                            state: '',
                            city: '',
                            address: ''
                          }
                        });
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || uploadingImages}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#F3703A] rounded-lg hover:bg-[#E35D2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Saving...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 cursor-pointer">
                          <span>{editingProperty ? 'Save Changes' : 'Add Property'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
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
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '16px 24px',
            borderRadius: '12px',
            maxWidth: '400px',
            margin: '8px',
            border: '1px solid rgba(0, 0, 0, 0.05)',
          },
          success: {
            style: {
              background: '#F0FDF4',
              color: '#166534',
              borderLeft: '4px solid #22C55E',
            },
            icon: '✅',
          },
          error: {
            style: {
              background: '#FEF2F2',
              color: '#991B1B',
              borderLeft: '4px solid #EF4444',
            },
            icon: '❌',
          },
          loading: {
            style: {
              background: '#F8FAFC',
              color: '#1E293B',
              borderLeft: '4px solid #64748B',
            },
          },
        }}
      />
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
          <div className="p-8 ">
            <Link to="/" className="block">
              <img src={whiteLogo} alt="EZI Property" className="h-12 md:h-16 w-auto" />
            </Link>
          </div>

          {/* Mobile Logo */}
          <Link to="/" className="md:hidden">
            <img src={whiteLogo} alt="EZI Property" className="h-10 w-auto" />
          </Link>

          {/* User Info */}
          <div className="p-6 bg-orange-200
          ">
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
                className={`cursor-pointer flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 mb-1 group ${
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
              className="cursor-pointer flex items-center space-x-3 w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 group"
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
