import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Home, 
  Settings, 
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  List,
  UserCog,
  MessageSquare,
  Shield,
  Search,
  Bell,
  HelpCircle,
  Menu,
  Star
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const AdminDashboard = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalSellers: 0,
    totalBuyers: 0,
    totalSales: 0,
    recentProperties: [],
    recentUsers: [],
    recentSales: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Dummy data
        const dummyData = {
          totalProperties: 156,
          totalUsers: 45,
          totalSellers: 45,
          totalBuyers: 89,
          totalSales: 67,
          recentProperties: [
            {
              id: 1,
              name: "Luxury Villa in Beverly Hills",
              date: "2 hours ago",
              link: "/admin/properties/1"
            },
            {
              id: 2,
              name: "Modern Apartment in Downtown",
              date: "5 hours ago",
              link: "/admin/properties/2"
            },
            {
              id: 3,
              name: "Beachfront Condo in Malibu",
              date: "1 day ago",
              link: "/admin/properties/3"
            },
            {
              id: 4,
              name: "Family Home in Suburbs",
              date: "2 days ago",
              link: "/admin/properties/4"
            }
          ],
          recentUsers: [
            {
              id: 1,
              name: "John Smith",
              date: "1 hour ago",
              link: "/admin/users/1"
            },
            {
              id: 2,
              name: "Sarah Johnson",
              date: "3 hours ago",
              link: "/admin/users/2"
            },
            {
              id: 3,
              name: "Michael Brown",
              date: "1 day ago",
              link: "/admin/users/3"
            },
            {
              id: 4,
              name: "Emily Davis",
              date: "2 days ago",
              link: "/admin/users/4"
            }
          ],
          recentSales: [
            {
              id: 1,
              propertyName: "Luxury Villa in Beverly Hills",
              buyerName: "David Wilson",
              amount: "$1,250,000",
              date: "2 hours ago",
              link: "/admin/sales/1"
            },
            {
              id: 2,
              propertyName: "Modern Apartment in Downtown",
              buyerName: "Lisa Anderson",
              amount: "$850,000",
              date: "5 hours ago",
              link: "/admin/sales/2"
            },
            {
              id: 3,
              propertyName: "Beachfront Condo in Malibu",
              buyerName: "Robert Taylor",
              amount: "$1,500,000",
              date: "1 day ago",
              link: "/admin/sales/3"
            },
            {
              id: 4,
              propertyName: "Family Home in Suburbs",
              buyerName: "Jennifer White",
              amount: "$750,000",
              date: "2 days ago",
              link: "/admin/sales/4"
            }
          ]
        };

        setStats(dummyData);
      } catch (error) {
        showToast('Failed to load dashboard data', 'error');
        console.error('Dashboard data error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [showToast]);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, trendType }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 bg-[#F3703A]/10 rounded-lg">
          <Icon className="w-6 h-6 text-[#F3703A]" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trendType === 'up' ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`ml-1 text-sm font-medium ${trendType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trendValue}
          </span>
          <span className="ml-2 text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </motion.div>
  );

  const RecentActivityCard = ({ title, items, icon: Icon, showAmount }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.propertyName || item.name}</p>
              {showAmount && (
                <p className="text-sm font-medium text-[#F3703A] mt-1">{item.amount}</p>
              )}
              <div className="flex items-center mt-1">
                <p className="text-xs text-gray-500">{item.date}</p>
                {item.buyerName && (
                  <span className="mx-2 text-gray-300">•</span>
                )}
                {item.buyerName && (
                  <p className="text-xs text-gray-600">Buyer: {item.buyerName}</p>
                )}
              </div>
            </div>
            <Link
              to={item.link}
              className="ml-4 text-sm font-medium text-[#F3703A] hover:text-[#E65A2A] flex items-center"
            >
              View
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link
          to={title === "Recent Properties" ? "/admin/properties" : 
              title === "Recent Sellers" ? "/admin/sellers" : 
              "/admin/sales"}
          className="text-sm font-medium text-[#F3703A] hover:text-[#E65A2A] flex items-center"
        >
          View all
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3703A]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3703A] focus:border-transparent w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <HelpCircle className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#F3703A] flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="hidden md:block">
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome back, Admin!</h2>
              <p className="text-gray-600 mt-2">Here's what's happening with your platform today.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System is running smoothly</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>

        {/* Statistics Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Properties"
              value={stats.totalProperties}
              icon={Home}
              trend={true}
              trendValue="+12%"
              trendType="up"
            />
            <StatCard
              title="Total Sellers"
              value={stats.totalSellers}
              icon={Users}
              trend={true}
              trendValue="+8%"
              trendType="up"
            />
            <StatCard
              title="Total Buyers"
              value={stats.totalBuyers}
              icon={ShoppingCart}
              trend={true}
              trendValue="+15%"
              trendType="up"
            />
            <StatCard
              title="Total Sales"
              value={stats.totalSales}
              icon={BarChart3}
              trend={true}
              trendValue="+20%"
              trendType="up"
            />
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentActivityCard
              title="Recent Properties"
              items={stats.recentProperties}
              icon={Home}
            />
            <RecentActivityCard
              title="Recent Sellers"
              items={stats.recentUsers}
              icon={Users}
            />
            <RecentActivityCard
              title="Recent Sales"
              items={stats.recentSales}
              icon={ShoppingCart}
              showAmount={true}
            />
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/properties/add"
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                  <Plus className="w-6 h-6 text-[#F3703A]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-[#F3703A] transition-colors">Add Property</h4>
                  <p className="text-sm text-gray-500 mt-1">Create a new property listing</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/sellers/verify"
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                  <Shield className="w-6 h-6 text-[#F3703A]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-[#F3703A] transition-colors">Verify Sellers</h4>
                  <p className="text-sm text-gray-500 mt-1">Review seller applications</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/messages"
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-[#F3703A]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-[#F3703A] transition-colors">Messages</h4>
                  <p className="text-sm text-gray-500 mt-1">View customer inquiries</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/reports"
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                  <FileText className="w-6 h-6 text-[#F3703A]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-[#F3703A] transition-colors">Reports</h4>
                  <p className="text-sm text-gray-500 mt-1">View system reports</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Management Sections */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Property Management</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage all property listings</p>
                </div>
                <div className="p-2 sm:p-3 bg-[#F3703A]/10 rounded-lg">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3703A]" />
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Link
                  to="/admin/featured-properties"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">Featured Properties</span>
                    <p className="text-xs text-gray-500 mt-1">Manage and track featured listings</p>
                  </div>
                </Link>
                <Link
                  to="/admin/properties/add"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <Plus className="w-5 h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">Add New Property</span>
                    <p className="text-xs text-gray-500 mt-1">Create a new property listing</p>
                  </div>
                </Link>
                <Link
                  to="/admin/properties"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <List className="w-5 h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">View All Properties</span>
                    <p className="text-xs text-gray-500 mt-1">Browse and manage properties</p>
                  </div>
                </Link>
                <Link
                  to="/admin/properties/pending"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <Edit className="w-5 h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">Manage Pending Properties</span>
                    <p className="text-xs text-gray-500 mt-1">Review and approve listings</p>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Seller Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Seller Management</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage seller accounts</p>
                </div>
                <div className="p-2 sm:p-3 bg-[#F3703A]/10 rounded-lg">
                  <UserCog className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3703A]" />
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {/* <Link
                  to="/admin/seller-performance"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">Seller Performance</span>
                    <p className="text-xs text-gray-500 mt-1">Track and analyze seller metrics</p>
                  </div>
                </Link> */}
                <Link
                  to="/admin/sellers"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <List className="w-5 h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">View All Sellers</span>
                    <p className="text-xs text-gray-500 mt-1">Browse and manage sellers</p>
                  </div>
                </Link>
                <Link
                  to="/admin/sellers/verify"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <Shield className="w-5 h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">Verify Sellers</span>
                    <p className="text-xs text-gray-500 mt-1">Review and approve applications</p>
                  </div>
                </Link>
                {/* <Link
                  to="/admin/sellers/reports"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <FileText className="w-5 h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">Seller Reports</span>
                    <p className="text-xs text-gray-500 mt-1">View seller performance</p>
                  </div>
                </Link> */}
              </div>
            </motion.div>

            {/* System Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">System Management</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage system settings</p>
                </div>
                <div className="p-3 bg-[#F3703A]/10 rounded-lg">
                  <Settings className="w-5 h-5 text-[#F3703A]" />
                </div>
              </div>
              <div className="space-y-3">
                <Link
                  to="/admin/settings"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <Settings className="w-5 h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">System Settings</span>
                    <p className="text-xs text-gray-500 mt-1">Configure platform settings</p>
                  </div>
                </Link>
                <Link
                  to="/admin/messages"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-[#F3703A]/10 rounded-lg group-hover:bg-[#F3703A]/20 transition-colors">
                    <MessageSquare className="w-5 h-5 text-[#F3703A]" />
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-700 group-hover:text-[#F3703A] transition-colors">Messages & Inquiries</span>
                    <p className="text-xs text-gray-500 mt-1">Manage customer communications</p>
                  </div>
                </Link>
                
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 