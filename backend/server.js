import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true
};

console.log('Setting up CORS with options:', corsOptions);
app.use(cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  
  // Log request details
  console.log('\n=== Incoming Request ===');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('======================\n');

  // Intercept response to log it
  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - startTime;
    console.log('\n=== Outgoing Response ===');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response Time: ${responseTime}ms`);
    console.log('Response Data:', data);
    console.log('========================\n');
    
    originalSend.call(this, data);
  };

  next();
});

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection with detailed logging
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('\n=== Database Connection ===');
    console.log('Successfully connected to MongoDB');
    console.log('Database URI:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//[hidden]:[hidden]@'));
    console.log('=========================\n');
  })
  .catch(err => {
    console.error('\n=== Database Error ===');
    console.error('MongoDB connection error:', err);
    console.error('=====================\n');
  });

// Routes with logging
console.log('\n=== Setting up Routes ===');
app.use('/api/auth', (req, res, next) => {
  console.log(`Auth route accessed: ${req.method} ${req.url}`);
  next();
}, authRoutes);

app.use('/api/properties', (req, res, next) => {
  console.log(`Properties route accessed: ${req.method} ${req.url}`);
  next();
}, propertyRoutes);

// Admin routes with detailed logging - mounted before user routes
app.use('/api/admin', (req, res, next) => {
  console.log(`Admin route accessed: ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  console.log('Request params:', req.params);
  next();
}, adminRoutes);

app.use('/api/users', (req, res, next) => {
  console.log(`Users route accessed: ${req.method} ${req.url}`);
  next();
}, userRoutes);

console.log('Routes setup completed');
console.log('=====================\n');

// Error handling middleware with detailed logging
app.use((err, req, res, next) => {
  console.error('\n=== Error Handler ===');
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  console.error('===================\n');
  
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    errors: err.errors || {}
  });
});

// 404 handler with logging
app.use((req, res) => {
  console.log('\n=== 404 Not Found ===');
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  console.log('===================\n');
  
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Start server with environment info
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n=== Server Started ===');
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('===================\n');
}); 