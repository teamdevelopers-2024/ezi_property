import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, BedDouble, Bath, Square, Building2, Heart } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('type') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    location: searchParams.get('location') || '',
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties/search', { params: filters });
      setProperties(response.data);
    } catch (error) {
      showToast('Failed to fetch properties', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(filters);
    navigate(`/search?${params.toString()}`);
  };

  const handleFavoriteToggle = async (propertyId) => {
    try {
      await api.post(`/properties/${propertyId}/favorite`);
      setProperties(prev =>
        prev.map(property =>
          property._id === propertyId
            ? { ...property, isFavorite: !property.isFavorite }
            : property
        )
      );
      showToast('Property updated in favorites', 'success');
    } catch (error) {
      showToast('Failed to update favorites', 'error');
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
      <div className="max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Location"
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BedDouble className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors duration-300"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {properties.length} Properties Found
          </h2>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleFavoriteToggle(property._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-300"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      property.isFavorite ? 'text-[#F3703A] fill-current' : 'text-gray-500'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location.city}, {property.location.state}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#F3703A] font-semibold">₹{property.price.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm">{property.propertyType}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500 text-sm flex items-center">
                    <BedDouble className="w-4 h-4 mr-1" />
                    {property.bedrooms}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.bathrooms}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.area} sq ft
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/properties/${property._id}`)}
                  className="mt-4 w-full px-4 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No properties found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 