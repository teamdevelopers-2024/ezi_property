import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building, 
  UserCheck, 
  Users, 
  FileText, 
  Settings,
  Menu,
  ChevronLeft 
} from 'lucide-react';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Properties', icon: Building, path: '/admin/properties' },
    { name: 'Verify Sellers', icon: UserCheck, path: '/admin/verify-sellers' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Reports', icon: FileText, path: '/admin/reports' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const sidebarVariants = {
    expanded: { width: '260px', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    collapsed: { width: '80px', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1, ease: "easeOut" } },
    collapsed: { opacity: 0, x: -15, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <motion.aside
      aria-label="Sidebar"
      variants={sidebarVariants}
      initial={false}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      className="fixed top-0 left-0 h-screen 
                 bg-[#0A192F]/80 backdrop-blur-xl 
                 border-r border-white/10 
                 text-gray-300 flex flex-col z-50 shadow-2xl"
    >
      <div className="flex items-center justify-between p-5 h-[70px] border-b border-white/10 flex-shrink-0">
        <AnimatePresence>
          {isExpanded && (
            <motion.span 
              key="logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
              className="font-bold text-xl text-white whitespace-nowrap tracking-wide"
            >
              EZI Admin
            </motion.span>
          )}
        </AnimatePresence>
         <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)} 
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-4 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              title={isExpanded ? undefined : item.name} 
              className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out group relative font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#D4AF37]/10 text-white shadow-md border border-white/10' 
                  : 'hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#FFD700]' : 'text-gray-500 group-hover:text-gray-300'} transition-colors duration-200`} />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    key={item.name}
                    variants={itemVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="ml-4 whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10 flex-shrink-0">
         {/* Optional: Add Logout or User Info Here Too? */}
      </div>
    </motion.aside>
  );
};

export default Sidebar; 