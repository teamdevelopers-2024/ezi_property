import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all pending seller registrations
router.get('/seller-registrations', auth, async (req, res) => {
  try {
    // Verify admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const pendingRegistrations = await User.find({
      role: 'seller',
      registrationStatus: 'pending'
    }).select('-password');

    res.json(pendingRegistrations);
  } catch (error) {
    console.error('Error fetching pending registrations:', error);
    res.status(500).json({ 
      message: 'Failed to fetch pending registrations',
      error: error.message 
    });
  }
});

// Approve or reject seller registration
router.patch('/seller-registrations/:userId', auth, async (req, res) => {
  try {
    // Verify admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { userId } = req.params;
    const { action, rejectionReason } = req.body;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action. Use "approve" or "reject".' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'seller') {
      return res.status(400).json({ message: 'User is not a seller' });
    }

    // Update user status
    user.registrationStatus = action === 'approve' ? 'approved' : 'rejected';
    user.isApproved = action === 'approve';
    if (action === 'reject' && rejectionReason) {
      user.rejectionReason = rejectionReason;
    }

    await user.save();

    res.json({
      message: `Seller registration ${action}d successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        registrationStatus: user.registrationStatus,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    console.error('Error updating registration status:', error);
    res.status(500).json({ 
      message: 'Failed to update registration status',
      error: error.message 
    });
  }
});

export default router; 