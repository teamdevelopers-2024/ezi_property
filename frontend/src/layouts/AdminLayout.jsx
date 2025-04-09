import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom'; // Import Outlet and useLocation
import Sidebar from '../components/admin/Sidebar'; // Adjust path if needed
import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
import { Bell, Settings, User, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation(); // Get location to potentially set title

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

  return (
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
                <motion.button whileTap={{ scale: 0.9 }} className="p-2 rounded-full text-gray-500 hover:text-[#0A192F] hover:bg-white/50 focus:outline-none transition-colors relative" aria-label="Notifications">
                    <Bell className="w-5 h-5"/>
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-[#D4AF37] ring-1 ring-white" />
                </motion.button>
                {/* Settings Button */}
                 <motion.button whileTap={{ scale: 0.9 }} className="p-2 rounded-full text-gray-500 hover:text-[#0A192F] hover:bg-white/50 focus:outline-none transition-colors" aria-label="Settings">
                    <Settings className="w-5 h-5"/>
                 </motion.button>
                 {/* User Dropdown */}
                 <div className="relative" ref={dropdownRef}> 
                    <button 
                       onClick={() => setIsDropdownOpen(prev => !prev)} 
                       className="flex items-center gap-2 cursor-pointer group focus:outline-none"
                    >
                         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-medium text-white border-2 border-white/50 shadow-sm group-hover:border-[#D4AF37]/50 transition-all duration-300">
                           {user?.name ? user.name.charAt(0).toUpperCase() : 'A'} 
                         </div>
                         <span className="text-sm font-medium text-gray-700 hidden sm:block group-hover:text-[#0A192F] transition-colors">
                            {user?.name || 'Admin'}
                         </span>
                    </button>
                    <AnimatePresence>
                       {isDropdownOpen && (
                          <motion.div 
                             initial={{ opacity: 0, y: -10, scale: 0.95 }}
                             animate={{ opacity: 1, y: 0, scale: 1 }}
                             exit={{ opacity: 0, y: -10, scale: 0.95 }}
                             transition={{ duration: 0.15, ease: "easeOut" }}
                             className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-lg shadow-xl border border-white/20 overflow-hidden z-50 py-1"
                          >
                             <Link 
                                to="/admin/profile" // Link to profile page
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#D4AF37]/10 hover:text-[#0A192F] transition-colors"
                             >
                                <User className="w-4 h-4 mr-2 opacity-70" />
                                Profile
                             </Link>
                              <button 
                                 onClick={() => {
                                    logout();
                                    setIsDropdownOpen(false);
                                 }}
                                 className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 hover:text-red-700 transition-colors"
                              >
                                 <LogOut className="w-4 h-4 mr-2 opacity-70" />
                                 Logout
                              </button>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
            </div>
         </header>

         {/* Page Content Area */}
         <div className="p-6 lg:p-8">
           <Outlet /> {/* Child routes will render here */}
         </div> 
      </motion.main> 
    </div> 
  );
};

export default AdminLayout; 