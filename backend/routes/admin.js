import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all users (sellers, buyers, etc.)
router.get('/users', auth, async (req, res) => {
  try {
    // Verify admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    // Fetch all users, excluding passwords
    // You might want to add pagination here for large user bases
    const users = await User.find({}).select('-password');

    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ 
      message: 'Failed to fetch users',
      error: error.message 
    });
  }
});

// Get all pending seller registrations
router.get('/seller-registrations', auth, async (req, res) => {
  console.log('[Route /seller-registrations] req.user received:', req.user);
  try {
    // Verify admin role
    if (req.user.role !== 'admin') {
      console.log(`[Route /seller-registrations] Role check failed. Expected 'admin', got '${req.user.role}'`);
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const pendingRegistrations = await User.find({
      role: 'seller',
      registrationStatus: 'pending'
    }).select('-password');
    console.log('[Route /seller-registrations] Pending registrations:', pendingRegistrations);
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

// Update user status
router.patch('/users/:userId', auth, async (req, res) => {
  try {
    // Verify admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { userId } = req.params;
    const { status, isApproved } = req.body;

    console.log('Updating user status:', { userId, status, isApproved });

    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use "active" or "suspended".' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user status
    user.status = status;
    if (isApproved !== undefined) {
      user.isApproved = isApproved;
    }

    await user.save();

    res.json({
      message: 'User status updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ 
      message: 'Failed to update user status',
      error: error.message 
    });
  }
});

// Delete user
router.delete('/users/:userId', auth, async (req, res) => {
  try {
    // Verify admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      message: 'Failed to delete user',
      error: error.message 
    });
  }
});

export default router; 