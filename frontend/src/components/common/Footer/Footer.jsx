import React from "react";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronRight
} from "react-icons/fa";
import Colors from "../../../styles/Colors";
import Property from "../../../assets/images/property-1.jpg";
import Property2 from "../../../assets/images/property-2.jpg";
import Property3 from "../../../assets/images/property-3.jpg";
import Property4 from "../../../assets/images/property-4.jpg";
import Property5 from "../../../assets/images/property-5.jpg";
import Property6 from "../../../assets/images/property-6.jpg";
import whiteLogo from "../../../assets/images/white_logo_with_text.png";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Get In Touch section animations
  const getInTouchVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Quick Links section animations
  const quickLinksVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Photo Gallery section animations
  const galleryVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Newsletter section animations
  const newsletterVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative">
      {/* Main Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-12 px-6 md:px-8"
        style={{ 
          background: `linear-gradient(180deg, ${Colors.primary}f0 0%, ${Colors.primary} 100%)`,
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <div className="max-w-[1440px] mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Get In Touch */}
            <motion.div className="space-y-6">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer group"
                variants={getInTouchVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={whiteLogo}
                  alt="EZI Property"
                  className="h-8 object-contain"
                />
              </motion.div>

              <div className="space-y-4">
                {[
                  { icon: FaMapMarkerAlt, text: "123 Street, New York, USA" },
                  { icon: FaPhoneAlt, text: "+012 345 67890" },
                  { icon: FaEnvelope, text: "info@example.com" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 text-gray-200 group cursor-pointer"
                    variants={getInTouchVariants}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="mt-1 w-5 h-5 text-gray-300 group-hover:text-secondary transition-colors duration-300" />
                    <span className="group-hover:text-white transition-colors duration-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3">
                {[FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 text-white rounded-lg hover:bg-secondary transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                    variants={getInTouchVariants}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="space-y-6">
              <motion.h3 
                className="text-xl font-semibold text-white"
                variants={quickLinksVariants}
              >
                Quick Links
              </motion.h3>
              <ul className="space-y-3">
                {[
                  'About Us',
                  'Contact Us',
                  'Our Services',
                  'Privacy Policy',
                  'Terms & Condition'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={quickLinksVariants}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="flex items-center text-gray-200 hover:text-white group transition-all duration-300 cursor-pointer">
                      <FaChevronRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-secondary transition-all duration-300 transform group-hover:translate-x-1" />
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Photo Gallery */}
            <motion.div className="space-y-6">
              <motion.h3 
                className="text-xl font-semibold text-white"
                variants={galleryVariants}
              >
                Photo Gallery
              </motion.h3>
              <div className="grid grid-cols-3 gap-3">
                {[Property, Property2, Property3, Property4, Property5, Property6].map((img, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="block relative group overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl"
                    variants={galleryVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={img}
                      alt={`gallery-${index + 1}`}
                      className="w-full h-20 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black/50"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div className="space-y-6">
              <motion.h3 
                className="text-xl font-semibold text-white"
                variants={newsletterVariants}
              >
                Newsletter
              </motion.h3>
              <motion.p 
                className="text-gray-200"
                variants={newsletterVariants}
              >
                Stay updated with our latest properties and real estate news.
              </motion.p>
              <motion.form 
                className="flex flex-col space-y-3"
                variants={newsletterVariants}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-secondary transition-all duration-300 cursor-text hover:bg-white/20"
                />
                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: Colors.secondary,
                    boxShadow: `0 4px 12px ${Colors.secondary}40`
                  }}
                  variants={newsletterVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Subscribe Now
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-6 px-6 md:px-8"
        style={{ backgroundColor: `${Colors.primary}` }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.p 
            className="text-gray-300 text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            © {new Date().getFullYear()} <span className="text-secondary font-medium">EZI</span>. All Rights Reserved.
          </motion.p>
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {['Home', 'Cookies', 'Help', 'FAQs'].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
