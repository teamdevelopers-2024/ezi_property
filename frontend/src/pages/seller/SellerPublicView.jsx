import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Phone, Mail, MapPin, Star, Package, Clock } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const SellerPublicView = () => {
  const { sellerId } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [seller, setSeller] = useState(null);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    memberSince: '',
    responseRate: '95%',
    responseTime: 'Within 24 hours'
  });

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const [sellerResponse, propertiesResponse] = await Promise.all([
          api.get(`/users/${sellerId}`),
          api.get(`/properties/seller/${sellerId}`)
        ]);

        setSeller(sellerResponse.data);
        setProperties(propertiesResponse.data);
        setStats(prev => ({
          ...prev,
          totalProperties: propertiesResponse.data.length,
          activeListings: propertiesResponse.data.filter(p => p.status === 'active').length,
          memberSince: new Date(sellerResponse.data.createdAt).toLocaleDateString()
        }));
      } catch (error) {
        showToast('Error loading seller information', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellerData();
  }, [sellerId, showToast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3703A]"></div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seller Not Found</h2>
          <p className="text-gray-600">The seller you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isCurrentUser = user && user._id === sellerId;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seller Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-[#F3703A]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{seller.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.8</span>
                </div>
                <span>•</span>
                <span>Member since {stats.memberSince}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{seller.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{seller.email}</span>
                </div>
                {seller.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{seller.location}</span>
                  </div>
                )}
              </div>
            </div>
            {isCurrentUser && (
              <Link
                to="/seller/dashboard"
                className="bg-[#F3703A] text-white px-6 py-2 rounded-lg hover:bg-[#E65A2A] transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </motion.div>

        {/* Seller Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#F3703A]" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600">Total Properties</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#F3703A]" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600">Active Listings</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#F3703A]" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600">Response Time</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.responseTime}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#F3703A]" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600">Response Rate</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.responseRate}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Properties Grid */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link to={`/property/${property._id}`}>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {property.images && property.images[0] ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Building2 className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-[#F3703A] font-bold mb-2">₹{property.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPublicView; 