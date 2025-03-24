import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await auth.getCurrentUser();
        setUser(userData);
        setError(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError(error.message || 'Failed to verify authentication');
      auth.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const { user: userData, token } = await auth.login(email, password);
      localStorage.setItem('token', token);
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const { user: newUser, token } = await auth.register(userData);
      localStorage.setItem('token', token);
      setUser(newUser);
      return newUser;
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 