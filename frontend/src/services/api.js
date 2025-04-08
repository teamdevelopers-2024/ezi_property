import axios from 'axios';
import { getErrorMessage } from '../utils/errorHandler';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject({
    message: 'Failed to prepare request. Please try again.'
  });
});

// Authentication APIs
export const auth = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/seller/login', { email, password });
      return {
        success: true,
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      // Let the response interceptor handle the error
      return Promise.reject(error);
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      };
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberedEmail');
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw {
        message: 'Failed to get user information. Please try again.'
      };
    }
  },
};

// Property APIs
export const properties = {
  getAll: async (filters = {}) => {
    const response = await api.get('/properties', { params: filters });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },
  create: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },
  update: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },
  getPending: async () => {
    try {
      const response = await api.get('/properties/pending');
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch pending properties'
      };
    }
  },
  updateStatus: async (propertyId, status) => {
    try {
      const response = await api.patch(`/properties/${propertyId}/status`, { status });
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to update property status'
      };
    }
  }
};

// User APIs
export const users = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

// Admin APIs
export const admin = {
  getSellerRegistrations: async () => {
    try {
      const response = await api.get('/admin/seller-registrations');
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch seller registrations'
      };
    }
  },

  updateSellerRegistration: async (userId, action, rejectionReason) => {
    try {
      const response = await api.patch(`/admin/seller-registrations/${userId}`, {
        action,
        rejectionReason
      });
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to update seller registration'
      };
    }
  }
};

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Response interceptor error:', error);
    
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Unable to connect to the server. Please check your internet connection.'
      });
    }

    // Handle specific status codes
    switch (error.response.status) {
      case 401:
        // Check if it's a login attempt
        const isLoginAttempt = error.config.url.includes('/auth/seller/login') || 
                             error.config.url.includes('/auth/admin/login');
        
        if (isLoginAttempt) {
          const errorMessage = error.response.data?.message?.toLowerCase() || '';
          
          // Check for specific error messages
          if (errorMessage.includes('user not found') || 
              errorMessage.includes('no user') || 
              errorMessage.includes('not found') ||
              errorMessage.includes('does not exist')) {
            return Promise.reject({
              message: 'User does not exist with this email address'
            });
          }
          
          // For password errors
          return Promise.reject({
            message: 'Email or password is incorrect'
          });
        }
        
        // For other 401 errors (session expired), clear auth and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        const isAdminRoute = window.location.pathname.startsWith('/admin');
        window.location.href = isAdminRoute ? '/admin/login' : '/seller/login';
        return Promise.reject({
          message: 'Your session has expired. Please log in again.'
        });

      case 403:
        return Promise.reject({
          message: error.response.data?.message || 'You do not have permission to perform this action.'
        });

      case 404:
        // For login attempts, treat 404 as user not found
        if (error.config.url.includes('/auth/seller/login')) {
          return Promise.reject({
            message: 'User does not exist with this email address'
          });
        }
        return Promise.reject({
          message: error.response.data?.message || 'Resource not found.'
        });

      case 429:
        return Promise.reject({
          message: 'Too many requests. Please wait a moment and try again.'
        });

      case 500:
        return Promise.reject({
          message: 'Server error. Please try again later.'
        });

      default:
        return Promise.reject({
          message: error.response.data?.message || 'An unexpected error occurred. Please try again.'
        });
    }
  }
);

export default api;
