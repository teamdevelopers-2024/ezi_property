import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, BedDouble, Bath, Square, Building2, Heart, Trash2 } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const SavedProperties = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const response = await api.get('/properties/favorites');
      setSavedProperties(response.data);
    } catch (error) {
      showToast('Failed to fetch saved properties', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await api.delete(`/properties/${propertyId}/favorite`);
      setSavedProperties(prev =>
        prev.filter(property => property._id !== propertyId)
      );
      showToast('Property removed from favorites', 'success');
    } catch (error) {
      showToast('Failed to remove property from favorites', 'error');
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Saved Properties</h1>
          <p className="text-gray-600">
            {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {savedProperties.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Properties</h3>
            <p className="text-gray-600 mb-6">
              You haven't saved any properties yet. Start exploring and save your favorites!
            </p>
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors duration-300"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map(property => (
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
                    onClick={() => handleRemoveFavorite(property._id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-300"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
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
        )}
      </div>
    </div>
  );
};

export default SavedProperties; 