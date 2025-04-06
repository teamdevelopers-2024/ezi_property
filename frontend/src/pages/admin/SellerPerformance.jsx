import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Star, 
  MessageSquare,
  DollarSign,
  Clock,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

const SellerPerformance = () => {
  const { showToast } = useToast();
  const [sellers, setSellers] = useState([
    {
      _id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      rating: 4.8,
      performance: 92,
      totalProperties: 15,
      totalRevenue: 4500000,
      responseRate: 95,
      avgResponseTime: '2h 15m',
      trends: {
        properties: [10, 12, 15],
        revenue: [3000000, 3800000, 4500000],
        responseRate: [90, 92, 95],
        responseTime: ['3h', '2h 30m', '2h 15m']
      }
    },
    {
      _id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      rating: 4.6,
      performance: 88,
      totalProperties: 12,
      totalRevenue: 3800000,
      responseRate: 92,
      avgResponseTime: '3h 30m',
      trends: {
        properties: [8, 10, 12],
        revenue: [2500000, 3200000, 3800000],
        responseRate: [88, 90, 92],
        responseTime: ['4h', '3h 45m', '3h 30m']
      }
    },
    {
      _id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      rating: 4.9,
      performance: 95,
      totalProperties: 20,
      totalRevenue: 6200000,
      responseRate: 98,
      avgResponseTime: '1h 45m',
      trends: {
        properties: [15, 18, 20],
        revenue: [4500000, 5400000, 6200000],
        responseRate: [95, 97, 98],
        responseTime: ['2h', '1h 50m', '1h 45m']
      }
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'performance',
    sortOrder: 'desc',
    timeRange: 'month'
  });

  useEffect(() => {
    fetchSellerPerformance();
  }, [filters]);

  const fetchSellerPerformance = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/sellers/performance', {
        params: filters
      });
      setSellers(response.data);
    } catch (error) {
      showToast('Failed to fetch seller performance data', 'error');
      console.error('Error fetching seller performance:', error);
    } finally {
      setLoading(false);
    }
  };

  const SellerCard = ({ seller }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{seller.name}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              seller.rating >= 4.5 ? 'bg-green-100 text-green-800' : 
              seller.rating >= 3.5 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {seller.rating.toFixed(1)} ★
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{seller.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${
            seller.performance >= 80 ? 'text-green-600' : 
            seller.performance >= 60 ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {seller.performance}%
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{seller.properties}</p>
            <p className="text-xs text-gray-500">Properties</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">${seller.revenue.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Revenue</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{seller.responseRate}%</p>
            <p className="text-xs text-gray-500">Response Rate</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{seller.avgResponseTime}</p>
            <p className="text-xs text-gray-500">Avg. Response</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Performance Trend</span>
          <span>{seller.trend}%</span>
        </div>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              seller.trend >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.abs(seller.trend)}%` }}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Seller Performance</h1>
            <p className="text-gray-600 mt-1">Track and analyze seller performance metrics</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sellers..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3703A] focus:border-transparent w-64"
              />
            </div>
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3703A] focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button
              onClick={() => setFilters({
                ...filters,
                sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
              })}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3703A]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sellers.map((seller) => (
              <SellerCard key={seller._id} seller={seller} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerPerformance; 