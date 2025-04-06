import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Verify that the user is a seller
      if (user.role !== 'seller') {
        throw new Error('Access denied. This login is for sellers only.');
      }
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      return user;
    } catch (error) {
      // Remove any existing token on error
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);

      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      } else if (error.message.includes('Access denied')) {
        throw new Error(error.message);
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Login failed. Please try again.');
      }
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await api.post('/auth/admin/login', { email, password });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // For admin, we don't need to set the user state as it's handled by environment variables
      return { success: true };
    } catch (error) {
      // Remove any existing token on error
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];

      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Admin login failed. Please try again.');
      }
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', { ...userData, role: 'seller' });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    showToast('Logged out successfully', 'success');
  };

  const value = {
    user,
    isLoading,
    login,
    adminLogin,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 