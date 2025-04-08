import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Spinner from "../../components/common/Spinner";
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { getErrorMessage, validatePassword, validateEmail, validatePhone, validateName } from '../../utils/errorHandler';
import whiteLogo from '../../assets/images/white_logo_with_text.png';

const SellerRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'password':
        const passwordErrors = validatePassword(value);
        return passwordErrors.length > 0 ? passwordErrors.join('. ') : null;
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent leading spaces for all fields except password
    if (name !== 'password' && name !== 'confirmPassword' && value.startsWith(' ')) {
      return;
    }

    // Handle email validation - no spaces allowed
    if (name === 'email' && value.includes(' ')) {
      return;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear submit error when user starts typing
    if (submitError) setSubmitError('');

    // Validate field
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    setSubmitError('');

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      setSubmitError('Please fix the errors before submitting.');
      return;
    }

    try {
      await register(formData);
      setRegistrationSuccess(true);
      showToast('Registration successful! Please wait for admin approval.', 'success');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
    } catch (error) {
      setSubmitError(error.message);
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldError = (fieldName) => {
    return errors[fieldName] && (
      <p className="mt-1 text-sm text-red-600">
        {errors[fieldName]}
      </p>
    );
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
            
            <p className="text-gray-600 mb-8">
              Your registration has been submitted successfully. Please wait for admin approval before logging in.
              You will be notified once your account is approved.
            </p>
            
            <div className="space-y-4">
              <Link
                to="/seller/login"
                className="block w-full bg-[#F3703A] text-white py-3 px-4 rounded-lg hover:bg-[#E65A2A] transition-colors"
              >
                Go to Login
              </Link>
              
              <Link
                to="/"
                className="block w-full text-gray-600 hover:text-gray-800 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex items-center">
      {/* Brand Logo */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 lg:left-24 z-10">
        <Link 
          to="/"
          className="block hover:opacity-90 transition-all duration-300"
        >
          <img src={whiteLogo} alt="EZI Property" className="h-8" />
        </Link>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 w-full py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
          {/* Left Side - Content */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F3703A]/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#F3703A] rounded-full animate-pulse" />
              <span className="text-[#F3703A] text-xs sm:text-sm font-medium tracking-wider uppercase">Seller Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Start Your Journey as a <span className="text-[#F3703A]">Property Seller</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Join our platform and start showcasing your properties to potential buyers. Create your seller account today.
            </p>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div
            className="w-full lg:w-1/2 max-w-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Your Account</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {submitError && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                    {submitError}
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition-colors ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-[#F3703A]'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition-colors ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-[#F3703A]'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition-colors ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-[#F3703A]'
                      }`}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 border rounded-lg outline-none transition-colors ${
                        errors.password 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-[#F3703A]'
                      }`}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 border rounded-lg outline-none transition-colors ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-[#F3703A]'
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#F3703A] text-white py-2 px-4 rounded-lg hover:bg-[#E65A2A] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/seller/login" className="text-[#F3703A] hover:text-[#E65A2A] font-medium cursor-pointer relative hover:underline">
                    Sign in here
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SellerRegister; 