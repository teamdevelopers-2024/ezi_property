import React from 'react';
import { motion } from 'framer-motion';

const NotFoundIllustration = () => {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      width="400"
      height="300"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto"
    >
      {/* Background Elements */}
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        cx="200"
        cy="150"
        r="120"
        fill="#F3F4F6"
      />
      
      {/* House Frame */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        d="M180 200h80v-60l-40-30-40 30z"
        stroke="#4F46E5"
        strokeWidth="4"
        fill="white"
      />
      
      {/* Door */}
      <motion.rect
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
        x="210"
        y="160"
        width="20"
        height="40"
        fill="#4F46E5"
      />
      
      {/* Windows */}
      <motion.rect
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        x="190"
        y="140"
        width="15"
        height="15"
        fill="#4F46E5"
      />
      <motion.rect
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        x="235"
        y="140"
        width="15"
        height="15"
        fill="#4F46E5"
      />
      
      {/* 404 Text */}
      <motion.text
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        x="160"
        y="100"
        fontSize="48"
        fontWeight="bold"
        fill="#4F46E5"
        textAnchor="middle"
      >
        404
      </motion.text>
      
      {/* Question Marks */}
      <motion.g
        initial={{ rotate: -15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <text x="280" y="130" fontSize="24" fill="#9CA3AF">?</text>
        <text x="300" y="160" fontSize="32" fill="#9CA3AF">?</text>
        <text x="270" y="180" fontSize="28" fill="#9CA3AF">?</text>
      </motion.g>
    </motion.svg>
  );
};

export default NotFoundIllustration; 