import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { properties } from '../../services/api';
import Spinner from '../../components/common/Spinner';

const PendingProperties = () => {
  const { showToast } = useToast();
  const [pendingProperties, setPendingProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch pending properties
  const fetchPendingProperties = async () => {
    try {
      const response = await properties.getPending();
      setPendingProperties(response);
    } catch (error) {
      console.error('Error fetching pending properties:', error);
      showToast('Failed to load pending properties', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle property approval/rejection
  const handlePropertyAction = async (propertyId, action) => {
    try {
      await properties.updateStatus(propertyId, action);
      showToast(`Property ${action === 'approve' ? 'approved' : 'rejected'} successfully`, 'success');
      fetchPendingProperties(); // Refresh the list
    } catch (error) {
      console.error('Error updating property status:', error);
      showToast('Failed to update property status', 'error');
    }
  };

  useEffect(() => {
    fetchPendingProperties();
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Pending Properties</h1>
        
        {pendingProperties.length === 0 ? (
          <p className="text-gray-500">No pending properties at the moment.</p>
        ) : (
          <div className="space-y-4">
            {pendingProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-[#F3703A]/10 rounded-lg mr-4">
                    <Home className="w-6 h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-sm text-gray-500">Listed by: {property.seller.name}</p>
                    <p className="text-sm text-gray-500">Price: ${property.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePropertyAction(property.id, 'approve')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handlePropertyAction(property.id, 'reject')}
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

export default PendingProperties; 