import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Settings, User, LogOut } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars, FaTimes, FaHome, FaUser, FaBuilding, FaSignOutAlt, FaCog, FaChartBar, FaEnvelope, FaBell } from 'react-icons/fa';

const AdminLayout = () => {
  const { user, logout, isLoading } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const sidebarRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Check authentication and role
  useEffect(() => {
    if (isLoading) return; // Don't redirect while loading

    if (!user) {
      navigate('/login');
      toast.error('Please login to access this page');
      return;
    }

    if (user.role !== 'admin') {
      navigate('/');
      toast.error('Unauthorized access');
      return;
    }
  }, [user, navigate, isLoading]);

  // Fetch notifications and messages
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications/unread');
        if (response.ok) {
          const data = await response.json();
          setUnreadNotifications(data.count);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages/unread');
        if (response.ok) {
          const data = await response.json();
          setUnreadMessages(data.count);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchNotifications();
    fetchMessages();
  }, []);

  // Function to get a title based on the path
  const getPageTitle = (pathname) => {
      const pathParts = pathname.split('/').filter(part => part); // like ['admin', 'dashboard']
      if (pathParts.length >= 2) {
          const page = pathParts[1];
          switch(page) {
              case 'dashboard': return 'Dashboard Overview';
              case 'properties': return 'Manage Properties';
              case 'verify-sellers': return 'Verify Sellers';
              case 'users': return 'Manage Users';
              case 'reports': return 'Reports';
              case 'settings': return 'Admin Settings';
              case 'profile': return 'Admin Profile';
              default: return 'Admin Area';
          }
      }
      return 'Admin Area';
  };

  const pageTitle = getPageTitle(location.pathname);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex min-h-screen bg-gradient-to-br from-[#E0EAFC] via-[#F8F9FA] to-[#FEF9E7]">
        {/* Background Blurs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#D4AF37]/10 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-[#0A192F]/10 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
        </div>

        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
        
        <motion.main 
          className="flex-1 transition-[padding] duration-400 ease-in-out overflow-y-auto"
          initial={false}
          animate={{ paddingLeft: isSidebarExpanded ? '260px' : '80px' }}
        >
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-lg shadow-md shadow-gray-900/5 border-b border-white/20 h-[70px] flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              {/* Dynamic Title based on route */}
              <h1 className="text-xl font-semibold text-[#0A192F]">{pageTitle}</h1>
            </div>
            <div className="flex items-center gap-5">
              {/* Notification Button */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{user?.name}</span>
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      <Link
                        to="/admin/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout; 