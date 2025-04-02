import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Buyer Pages
import Home from '../pages/buyer/Home';
import PropertyDetails from '../pages/buyer/PropertyDetails';
import SearchResults from '../pages/buyer/SearchResults';
import SavedProperties from '../pages/buyer/SavedProperties';
import Profile from '../pages/buyer/Profile';

// Seller Pages
import SellerDashboard from '../pages/seller/SellerDashboard';
import AddProperty from '../pages/seller/AddProperty';
import ManageProperties from '../pages/seller/ManageProperties';
import SellerProfile from '../pages/seller/SellerProfile';
import SellerPublicView from '../pages/seller/SellerPublicView'; // New component for public seller view
import SellerProperties from '../pages/seller/SellerProperties'; // New component for viewing seller's properties

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageProperties from '../pages/admin/ManageProperties';
import AdminProfile from '../pages/admin/AdminProfile';

// Common Components
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/search" element={<SearchResults />} />
        
        {/* Public Seller Routes */}
        <Route path="/seller/:sellerId" element={<SellerPublicView />} />
        <Route path="/seller/:sellerId/properties" element={<SellerProperties />} />

        {/* Buyer Routes */}
        <Route
          path="/saved-properties"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <SavedProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Protected Seller Routes */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/add-property"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/manage-properties"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <ManageProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/profile"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/properties"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes; 