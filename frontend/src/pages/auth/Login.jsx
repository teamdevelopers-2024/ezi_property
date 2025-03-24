import React, { useState, useEffect } from "react";

import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Building2, Shield, Users, TrendingUp } from 'lucide-react';
import Colors from "../../styles/Colors";
import Spinner from "../../components/common/Spinner";
import { useAuth } from '../../contexts/AuthContext';
import { getErrorMessage, validateEmail } from '../../utils/errorHandler';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Check for remembered credentials on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail
      }));
      setRememberMe(true);
    }
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return value.length < 1 ? 'Password is required' : null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear submit error when user starts typing
    if (submitError) setSubmitError('');

    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
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
      return;
    }

    try {
      const user = await login(formData.email, formData.password);
      
      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Redirect based on user role
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/seller/dashboard');
    } catch (err) {
      setSubmitError(getErrorMessage(err));
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
      <div className="min-h-screen flex">
        {/* Left Side - Content */}
        <div className="hidden lg:flex lg:w-1/2 bg-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Brand Logo */}
          <div className="relative z-10">
            <Link 
              to="/"
              className="text-2xl font-bold text-[#F3703A] hover:text-gray-100 transition-colors duration-300 cursor-pointer"
            >
              EZI Property
            </Link>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gray-900"
            >
              <h1 className="text-4xl font-bold mb-6">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your trusted platform for property management and real estate transactions.
              </p>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                    <Building2 className="w-6 h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Property Management</h3>
                    <p className="text-gray-700">Easily manage your properties and listings</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                    <Shield className="w-6 h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Secure Platform</h3>
                    <p className="text-gray-700">Your data is protected with industry-standard security</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                    <Users className="w-6 h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Community</h3>
                    <p className="text-gray-700">Join our growing community of property owners</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                    <TrendingUp className="w-6 h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Market Insights</h3>
                    <p className="text-gray-700">Access real-time market data and analytics</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-gray-600 text-sm">
            © 2024 EZI Property. All rights reserved.
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm">
                      {submitError}
                    </div>
                  )}

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
                        placeholder="Enter your password"
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

                  {/* Forgot Password & Remember Me */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div 
                      className="flex items-center gap-2" 
                      onClick={toggleRememberMe}
                    >
                      <div className="relative flex items-center cursor-pointer">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={toggleRememberMe}
                          className="w-4 h-4 border-2 border-gray-300 rounded appearance-none cursor-pointer checked:bg-[#F3703A] checked:border-[#F3703A] transition-all duration-200"
                        />
                        <svg
                          className={`absolute w-4 h-4 pointer-events-none ${
                            rememberMe ? 'opacity-100' : 'opacity-0'
                          } transition-opacity duration-200`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <label 
                        htmlFor="remember-me" 
                        className="text-sm text-gray-700 cursor-pointer select-none"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm font-medium text-[#F3703A] hover:text-[#E65A2A] transition-colors duration-300 cursor-pointer hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#F3703A] hover:bg-[#E65A2A] text-white text-sm sm:text-base font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform"
                  >
                    <span>Login to Account</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {/* Sign Up Link */}
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="font-medium text-[#F3703A] hover:text-[#E65A2A] transition-colors duration-300 cursor-pointer hover:underline"
                    >
                      Sign up now
                    </Link>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
