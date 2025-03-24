import axios from 'axios';
import { getErrorMessage } from '../utils/errorHandler';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
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
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Login failed. Please try again.'
      };
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

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject({
          message: 'Request timed out. Please check your connection and try again.'
        });
      }
      return Promise.reject({
        message: 'Network error. Please check your internet connection.'
      });
    }

    // Handle specific status codes
    switch (error.response.status) {
      case 401:
        // Handle unauthorized access
        auth.logout();
        window.location.href = '/login';
        return Promise.reject({
          message: 'Your session has expired. Please log in again.'
        });
      case 403:
        return Promise.reject({
          message: 'You do not have permission to perform this action.'
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
          message: getErrorMessage(error)
        });
    }
  }
);

export default api;
