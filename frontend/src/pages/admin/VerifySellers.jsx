import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
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
      const response = await admin.getSellerRegistrations();
      setPendingSellers(response.filter(seller => seller.status === 'pending'));
    } catch (error) {
      console.error('Error fetching pending sellers:', error);
      showToast('Failed to load pending seller registrations', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle seller approval/rejection
  const handleSellerAction = async (sellerId, action, rejectionReason = '') => {
    try {
      await admin.updateSellerRegistration(sellerId, action, rejectionReason);
      showToast(`Seller ${action === 'approve' ? 'approved' : 'rejected'} successfully`, 'success');
      fetchPendingSellers(); // Refresh the list
    } catch (error) {
      console.error('Error updating seller status:', error);
      showToast('Failed to update seller status', 'error');
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
          <p className="text-gray-500">No pending seller registrations at the moment.</p>
        ) : (
          <div className="space-y-4">
            {pendingSellers.map((seller) => (
              <motion.div
                key={seller.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{seller.name}</p>
                  <p className="text-sm text-gray-500">{seller.email}</p>
                  {seller.phone && (
                    <p className="text-sm text-gray-500">{seller.phone}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSellerAction(seller.id, 'approve')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleSellerAction(seller.id, 'reject')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
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