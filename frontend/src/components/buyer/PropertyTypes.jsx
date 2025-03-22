import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Icons
import iconApartment from "../../assets/icons/icon-apartment.png";
import iconBuilding from "../../assets/icons/icon-building.png";
import iconCondo from "../../assets/icons/icon-condominium.png";
import iconDeal from "../../assets/icons/icon-deal.png";
import iconHouse from "../../assets/icons/icon-house.png";
import iconHousing from "../../assets/icons/icon-housing.png";
import iconLuxury from "../../assets/icons/icon-luxury.png";
import iconNeighborhood from "../../assets/icons/icon-neighborhood.png";

const propertyTypes = [
  { id: 1, title: "Luxury Apartments", count: "123", icon: iconApartment },
  { id: 2, title: "Modern Buildings", count: "87", icon: iconBuilding },
  { id: 3, title: "Elite Condominiums", count: "45", icon: iconCondo },
  { id: 4, title: "Premium Deals", count: "65", icon: iconDeal },
  { id: 5, title: "Family Houses", count: "150", icon: iconHouse },
  { id: 6, title: "Smart Homes", count: "90", icon: iconHousing },
  { id: 7, title: "Luxury Villas", count: "35", icon: iconLuxury },
  { id: 8, title: "Prime Locations", count: "76", icon: iconNeighborhood }
];

const PropertyTypes = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-[1440px]">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#F3703A]/5 px-4 py-2 rounded-full mb-6 cursor-pointer hover:bg-[#F3703A]/10 transition-colors duration-300"
          >
            <span className="w-2 h-2 bg-[#F3703A] rounded-full animate-pulse" />
            <span className="text-[#F3703A] text-sm font-medium tracking-wider uppercase">Explore Categories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Discover Your Perfect <span className="text-[#F3703A]">Property Type</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 text-lg"
          >
            From luxury apartments to premium villas, find the perfect property that matches your lifestyle and preferences.
          </motion.p>
        </div>

        {/* Property Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {propertyTypes.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cursor-pointer"
            >
              <div className="group relative bg-white rounded-2xl p-6 md:p-8 hover:bg-[#F3703A]/5 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F3703A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#F3703A]/5 rounded-xl p-3 mb-6 group-hover:bg-[#F3703A]/10 transition-all duration-300 group-hover:scale-110">
                    <img src={property.icon} alt={property.title} className="w-full h-full object-contain" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#F3703A] transition-colors duration-300">
                    {property.title}
                  </h3>
                  
                  <p className="text-gray-500 mb-4 group-hover:text-gray-600 transition-colors duration-300">
                    {property.count} Properties
                  </p>
                  
                  <div className="flex items-center gap-2 text-[#F3703A] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className=" relative inline-flex items-center gap-2 px-8 py-4 bg-[#F3703A] hover:bg-[#E65A2A] text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
            <span>View All Categories</span>
            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyTypes;
