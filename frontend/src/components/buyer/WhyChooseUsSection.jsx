import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import propertyImage from "../../assets/images/about.jpg";

const features = [
  {
    title: "Premium Property Selection",
    description: "Access to exclusive luxury properties in prime locations worldwide."
  },
  {
    title: "Expert Real Estate Advisors",
    description: "Professional guidance from experienced luxury real estate specialists."
  },
  {
    title: "Personalized Service",
    description: "Tailored solutions to meet your unique property requirements."
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side - Image with background shape */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-1/2"
          >
            {/* Background shape */}
            <div className="absolute -top-8 -left-8 w-full h-full">
              <div className="relative w-full h-full rounded-2xl bg-[#F3703A]/10">
                {/* Triangle corner cut */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[80px] border-t-transparent border-l-[120px] border-l-white" />
              </div>
            </div>

            {/* Image Container */}
            <div className="relative">
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={propertyImage}
                  alt="Luxury Property"
                  className="w-full h-[600px] object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl z-20"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-[#F3703A] mb-1">15+</h4>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-[#F3703A] mb-1">500+</h4>
                    <p className="text-sm text-gray-600">Properties Sold</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
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
              <span className="text-[#F3703A] text-sm font-medium tracking-wider uppercase cursor-pointer hover:text-[#E65A2A] transition-colors duration-300">Why Choose Us</span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Premier Choice for <br />
              <span className="text-[#F3703A]">Luxury Real Estate</span>
            </h2>

            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              We specialize in connecting discerning clients with exceptional properties. Our commitment to excellence and personalized service sets us apart in the luxury real estate market.
            </p>

            {/* Features List */}
            <div className="space-y-8 mb-12">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-4 scale-z-90 group cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F3703A]/5 flex items-center justify-center group-hover:bg-[#F3703A]/10 transition-all duration-300 transform group-hover:scale-110">
                    <Check className="w-6 h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#F3703A] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#F3703A] hover:bg-[#E65A2A] text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform"
            >
              <span>Discover More</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
