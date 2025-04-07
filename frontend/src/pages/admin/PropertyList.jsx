import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare,
  TrendingUp,
  Calendar,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const PropertyList = () => {
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
      createdAt: '2024-02-15T10:00:00Z',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      _id: '2',
      title: 'Modern Office Space Downtown',
      location: 'New York, NY',
      price: 3500000,
      status: 'pending',
      type: 'commercial',
      bedrooms: 0,
      bathrooms: 3,
      area: 5000,
      views: 850,
      inquiries: 32,
      engagement: 75,
      createdAt: '2024-02-14T15:30:00Z',
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      _id: '3',
      title: 'Waterfront Condo with Ocean View',
      location: 'Miami, FL',
      price: 1200000,
      status: 'sold',
      type: 'residential',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      views: 2100,
      inquiries: 78,
      engagement: 92,
      createdAt: '2024-02-13T09:15:00Z',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      _id: '4',
      title: 'Industrial Warehouse Space',
      location: 'Chicago, IL',
      price: 1800000,
      status: 'active',
      type: 'commercial',
      bedrooms: 0,
      bathrooms: 2,
      area: 10000,
      views: 620,
      inquiries: 28,
      engagement: 68,
      createdAt: '2024-02-12T14:45:00Z',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      _id: '5',
      title: 'Family Home in Suburbs',
      location: 'Austin, TX',
      price: 750000,
      status: 'active',
      type: 'residential',
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      views: 950,
      inquiries: 42,
      engagement: 88,
      createdAt: '2024-02-11T11:20:00Z',
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/admin/properties', {
        params: filters,
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(response.data);
    } catch (error) {
      showToast('Failed to fetch properties', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAction = async (action, propertyIds) => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/admin/properties/bulk-action', {
        action,
        propertyIds
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast(`Successfully ${action}ed selected properties`, 'success');
      fetchProperties();
    } catch (error) {
      showToast(`Failed to ${action} properties`, 'error');
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/admin/properties/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showToast('Property deleted successfully', 'success');
        fetchProperties();
      } catch (error) {
        showToast('Failed to delete property', 'error');
      }
    }
  };

  const PropertyCard = ({ property }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              property.status === 'active' ? 'bg-green-100 text-green-800' : 
              property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {property.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{property.location}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to={`/admin/properties/edit/${property._id}`}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Edit className="w-5 h-5" />
          </Link>
          <button
            onClick={() => handleDelete(property._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
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
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {new Date(property.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500">Created</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
            <p className="text-gray-600 mt-1">Manage and track all properties</p>
          </div>
          <Link
            to="/admin/properties/add"
            className="mt-4 sm:mt-0 px-4 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors"
          >
            Add New Property
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
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
            <div className="grid grid-cols-1 gap-4">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyList; 