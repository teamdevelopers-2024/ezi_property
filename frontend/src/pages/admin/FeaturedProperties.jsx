import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Search, 
  Filter, 
  Eye, 
  MessageSquare,
  TrendingUp,
  Calendar,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  ChevronDown
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const FeaturedProperties = () => {
  const { showToast } = useToast();
  const [properties, setProperties] = useState([
    {
      _id: '1',
      title: 'Luxury Villa in Beverly Hills',
      location: 'Beverly Hills, CA',
      price: 2500000,
      status: 'active',
      type: 'residential',
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      views: 1250,
      inquiries: 45,
      engagement: 85,
      featured: true,
      featuredUntil: '2024-03-15T10:00:00Z',
      createdAt: '2024-02-15T10:00:00Z',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      _id: '2',
      title: 'Waterfront Condo with Ocean View',
      location: 'Miami, FL',
      price: 1200000,
      status: 'active',
      type: 'residential',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      views: 2100,
      inquiries: 78,
      engagement: 92,
      featured: true,
      featuredUntil: '2024-03-14T15:30:00Z',
      createdAt: '2024-02-14T15:30:00Z',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      _id: '3',
      title: 'Modern Office Space Downtown',
      location: 'New York, NY',
      price: 3500000,
      status: 'active',
      type: 'commercial',
      bedrooms: 0,
      bathrooms: 3,
      area: 5000,
      views: 850,
      inquiries: 32,
      engagement: 75,
      featured: true,
      featuredUntil: '2024-03-13T09:15:00Z',
      createdAt: '2024-02-13T09:15:00Z',
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sortBy: 'views',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchFeaturedProperties();
  }, [filters]);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/properties/featured', {
        params: filters
      });
      setProperties(response.data);
    } catch (error) {
      showToast('Failed to fetch featured properties', 'error');
      console.error('Error fetching featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAction = async (action, propertyIds) => {
    try {
      await api.post('/admin/properties/bulk-action', {
        action,
        propertyIds
      });
      showToast(`Successfully ${action}ed selected properties`, 'success');
      fetchFeaturedProperties();
    } catch (error) {
      showToast(`Failed to ${action} properties`, 'error');
    }
  };

  const PropertyCard = ({ property }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Add dummy amenities and features data
    const amenities = [
      { name: 'Swimming Pool', icon: '🏊‍♂️' },
      { name: 'Gym', icon: '💪' },
      { name: 'Parking', icon: '🚗' },
      { name: 'Security', icon: '🔒' },
      { name: 'Garden', icon: '🌳' },
      { name: 'Elevator', icon: '🛗' }
    ];

    const features = [
      { name: 'Air Conditioning', icon: '❄️' },
      { name: 'Heating', icon: '🔥' },
      { name: 'Furnished', icon: '🪑' },
      { name: 'Pet Friendly', icon: '🐾' },
      { name: 'Balcony', icon: '🌅' },
      { name: 'Storage', icon: '📦' }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        {/* Property Image Section */}
        <div className="relative h-48 group">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Status Badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              property.status === 'active' ? 'bg-green-100 text-green-800' :
              property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {property.status}
            </span>
          </div>
          {/* Image Gallery Indicator */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
              {property.images.length} images
            </div>
          )}
        </div>

        {/* Property Details Section */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
            <span className="text-lg font-bold text-[#F3703A]">${property.price.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">{property.location}</p>

          {/* Property Features */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{property.views}</p>
                <p className="text-xs text-gray-500">Views</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{property.inquiries}</p>
                <p className="text-xs text-gray-500">Inquiries</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{property.engagement}%</p>
                <p className="text-xs text-gray-500">Engagement</p>
              </div>
            </div>
          </div>

          {/* Expandable Details */}
          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-sm text-gray-500 hover:text-gray-700"
            >
              <span>Additional Details</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Property Type</p>
                        <p className="text-sm font-medium text-gray-900">{property.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Listed Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(property.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Featured Until</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(property.featuredUntil).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* Location Details */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location Details</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-900">{property.location}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Near public transportation, schools, and shopping centers
                        </p>
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Amenities</p>
                      <div className="grid grid-cols-3 gap-2">
                        {amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-gray-50 p-2 rounded-lg">
                            <span>{amenity.icon}</span>
                            <span className="text-xs text-gray-700">{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Features</p>
                      <div className="grid grid-cols-3 gap-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-gray-50 p-2 rounded-lg">
                            <span>{feature.icon}</span>
                            <span className="text-xs text-gray-700">{feature.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm text-gray-900 mt-1">
                        {property.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Featured until: {new Date(property.featuredUntil).toLocaleDateString()}
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                Approve
              </button>
              <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Reject
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Featured Properties</h1>
            <p className="text-gray-600 mt-1">Manage and track featured property performance</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3703A] focus:border-transparent w-64"
              />
            </div>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
            <button
              onClick={() => setFilters({
                ...filters,
                sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
              })}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3703A]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties; 