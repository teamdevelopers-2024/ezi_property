import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Trash2, Mail, Phone, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const AdminUsers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedProperties, setExpandedProperties] = useState({});
  const { showToast } = useToast();

  // Array of background colors for avatars
  const avatarColors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-red-100 text-red-800',
    'bg-teal-100 text-teal-800'
  ];

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to get consistent color based on name
  const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  const toggleProperties = (sellerId) => {
    setExpandedProperties(prev => ({
      ...prev,
      [sellerId]: !prev[sellerId]
    }));
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await api.get('/admin/users');
      // Add properties data to each seller
      const sellersWithProperties = await Promise.all(
        response.data.map(async (seller) => {
          try {
            const propertiesResponse = await api.get(`/properties/seller/${seller._id}`);
            return {
              ...seller,
              properties: propertiesResponse.data
            };
          } catch (error) {
            console.error(`Error fetching properties for seller ${seller._id}:`, error);
            return {
              ...seller,
              properties: []
            };
          }
        })
      );
      setSellers(sellersWithProperties);
    } catch (error) {
      showToast('Failed to fetch users', 'error');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sellerId) => {
    if (window.confirm('Are you sure you want to delete this seller?')) {
      try {
        await api.delete(`/admin/sellers/${sellerId}`);
        setSellers(sellers.filter(seller => seller._id !== sellerId));
        showToast('Seller deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete seller', 'error');
      }
    }
  };

  const handleStatusChange = async (sellerId, newStatus) => {
    try {
      console.log('Updating status:', { sellerId, newStatus });
      const response = await api.patch(`/admin/users/${sellerId}`, { 
        status: newStatus,
        isApproved: newStatus === 'active'
      });
      console.log('Status update response:', response.data);
      setSellers(sellers.map(seller => 
        seller._id === sellerId ? { ...seller, status: newStatus } : seller
      ));
      showToast('Seller status updated successfully', 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast(error.response?.data?.message || 'Failed to update seller status', 'error');
    }
  };

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || seller.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Manage Sellers</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Properties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSellers.map((seller) => (
                <React.Fragment key={seller._id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-medium ${getAvatarColor(seller.name)}`}>
                            {getInitials(seller.name)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                          <div className="text-sm text-gray-500">ID: {seller._id.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="w-4 h-4 mr-2" />
                        {seller.email}
                      </div>
                      {seller.phoneNumber && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="w-4 h-4 mr-2" />
                          {seller.phoneNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span className="text-sm text-gray-900">{seller.properties?.length || 0}</span>
                        <button
                          onClick={() => toggleProperties(seller._id)}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          {expandedProperties[seller._id] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={seller.status}
                        onChange={(e) => handleStatusChange(seller._id, e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(seller.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleDelete(seller._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                  {expandedProperties[seller._id] && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <td colSpan="6" className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {seller.properties?.map((property) => (
                            <div key={property._id} className="bg-white p-4 rounded-lg shadow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{property.title}</h3>
                                  <p className="text-sm text-gray-500">{property.location}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  property.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {property.status}
                                </span>
                              </div>
                              <div className="mt-2 flex justify-between text-sm text-gray-500">
                                <span>${property.price.toLocaleString()}</span>
                                <span>{property.bedrooms} beds • {property.bathrooms} baths</span>
                              </div>
                            </div>
                          ))}
                          {(!seller.properties || seller.properties.length === 0) && (
                            <div className="col-span-full text-center text-gray-500 py-4">
                              No properties listed yet
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers; 