import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validatePassword, validateEmail, validatePhone, validateName } from '../utils/validation.js';

const router = express.Router();

// Admin login route
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify admin credentials from environment variables
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // Generate token for admin
    const token = jwt.sign(
      { 
        email: process.env.ADMIN_EMAIL,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response
    res.json({
      message: 'Admin login successful',
      token,
      user: {
        email: process.env.ADMIN_EMAIL,
        role: 'admin',
        name: 'Admin'
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
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
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

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