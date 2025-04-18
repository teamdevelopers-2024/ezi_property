import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validatePassword, validateEmail, validatePhone, validateName } from '../utils/validation.js';

const router = express.Router();

// Admin login route
router.post('/admin/login', async (req, res) => {
  console.log('\n=== Admin Login Attempt ===');
  console.log('Time:', new Date().toISOString());
  console.log('Request Body:', {
    email: req.body.email,
    password: '********' // Hide password in logs
  });
  
  try {
    const { email, password } = req.body;
    
    // Verify admin credentials from environment variables
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      console.log('Admin login failed: Invalid credentials');
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    console.log('Admin credentials verified successfully');

    // Generate token for admin
    const token = jwt.sign(
      { 
        userId: 'admin',
        email: process.env.ADMIN_EMAIL,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Admin token generated successfully');

    // Return success response
    const response = {
      message: 'Admin login successful',
      token,
      user: {
        id: 'admin',
        email: process.env.ADMIN_EMAIL,
        role: 'admin',
        name: 'Admin'
      }
    };

    console.log('Sending admin login response');
    console.log('========================\n');
    
    res.json(response);

  } catch (error) {
    console.error('\n=== Admin Login Error ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    console.error('========================\n');
    
    res.status(500).json({ 
      message: 'Admin login failed',
      error: error.message 
    });
  }
});

// Register route (for sellers only)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;

    // Validate all fields
    const errors = {};
    
    // Name validation
    const nameError = validateName(name);
    if (nameError) errors.name = nameError;

    // Email validation
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    // Phone validation
    const phoneError = validatePhone(phone);
    if (phoneError) errors.phone = phoneError;

    // Password validation
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors.join('. ');
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // If there are any validation errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: 'Email already registered' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phoneNumber: phone
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response with token
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed',
      error: error.message 
    });
  }
});

// Login route (for sellers only)
router.post('/seller/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password first
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify user is a seller
    if (user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied. Seller account required.' });
    }

    // Check if seller is approved
    if (!user.isApproved || user.registrationStatus !== 'approved') {
      return res.status(403).json({ 
        message: 'Your account is pending approval. Please wait for admin approval.',
        status: user.registrationStatus
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log("coming here from login route")
    // Return success response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });


  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Login failed',
      error: error.message 
    });
  }
});

export default router; 