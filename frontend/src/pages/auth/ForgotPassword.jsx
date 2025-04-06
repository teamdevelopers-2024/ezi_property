import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Spinner from "../../components/common/Spinner";
import whiteLogo from '../../assets/images/white_logo_with_text.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // TODO: Implement password reset API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex items-center">
        {/* Brand Logo */}
        <div className="absolute top-8 left-8 lg:left-24 z-10">
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

        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 w-full">
          <div className="flex flex-col items-center">
            {/* Header Section */}
            <motion.div
              className="text-center max-w-2xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Reset Your <span className="text-[#F3703A]">Password</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            </motion.div>

            {/* Reset Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                {success ? (
                  <div className="text-center">
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm mb-6">
                      Password reset instructions have been sent to your email.
                    </div>
                    <Link
                      to="/seller/login"
                      className="relative cursor-pointer inline-flex items-center gap-2 text-[#F3703A] hover:text-[#E65A2A] transition-colors duration-300"
                    >
                      Back to Login
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                        {error}
                      </div>
                    )}

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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-[#F3703A] focus:border-[#F3703A] transition-colors duration-300 text-gray-900 cursor-text"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    {/* Reset Button */}
                    <button
                      type="submit"
                      className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F3703A] hover:bg-[#E65A2A] text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform"
                    >
                      <span>Send Reset Instructions</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    {/* Back to Login Link */}
                    <p className="text-center text-sm text-gray-600">
                      Remember your password?{' '}
                      <Link
                        to="/seller/login"
                        className="font-medium text-[#F3703A] hover:text-[#E65A2A] cursor-pointer relative hover:underline"
                      >
                        Back to login
                      </Link>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword; 