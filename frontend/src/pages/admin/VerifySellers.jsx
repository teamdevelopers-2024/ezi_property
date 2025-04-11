import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, User, UserCheck, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { admin } from '../../services/api';
import Spinner from '../../components/common/Spinner';

const VerifySellers = () => {
  const { showToast } = useToast();
  const [pendingSellers, setPendingSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch pending sellers
  const fetchPendingSellers = async () => {
    try {
      console.log('[VerifySellers] Fetching pending sellers');
      const sellers = await admin.getSellerRegistrations();
      const pendingSellers = sellers.filter(s => s.registrationStatus === 'pending');
      setPendingSellers(pendingSellers);
    } catch (error) {
      console.error('[VerifySellers] Error fetching pending sellers:', error);
      showToast('Failed to load pending seller registrations', 'error');
      setPendingSellers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle seller approval/rejection
  const handleSellerAction = async (sellerId, action) => {
    try {
      console.log(`[VerifySellers] ${action}ing seller ${sellerId}`);
      await admin.updateSellerRegistration(sellerId, action);
      showToast(`Seller ${action}ed successfully`, 'success');
      fetchPendingSellers(); // Refresh the list
    } catch (error) {
      console.error(`[VerifySellers] Error ${action}ing seller:`, error);
      showToast(`Failed to ${action} seller`, 'error');
    }
  };

  useEffect(() => {
    fetchPendingSellers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/admin/dashboard"
          className="flex items-center text-gray-600 hover:text-[#F3703A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Verify Sellers</h1>
        
        {pendingSellers.length === 0 ? (
          <div className="text-center py-12">
            <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No pending seller registrations at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingSellers.map((seller) => (
              <motion.div
                key={seller._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F3703A] to-[#E35D2A] flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{seller.name}</p>
                    <p className="text-sm text-gray-500">{seller.email}</p>
                    {seller.phoneNumber && (
                      <p className="text-sm text-gray-500">{seller.phoneNumber}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSellerAction(seller._id, 'approve')}
                    className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleSellerAction(seller._id, 'reject')}
                    className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifySellers; 