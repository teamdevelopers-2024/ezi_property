import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { auth } from '../services/api';
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
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        // Set auth header and user state if token/user found in storage
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(storedUser));
      } catch (error) {
         console.error("Error setting initial auth state from localStorage:", error);
         // Clear potentially corrupted state
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         setUser(null);
      }
    } else {
      // Ensure clean state if token or user is missing initially
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
    setIsLoading(false); // Initial check complete
  }, []);

  const checkAuthStatus = () => { // No longer async
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        // Verify local storage state and ensure consistency
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
           setUser(JSON.parse(storedUser));
        } catch (parseError) {
           console.error("Error parsing stored user data during check:", parseError);
           // Clear inconsistent state
           localStorage.removeItem('token');
           localStorage.removeItem('user');
           delete api.defaults.headers.common['Authorization'];
           setUser(null);
        }
      } else {
        // If token or user is missing, ensure logged-out state
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
      }
    } catch (error) {
       console.error("Error in checkAuthStatus:", error);
       // Ensure clean state on unexpected error
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       delete api.defaults.headers.common['Authorization'];
       setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Use the auth.login service
      const response = await auth.login(email.trim(), password);
      
      // If we get here, login was successful
      if (response.success && response.token && response.user) {
        // Check if the seller is approved
        if (response.user.status === 'pending') {
          return { 
            success: false, 
            message: 'Your account is pending approval. Please wait for admin confirmation.' 
          };
        }

        // Store the authentication data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        return { success: true };
      }

      return { 
        success: false, 
        message: 'Login failed. Please try again.' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please try again.'
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
    localStorage.removeItem('user');
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