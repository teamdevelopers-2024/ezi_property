import React from "react";
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
import Colors from "../../styles/Colors";
import Property from "../../assets/images/property-1.jpg";
import Property2 from "../../assets/images/property-2.jpg";
import Property3 from "../../assets/images/property-3.jpg";
import Property4 from "../../assets/images/property-4.jpg";
import Property5 from "../../assets/images/property-5.jpg";
import Property6 from "../../assets/images/property-6.jpg";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Main Footer */}
      <div
        className="pt-20 pb-12 px-6 md:px-8"
        style={{ 
          background: `linear-gradient(180deg, ${Colors.primary}f0 0%, ${Colors.primary} 100%)`,
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Get In Touch */}
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div
                  className="p-2.5 rounded-xl bg-white/10 transform group-hover:scale-105 transition-all duration-300"
                  style={{ border: `2px solid ${Colors.secondary}` }}
                >
                  <img
                    src="/img/icon-deal.png"
                    alt="Icon"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <h1 className="text-2xl font-bold text-white group-hover:text-secondary transition-colors duration-300">
                  EZI
                </h1>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-gray-200 group cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300">
                  <FaMapMarkerAlt className="mt-1 w-5 h-5 text-gray-300 group-hover:text-secondary transition-colors duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300">123 Street, New York, USA</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-200 group cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300">
                  <FaPhoneAlt className="w-4 h-4 text-gray-300 group-hover:text-secondary transition-colors duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300">+012 345 67890</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-200 group cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300">
                  <FaEnvelope className="w-4 h-4 text-gray-300 group-hover:text-secondary transition-colors duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300">info@example.com</span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3">
                {[FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 text-white rounded-lg hover:bg-secondary transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  'About Us',
                  'Contact Us',
                  'Our Services',
                  'Privacy Policy',
                  'Terms & Condition'
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="flex items-center text-gray-200 hover:text-white group transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5">
                      <FaChevronRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-secondary transition-all duration-300 transform group-hover:translate-x-1" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo Gallery */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Photo Gallery</h3>
              <div className="grid grid-cols-3 gap-3">
                {[Property, Property2, Property3, Property4, Property5, Property6].map((img, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block relative group overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <img
                      src={img}
                      alt={`gallery-${index + 1}`}
                      className="w-full h-20 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Newsletter</h3>
              <p className="text-gray-200">
                Stay updated with our latest properties and real estate news.
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-secondary transition-all duration-300 cursor-text hover:bg-white/20"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer hover:shadow-lg active:scale-95"
                  style={{
                    backgroundColor: Colors.secondary,
                    boxShadow: `0 4px 12px ${Colors.secondary}40`
                  }}
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div 
        className="py-6 px-6 md:px-8"
        style={{ backgroundColor: `${Colors.primary}` }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} <span className="text-secondary font-medium">EZI</span>. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6">
            {['Home', 'Cookies', 'Help', 'FAQs'].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
