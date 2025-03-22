import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Colors from "../../styles/Colors";
import Spinner from "../../components/common/Spinner";
import Header from "../../components/common/Header/Header";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      console.log("Login successful!");
      // Redirect or handle login success here
    } catch (error) {
      console.error("Login failed!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {/* <Header/> */}
      <section className="h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 w-full">
          <div className="flex flex-col items-center">
            {/* Header Section */}
            <motion.div
              className="text-center max-w-2xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Section Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-[#F3703A]/5 px-4 py-2 rounded-full mb-6"
              >
                <span className="w-2 h-2 bg-[#F3703A] rounded-full animate-pulse" />
                <span className="text-[#F3703A] text-sm font-medium tracking-wider uppercase">Welcome Back</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Login to Your <span className="text-[#F3703A]">Account</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Access your account to manage your properties and preferences.
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-[#F3703A] focus:border-[#F3703A] transition-colors duration-300 text-gray-900 cursor-text"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-[#F3703A] focus:border-[#F3703A] transition-colors duration-300 text-gray-900 cursor-text"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password & Remember Me */}
                  <div className="flex items-center justify-between">
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
                      className="text-sm  font-medium text-[#F3703A] hover:text-[#E65A2A] transition-colors duration-300 "
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F3703A] hover:bg-[#E65A2A] text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform"
                  >
                    <span>Login to Account</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {/* Sign Up Link */}
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link 
                      to="/signup" 
                      className="font-medium text-[#F3703A] hover:text-[#E65A2A] transition-colors duration-300 cursor-pointer"
                    >
                      Sign up now
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

export default Login;
