import React, { useState, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { MapPin, Ruler, Bed, Bath, ArrowRight, Trees, Mountain, Building, Home, MessageCircle } from "lucide-react";
import propertyImg1 from "../../assets/images/property-1.jpg";
import propertyImg2 from "../../assets/images/property-2.jpg";
import propertyImg3 from "../../assets/images/property-3.jpg";

const properties = [
  {
    id: 1,
    label: "For Sale",
    category: "residential",
    type: "Luxury Apartment",
    price: "$1,250,000",
    title: "Modern Urban Penthouse",
    address: "123 Park Avenue, New York, USA",
    details: {
      sqft: "2,500",
      bed: "4",
      bath: "3"
    },
    image: propertyImg1,
    contact: "+1234567890"
  },
  {
    id: 2,
    label: "For Sale",
    category: "land",
    type: "Agricultural Land",
    price: "$850,000",
    title: "Fertile Farmland Plot",
    address: "Rural Route 5, Iowa, USA",
    details: {
      acres: "15",
      soilType: "Loamy",
      waterSource: "Well"
    },
    image: propertyImg2,
  },
  {
    id: 3,
    label: "For Sale",
    category: "commercial",
    type: "Office Space",
    price: "$2,750,000",
    title: "Premium Office Complex",
    address: "789 Business Ave, Chicago, USA",
    details: {
      sqft: "4,000",
      floors: "2",
      parking: "20"
    },
    image: propertyImg3,
  }
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      delay: custom * 0.2,
    },
  }),
};

// Helper function to render property details based on category
const renderPropertyDetails = (property) => {
  const { category, details } = property;

  switch (category) {
    case 'residential':
      return (
        <>
          <div className="flex items-center gap-2 text-gray-500">
            <Ruler size={18} className="text-[#F3703A]" />
            <span className="text-sm">{details.sqft} Sqft</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Bed size={18} className="text-[#F3703A]" />
            <span className="text-sm">{details.bed} Bed</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Bath size={18} className="text-[#F3703A]" />
            <span className="text-sm">{details.bath} Bath</span>
          </div>
        </>
      );

    case 'land':
      return (
        <>
          <div className="flex items-center gap-2 text-gray-500">
            <Trees size={18} className="text-[#F3703A]" />
            <span className="text-sm">{details.acres} Acres</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Mountain size={18} className="text-[#F3703A]" />
            <span className="text-sm">{details.soilType}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F3703A]">
              <path d="M12 2v3m0 0 2-2m-2 2L10 3" />
              <path d="M5 7a4 4 0 0 1 4-4" />
              <path d="M5 7v12h14V7" />
              <path d="M5 7H3" />
              <path d="M19 7h2" />
              <path d="M12 19v2" />
            </svg>
            <span className="text-sm">{details.waterSource}</span>
          </div>
        </>
      );

    case 'commercial':
      return (
        <>
          <div className="flex items-center gap-2 text-gray-500">
            <Ruler size={18} className="text-[#F3703A]" />
            <span className="text-sm">{details.sqft} Sqft</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Building size={18} className="text-[#F3703A]" />
            <span className="text-sm">{details.floors} Floors</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Home size={18} className="text-[#F3703A]" />
            <span className="text-sm">{details.parking} Parking</span>
          </div>
        </>
      );

    default:
      return null;
  }
};

const PropertyCard = React.memo(({ property, custom }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const handleWhatsAppClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    const message = `Hi, I'm interested in your property: ${property.title} (${property.type}) listed for ${property.price}`;
    const whatsappUrl = `https://wa.me/${property.contact}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={custom}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden transform hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
    >
      {/* Image with loading state */}
      <div className="relative overflow-hidden h-72">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        {!imageError ? (
          <img
            src={property.image}
            alt={property.title}
            className={`w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 ${
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Image not available</span>
          </div>
        )}
        <div className="absolute top-4 left-4 px-3 py-1 bg-[#F3703A] text-white text-sm font-medium rounded-full">
          {property.label}
        </div>
      </div>

      {/* Details */}
      <div className="relative p-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 bg-[#F3703A]/5 text-[#F3703A] text-sm font-medium rounded-full">
            {property.type}
          </span>
          
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="group flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#262771] text-[#262771] hover:bg-[#262771] hover:text-white text-sm font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741 .981.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden sm:inline">Contact</span>
          </button>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#F3703A] transition-colors duration-300">
          {property.price}
        </h3>

        <h4 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-1">
          {property.title}
        </h4>

        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <MapPin size={18} className="text-[#F3703A]" />
          <p className="text-sm">{property.address}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {renderPropertyDetails(property)}
        </div>
      </div>
    </motion.div>
  );
});

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
  }).isRequired,
  custom: PropTypes.number.isRequired,
};

const PropertyListing = () => {
  const [activeFilter, setActiveFilter] = useState("Featured");
  const [isLoading, setIsLoading] = useState(false);

  // Memoize filtered properties
  const filteredProperties = useMemo(() => {
    if (activeFilter === "Featured") return properties;
    return properties.filter((property) => property.label.includes(activeFilter));
  }, [activeFilter]);

  // Memoize filter change handler
  const handleFilterChange = useCallback((filter) => {
    setIsLoading(true);
    setActiveFilter(filter);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-24">
        {/* Header + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 md:gap-0">
          <motion.div
            className="text-center md:text-left w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#F3703A]/5 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-[#F3703A] rounded-full animate-pulse" />
              <span className="text-[#F3703A] text-sm font-medium tracking-wider uppercase">Featured Properties</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Discover Our <span className="text-[#F3703A]">Premium</span> Properties
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Explore our handpicked selection of luxury properties, each chosen for their exceptional quality and prime locations.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex justify-center md:justify-end w-full md:w-1/2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {["Featured", "For Sale", "For Rent"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`group px-6 py-3 rounded-xl transition-all duration-300 font-medium cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform ${
                  activeFilter === filter
                    ? "bg-[#F3703A] hover:bg-[#E65A2A] text-white shadow-lg hover:shadow-xl"
                    : "bg-white text-gray-600 hover:text-[#F3703A] hover:bg-[#F3703A]/5 shadow-md hover:shadow-lg"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Properties Grid with loading state */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Enhanced Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Image skeleton */}
                <div className="h-72 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
                
                {/* Content skeleton */}
                <div className="p-6 space-y-4">
                  {/* Type badge skeleton */}
                  <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full w-1/3 animate-pulse" />
                  
                  {/* Price skeleton */}
                  <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg w-1/2 animate-pulse" />
                  
                  {/* Title skeleton */}
                  <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg w-3/4 animate-pulse" />
                  
                  {/* Address skeleton */}
                  <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg w-2/3 animate-pulse" />
                  
                  {/* Features skeleton */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg w-16 animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredProperties.map((property, index) => (
              <PropertyCard property={property} key={property.id} custom={index} />
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#F3703A] hover:bg-[#E65A2A] text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyListing;
