import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[Auth Middleware] Decoded Token:', decoded); // Log decoded token

    // Check if the token represents the admin user
    if (decoded.role === 'admin') {
      // For admin, construct user object from token payload (no DB lookup)
      req.user = {
        // Simulate a user object structure expected by subsequent middleware/routes
        // Ensure it includes the properties needed, especially 'role'
        _id: 'admin_user', // Placeholder ID
        email: decoded.email,
        role: decoded.role,
        name: 'Admin' // Or derive from token if added there
      };
      console.log('[Auth Middleware] Admin user constructed:', req.user); // Log constructed admin user
    } else {
      // For regular users, find user in database using userId from token
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        // User ID from token not found in DB
        return res.status(401).json({ message: 'User associated with token not found' });
      }
      req.user = user; // Attach database user object
      console.log('[Auth Middleware] DB user attached:', req.user); // Log attached DB user
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle errors like invalid/expired token
    // Log the specific error for debugging if needed
    console.error("Auth middleware error:", error.name, error.message);
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
}; 