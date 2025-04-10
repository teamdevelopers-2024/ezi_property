import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
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
  Star,
  UserPlus,
  CheckCircle,
  XCircle,
  User,
  UserCheck,
  ChevronRight,
  Building,
  DollarSign
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api, { admin, properties } from '../../services/api';
import Spinner from '../../components/common/Spinner';

const StatCard = ({ title, value, icon: Icon, change }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const targetValue = typeof value === 'number' ? value : 0;
    if (displayValue !== targetValue) {
      const animation = animate(displayValue, targetValue, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return animation.stop;
    }
  }, [value, displayValue]);

  const hasChange = change !== undefined && change !== null;
  const isPositive = hasChange && change >= 0;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}}
      whileHover={{ 
          scale: 1.04, 
          boxShadow: '0px 20px 30px -10px rgba(0, 0, 0, 0.15)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
      }}
      className="relative overflow-hidden rounded-2xl 
                 bg-white/60 backdrop-blur-lg 
                 border border-white/30 
                 shadow-xl shadow-gray-900/5
                 p-6 transition-all duration-300 group"
    >
       <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                     bg-[radial-gradient(closest-side,#D4AF3730,transparent)] pointer-events-none"></div>
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">{title}</p>
          <p className="text-3xl font-bold text-[#0A192F] tracking-tight">{displayValue.toLocaleString()}</p> 
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10 border border-white/20 shadow-inner transition-all duration-300">
          {Icon && <Icon className="w-6 h-6 text-[#B8860B]" />} 
        </div>
      </div>
      {hasChange && (
        <div className="mt-3 flex items-center text-xs">
          <span className={`flex items-center font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {Math.abs(change)}%
          </span>
          <span className="ml-2 text-gray-500">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

const ContentPanel = ({ children, className = "", title, viewAllLink }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}}
    className={`bg-white/50 backdrop-blur-md rounded-2xl 
                border border-white/20 shadow-lg shadow-gray-900/5 
                p-6 ${className}`}
  >
    {(title || viewAllLink) && (
      <div className="flex justify-between items-center mb-5 border-b border-black/5 pb-3">
        {title && <h3 className="text-lg font-semibold text-[#0A192F]">{title}</h3>}
        {viewAllLink && (
          <Link to={viewAllLink} className="text-sm font-medium text-[#C09B2D] hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    )}
    {children}
  </motion.div>
);

const AdminDashboard = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalProperties: 0,
    pendingProperties: 0,
    totalSellers: 0,
    pendingSellers: 0,
  });
  const [pendingSellersData, setPendingSellersData] = useState([]);
  const [pendingPropertiesData, setPendingPropertiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      console.log('[AdminDashboard] Fetching dashboard stats');
      
      // Fetch all required data in parallel
      const [allProperties, pendingProps, allSellers, pendingSellers] = await Promise.all([
        properties.getAll(),
        properties.getPending(),
        admin.getSellerRegistrations(), // This gets all sellers
        admin.getSellerRegistrations().then(sellers => 
          sellers.filter(s => s.registrationStatus === 'pending')
        )
      ]);

      // Update stats with real data
      setStats({
        totalProperties: allProperties.length,
        pendingProperties: pendingProps.length,
        totalSellers: allSellers.length,
        pendingSellers: pendingSellers.length
      });

      console.log('[AdminDashboard] Stats updated with real data');
    } catch (error) {
      console.error('[AdminDashboard] Error fetching stats:', error);
      showToast('Failed to load dashboard statistics', 'error');
    }
  };

  const fetchPendingSellers = async () => {
    try {
      console.log('[AdminDashboard] Fetching pending sellers');
      const sellers = await admin.getSellerRegistrations();
      const pendingSellers = sellers.filter(s => s.registrationStatus === 'pending');
      setPendingSellersData(pendingSellers);
    } catch (error) {
      console.error('[AdminDashboard] Error fetching pending sellers:', error);
      showToast('Failed to load pending seller registrations', 'error');
      setPendingSellersData([]);
    }
  };

  const fetchPendingProperties = async () => {
    try {
      console.log('[AdminDashboard] Fetching pending properties');
      const pendingProps = await properties.getPending();
      setPendingPropertiesData(pendingProps);
    } catch (error) {
      console.error('[AdminDashboard] Error fetching pending properties:', error);
      showToast('Failed to load pending properties', 'error');
      setPendingPropertiesData([]);
    }
  };

  const handleSellerAction = async (sellerId, action) => {
    try {
      console.log(`[AdminDashboard] ${action}ing seller ${sellerId}`);
      await admin.updateSellerRegistration(sellerId, action);
      showToast(`Seller ${action}ed successfully`, 'success');
      
      // Refresh both the pending sellers list and dashboard stats
      await Promise.all([
        fetchPendingSellers(),
        fetchDashboardStats()
      ]);
    } catch (error) {
      console.error(`[AdminDashboard] Error ${action}ing seller:`, error);
      showToast(`Failed to ${action} seller`, 'error');
    }
  };

  const handlePropertyAction = async (propertyId, action) => {
    try {
      console.log(`[AdminDashboard] ${action}ing property ${propertyId}`);
      await properties.updateStatus(propertyId, action);
      showToast(`Property ${action}ed successfully`, 'success');
      
      // Refresh both the pending properties list and dashboard stats
      await Promise.all([
        fetchPendingProperties(),
        fetchDashboardStats()
      ]);
    } catch (error) {
      console.error(`[AdminDashboard] Error ${action}ing property:`, error);
      showToast(`Failed to ${action} property`, 'error');
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    console.log("[AdminDashboard] Fetching all dashboard data...");
    try {
      await Promise.all([
        fetchDashboardStats(),
        fetchPendingSellers(),
        fetchPendingProperties()
      ]);
    } catch (error) {
      console.error('[AdminDashboard] Error during initial data fetch:', error);
      showToast('Could not load all dashboard data', 'warning');
    } finally {
      setIsLoading(false);
      console.log("[AdminDashboard] Finished fetching all data.");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-140px)]"> 
          <Spinner size="lg" />
        </div>
      ) : (
        <motion.div 
          className="space-y-8" 
          initial="hidden" 
          animate="visible"
          variants={{ 
              hidden: {}, 
              visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            <StatCard title="Total Properties" value={stats.totalProperties} icon={Building} change={5.2} />
            <StatCard title="Pending Properties" value={stats.pendingProperties} icon={Home} change={-1.5}/>
            <StatCard title="Active Sellers" value={stats.totalSellers} icon={Users} change={10.8}/>
            <StatCard title="Pending Sellers" value={stats.pendingSellers} icon={UserCheck} change={0}/>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
             <ContentPanel title="Pending Seller Approvals" viewAllLink="/admin/verify-sellers">
                {pendingSellersData.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4 text-center">No pending sellers.</p>
                ) : (
                  <ul className="divide-y divide-gray-200/50">
                    {pendingSellersData.slice(0, 3).map(seller => (
                      <li key={seller.id || seller._id} className="flex items-center justify-between py-3.5 group transition-colors duration-150">
                        <div>
                          <p className="font-medium text-gray-800 text-sm group-hover:text-[#0A192F] transition-colors">{seller.name}</p>
                          <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">{seller.email}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleSellerAction(seller.id || seller._id, 'approve')} className="p-1.5 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-100/50 rounded-full transition-colors" title="Approve"><CheckCircle className="w-4 h-4" /></motion.button>
                          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleSellerAction(seller.id || seller._id, 'reject')} className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100/50 rounded-full transition-colors" title="Reject"><XCircle className="w-4 h-4" /></motion.button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
             </ContentPanel>

             <ContentPanel title="Pending Property Approvals" viewAllLink="/admin/properties">
                 {pendingPropertiesData.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4 text-center">No pending properties.</p>
                ) : (
                   <ul className="divide-y divide-gray-200/50">
                    {pendingPropertiesData.slice(0, 3).map(prop => (
                      <li key={prop.id || prop._id} className="flex items-center justify-between py-3.5 group transition-colors duration-150">
                        <div>
                          <p className="font-medium text-gray-800 text-sm group-hover:text-[#0A192F] transition-colors">{prop.title}</p>
                          <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">Seller: {prop.seller?.name || 'N/A'}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handlePropertyAction(prop.id || prop._id, 'approve')} className="p-1.5 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-100/50 rounded-full transition-colors" title="Approve"><CheckCircle className="w-4 h-4" /></motion.button>
                          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handlePropertyAction(prop.id || prop._id, 'reject')} className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100/50 rounded-full transition-colors" title="Reject"><XCircle className="w-4 h-4" /></motion.button>
                        </div>
                      </li>
                    ))}
                   </ul>
                 )}
             </ContentPanel>
          </motion.div>

           <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
              <ContentPanel title="Recent Property Listings" className="flex flex-col items-center justify-center text-gray-600 min-h-[300px]">
                 <List className="w-16 h-16 text-gray-300 mb-4 opacity-70"/>
                 <p className="text-sm text-center">Advanced property table placeholder.</p>
                 <p className="text-xs text-gray-400 text-center mt-1">Filters, sorting, and actions coming soon.</p>
              </ContentPanel>
           </motion.div>

        </motion.div> 
      )}
    </React.Fragment>
  );
};

export default AdminDashboard; 