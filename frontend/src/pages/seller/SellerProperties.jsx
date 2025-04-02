import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, MapPin, Filter, Search, DollarSign, BedDouble, Bath, Square } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const SellerProperties = () => {
  const { sellerId } = useParams();
  const { showToast } = useToast();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    priceRange: 'all',
    propertyType: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for testing
  const dummyProperties = [
    {
      _id: '1',
      title: 'Luxury Villa in Prime Location',
      description: 'Beautiful 4-bedroom villa with modern amenities and stunning views.',
      price: 2500000,
      location: {
        address: '123 Luxury Lane',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      propertyType: 'villa',
      status: 'active',
      bedrooms: 4,
      bathrooms: 3,
      area: 3500,
      amenities: ['parking', 'security', 'swimming-pool', 'gym'],
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c153aee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2024-03-15T10:00:00.000Z'
    },
    {
      _id: '2',
      title: 'Modern Apartment in City Center',
      description: 'Spacious 2BHK apartment with premium finishes and city views.',
      price: 1200000,
      location: {
        address: '456 Urban Heights',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001'
      },
      propertyType: 'apartment',
      status: 'pending',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      amenities: ['parking', 'security', 'elevator', 'gym'],
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2024-03-14T15:30:00.000Z'
    },
    {
      _id: '3',
      title: 'Commercial Space in Business District',
      description: 'Premium office space with high ceilings and modern infrastructure.',
      price: 3500000,
      location: {
        address: '789 Business Park',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001'
      },
      propertyType: 'commercial',
      status: 'active',
      bedrooms: 0,
      bathrooms: 2,
      area: 2500,
      amenities: ['parking', 'security', 'elevator', 'power-backup'],
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2024-03-13T09:15:00.000Z'
    }
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // For now, use dummy data instead of API call
        setProperties(dummyProperties);
        setIsLoading(false);
      } catch (error) {
        showToast('Error loading properties', 'error');
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [showToast]);

  const filteredProperties = properties.filter(property => {
    // Search filter
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && property.status !== filters.status) {
      return false;
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (property.price < min || property.price > max) {
        return false;
      }
    }

    // Property type filter
    if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
      return false;
    }

    return true;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3703A]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Properties</h1>
          <p className="text-gray-600">Browse through all properties listed by this seller</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="0-1000000">Under ₹10L</option>
                <option value="1000000-5000000">₹10L - ₹50L</option>
                <option value="5000000-10000000">₹50L - ₹1Cr</option>
                <option value="10000000-999999999">Over ₹1Cr</option>
              </select>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
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
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.status === 'active' ? 'bg-green-100 text-green-800' :
                      property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-[#F3703A] font-bold mb-2">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location.city}, {property.location.state}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 text-sm mb-2">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <BedDouble className="w-4 h-4 mr-1" />
                        {property.bedrooms}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.area} sq ft
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span className="capitalize">{property.propertyType}</span>
                    <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProperties; 