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
      // Check if we have a token but the auth check failed
      const token = localStorage.getItem('token');
      if (token) {
        // If we have a token but the auth check failed, we might be an admin
        // Let's try to check admin status
        try {
          const adminResponse = await api.get('/auth/admin/me');
          setUser(adminResponse.data || { role: 'admin' });
          return;
        } catch (adminError) {
          // If admin check also fails, clear the token
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      // Format the request data properly
      const requestData = {
        email: email.trim(),
        password: password
      };
      
      const response = await api.post('/auth/seller/login', requestData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return { success: true };
      }
      return { success: false, message: 'Login failed. Please try again.' };
    } catch (error) {
      // For 401 errors (wrong credentials), return a specific message
      if (error.response?.status === 401) {
        return { 
          success: false, 
          message: 'Invalid email or password'
        };
      }
      // For other errors, return the server message or a generic one
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    try {
      setIsLoading(true);
      // Format the request data properly
      const requestData = {
        email: email.trim(),
        password: password
      };
      
      const response = await api.post('/auth/admin/login', requestData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return { success: true };
      }
      return { success: false, message: 'Admin login failed. Please try again.' };
    } catch (error) {
      // For 401 errors (wrong credentials), return a specific message
      if (error.response?.status === 401) {
        return { 
          success: false, 
          message: 'Invalid email or password'
        };
      }
      // For other errors, return the server message or a generic one
      return { 
        success: false, 
        message: error.response?.data?.message || 'Admin login failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      // Format the registration data properly
      const requestData = {
        name: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password,
        confirmPassword: userData.password,
        phone: userData.phone.trim(),
        role: 'seller'  // Ensure role is set to seller
      };
      
      const response = await api.post('/auth/register', requestData);
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