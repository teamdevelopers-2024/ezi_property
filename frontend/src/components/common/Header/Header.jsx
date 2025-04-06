import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Colors from "../../../styles/Colors";
import whiteLogo from "../../../assets/images/white_logo_with_text.png";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 45);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    {
      name: 'Property',
      href: '#',
      submenu: ['Property List', 'Property Type', 'Property Agent']
    },
    {
      name: 'Pages',
      href: '#',
      submenu: ['Testimonial', '404 Error']
    }
  ];

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <>
    <div
      className={`
        z-50
        fixed 
        left-1/2 
        transform -translate-x-1/2
        transition-all duration-500 ease-in-out
          ${isSticky ? 'top-0 w-full' : 'top-6 w-[90%] max-w-[1440px]'}
      `}
    >
        <motion.nav
          initial={false}
          animate={isSticky ? { y: 0 } : { y: 0 }}
        className={`
          flex justify-between items-center
            px-6 lg:px-24
            py-4
          mx-auto
            bg-white/80 backdrop-blur-md
          transition-all duration-500 ease-in-out
            ${isSticky 
              ? 'rounded-none shadow-md w-full' 
              : 'rounded-2xl shadow-lg w-full'
            }
          `}
        >
          <div className={`
            w-full
            mx-auto
            flex justify-between items-center
            ${isSticky ? '' : 'max-w-[1440px]'}
          `}>
        {/* Logo */}
            <a href="#" className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-all duration-300">
              <img
                src={whiteLogo}
                alt="EZI Property"
                className="h-12 object-contain"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
              <button
                    className="flex items-center gap-1 text-gray-600 hover:text-[#F3703A] transition-all duration-300 cursor-pointer transform hover:scale-105"
                    style={{ 
                      color: Colors.primary,
                      ':hover': { color: Colors.secondary }
                    }}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </button>
                  
                  {item.submenu && (
                    <div className="absolute hidden group-hover:block top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-2">
                      {item.submenu.map((subItem) => (
                  <a
                    key={subItem}
                    href="#"
                          className="block px-4 py-2 text-gray-600 hover:text-[#F3703A] hover:bg-[#F3703A]/5 rounded-lg transition-all duration-300 cursor-pointer transform hover:translate-x-1"
                          style={{ 
                            color: Colors.primary,
                            ':hover': { 
                              color: Colors.secondary,
                              backgroundColor: `${Colors.secondary}10`
                            }
                          }}
                  >
                    {subItem}
                  </a>
                ))}
              </div>
                  )}
            </div>
              ))}

          {/* Seller Login Button */}
          <button
                onClick={() => navigate("/seller/login")}
                className="px-6 py-2.5 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 hover:-translate-y-0.5"
            style={{
              backgroundColor: Colors.secondary,
                  ':hover': { backgroundColor: Colors.primary }
            }}
          >
            Seller Login
          </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#F3703A] transition-all duration-300 cursor-pointer transform hover:scale-110"
              style={{ 
                color: Colors.primary,
                ':hover': { color: Colors.secondary }
              }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-40 pt-24 bg-white/95 backdrop-blur-sm overflow-y-auto"
          >
            <div className="container mx-auto px-4 pb-8">
              <div className="flex flex-col gap-2">
                {menuItems.map((item, index) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-none">
                    <button
                      onClick={() => item.submenu && toggleSubmenu(index)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3
                        text-[#262771] hover:text-[#F3703A]
                        transition-all duration-300 active:scale-[0.98]
                        hover:bg-gray-50/80 cursor-pointer
                      `}
                    >
                      <span>{item.name}</span>
                      {item.submenu && (
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-300 ${
                            openSubmenu === index ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>
                    {item.submenu && (
                      <AnimatePresence>
                        {openSubmenu === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-gray-50/50"
                          >
                            {item.submenu.map((subItem) => (
                              <a
                                key={subItem}
                                href="#"
                                className={`
                                  block px-8 py-2.5
                                  text-[#262771] hover:text-[#F3703A]
                                  hover:bg-gray-100
                                  transition-all duration-300
                                  active:scale-[0.98]
                                  transform hover:translate-x-2
                                  cursor-pointer
                                `}
                              >
                                {subItem}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4">
                  <button
                    onClick={() => navigate("/seller/login")}
                    className={`
                      w-full px-6 py-3 text-white rounded-xl
                      bg-[#F3703A] hover:bg-[#E65A2A]
                      transition-all duration-300
                      shadow-md hover:shadow-lg
                      active:scale-[0.98]
                      transform hover:-translate-y-0.5
                      cursor-pointer
                    `}
                  >
                    Seller Login
            </button>
          </div>
        </div>
    </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
