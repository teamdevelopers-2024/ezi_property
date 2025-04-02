import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, BedDouble, Bath, Square, Building2, Share2, Heart, MessageSquare } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await api.get(`/properties/${id}`);
      setProperty(response.data);
      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      showToast('Failed to fetch property details', 'error');
      navigate('/properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      await api.post(`/properties/${id}/favorite`);
      setIsFavorite(!isFavorite);
      showToast(
        isFavorite ? 'Property removed from favorites' : 'Property added to favorites',
        'success'
      );
    } catch (error) {
      showToast('Failed to update favorites', 'error');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard', 'success');
    } catch (error) {
      showToast('Failed to copy link', 'error');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/properties/${id}/contact`, contactForm);
      showToast('Message sent successfully', 'success');
      setShowContactForm(false);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3703A]"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
          <button
            onClick={() => navigate('/properties')}
            className="mt-4 px-4 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors duration-300"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Property Images */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-[500px]">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between px-4">
              <button
                onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : property.images.length - 1))}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => (prev < property.images.length - 1 ? prev + 1 : 0))}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                →
              </button>
            </div>
          </div>
          <div className="p-4 flex space-x-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                  currentImageIndex === index ? 'ring-2 ring-[#F3703A]' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Title and Price */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#F3703A]">₹{property.price.toLocaleString()}</div>
                  <div className="text-gray-600">{property.propertyType}</div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <BedDouble className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{property.area} sq ft</span>
                </div>
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{property.propertyType}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-[#F3703A] rounded-full mr-2"></span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Seller Information</h2>
              <div className="flex items-center mb-4">
                <img
                  src={property.seller.profileImage || '/default-avatar.png'}
                  alt={property.seller.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">{property.seller.name}</div>
                  <div className="text-sm text-gray-600">{property.seller.companyName}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{property.seller.phoneNumber}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{property.seller.email}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors duration-300"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Seller
                </button>
                <div className="flex space-x-4">
                  <button
                    onClick={handleFavoriteToggle}
                    className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg transition-colors duration-300 ${
                      isFavorite
                        ? 'border-[#F3703A] text-[#F3703A]'
                        : 'border-gray-300 text-gray-700 hover:border-[#F3703A] hover:text-[#F3703A]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Favorited' : 'Favorite'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-[#F3703A] hover:text-[#F3703A] transition-colors duration-300"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Contact Seller</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#F3703A] text-white rounded-lg hover:bg-[#E65A2A] transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails; 