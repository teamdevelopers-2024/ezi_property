import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NotFoundIllustration from '../../components/illustrations/NotFoundIllustration';
import { ArrowLeft, Home, Search } from 'lucide-react';

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-4">
      <motion.div
        className="max-w-4xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Illustration */}
        <motion.div
          variants={itemVariants}
        >
          <NotFoundIllustration />
        </motion.div>

        {/* Content */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Oops! Page Not Found
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 mb-8 max-w-xl mx-auto"
        >
          We couldn't find the page you're looking for. It might have been moved, deleted,
          or never existed in the first place.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 border border-gray-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
          
          <Link
            to="/search"
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 border border-gray-200 shadow-lg hover:shadow-xl"
          >
            <Search size={20} />
            <span>Search Properties</span>
          </Link>
        </motion.div>

        {/* Help Text */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-sm text-gray-500"
        >
          Need assistance? <a href="/contact" className="text-indigo-600 hover:underline">Contact our support team</a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
