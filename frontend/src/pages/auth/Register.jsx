import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Spinner from "../../components/common/Spinner";
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { getErrorMessage, validatePassword, validateEmail, validatePhone, validateName } from '../../utils/errorHandler';

const Register = () => {
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

    // Handle name validation
    if (name === 'name') {
      // Allow only letters and spaces
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return;
      }
      
      // Show error for trailing spaces
      if (value.endsWith(' ')) {
        setErrors(prevErrors => ({
          ...prevErrors,
          name: 'Name cannot end with a space'
        }));
      }
    }

    // Handle phone validation - numbers only
    if (name === 'phone') {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
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
    if (name === 'name' && value.endsWith(' ')) {
      // Keep the trailing space error if it exists
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: 'Name cannot end with a space'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }));
    }

    // Special case for confirm password
    if (name === 'password') {
      const confirmError = formData.confirmPassword 
        ? validateField('confirmPassword', formData.confirmPassword) 
        : null;
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: confirmError
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      showToast('Please fix the form errors before submitting.', 'error');
      return;
    }

    try {
      await register(formData);
      showToast('Registration successful! Please log in to continue.', 'success');
      navigate('/login');
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setSubmitError(errorMessage);
      showToast(errorMessage, 'error');
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

  return (
    <>
      {isLoading && <Spinner />}
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex items-center">
        {/* Brand Logo */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8 lg:left-24 z-10">
          <Link 
            to="/"
            className="text-xl sm:text-2xl font-bold text-[#F3703A] hover:text-[#E65A2A] transition-colors duration-300 cursor-pointer"
          >
            EZI Property
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
                <span className="text-[#F3703A] text-xs sm:text-sm font-medium tracking-wider uppercase">Join Us</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Create Your <span className="text-[#F3703A]">Account</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Join our platform to start managing your properties efficiently.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 text-gray-600">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Easy Property Management</h3>
                    <p className="text-xs sm:text-sm">Manage all your properties in one place</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-gray-600">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Secure Platform</h3>
                    <p className="text-xs sm:text-sm">Your data is protected with industry-standard security</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-gray-600">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Instant Notifications</h3>
                    <p className="text-xs sm:text-sm">Stay updated with real-time notifications</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              className="w-full lg:w-1/2 max-w-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm">
                      {submitError}
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#F3703A]" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        pattern="[A-Za-z\s]+"
                        className={`block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:ring-2 focus:ring-[#F3703A]/20 focus:border-[#F3703A] focus:outline-none transition-all duration-300 text-gray-900 cursor-text`}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    {renderFieldError('name')}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#F3703A]" />
                      </div>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email.split('@')[0]}
                        onChange={(e) => {
                          const value = e.target.value;
                          const sanitizedValue = value.replace(/[@\s]/g, '');
                          handleChange({
                            target: {
                              name: 'email',
                              value: sanitizedValue + '@gmail.com'
                            }
                          });
                        }}
                        className={`block w-full pl-9 sm:pl-10 pr-[105px] py-2 sm:py-3 text-sm sm:text-base border ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:ring-2 focus:ring-[#F3703A]/20 focus:border-[#F3703A] focus:outline-none transition-all duration-300 text-gray-900 cursor-text`}
                        placeholder="Enter your email"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm sm:text-base">@gmail.com</span>
                      </div>
                    </div>
                    {renderFieldError('email')}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#F3703A]" />
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        className={`block w-full pl-9 sm:pl-10 pr-16 py-2 sm:py-3 text-sm sm:text-base border ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:ring-2 focus:ring-[#F3703A]/20 focus:border-[#F3703A] focus:outline-none transition-all duration-300 text-gray-900 cursor-text`}
                        placeholder="Enter your phone number"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                        <span className="text-xs sm:text-sm">{formData.phone.length}/10</span>
                      </div>
                    </div>
                    {renderFieldError('phone')}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-[#F3703A]" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`block w-full pl-9 sm:pl-10 pr-12 py-2 sm:py-3 text-sm sm:text-base border ${
                          errors.password ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:ring-2 focus:ring-[#F3703A]/20 focus:border-[#F3703A] focus:outline-none transition-all duration-300 text-gray-900 cursor-text`}
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#F3703A] active:text-[#F3703A] transition-colors duration-300 cursor-pointer"
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5 hover:text-[#F3703A] transition-colors duration-300" />
                        ) : (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 hover:text-[#F3703A] transition-colors duration-300" />
                        )}
                      </button>
                    </div>
                    {renderFieldError('password')}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-[#F3703A]" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`block w-full pl-9 sm:pl-10 pr-12 py-2 sm:py-3 text-sm sm:text-base border ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:ring-2 focus:ring-[#F3703A]/20 focus:border-[#F3703A] focus:outline-none transition-all duration-300 text-gray-900 cursor-text`}
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#F3703A] active:text-[#F3703A] transition-colors duration-300 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5 hover:text-[#F3703A] transition-colors duration-300" />
                        ) : (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 hover:text-[#F3703A] transition-colors duration-300" />
                        )}
                      </button>
                    </div>
                    {renderFieldError('confirmPassword')}
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#F3703A] hover:bg-[#E65A2A] text-white text-sm sm:text-base font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {/* Login Link */}
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="relative font-medium text-[#F3703A] hover:text-[#E65A2A] transition-colors duration-300 cursor-pointer hover:underline"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
