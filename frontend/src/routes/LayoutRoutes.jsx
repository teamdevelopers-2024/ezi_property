import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import { useAuth } from "../contexts/AuthContext";

// Auth Pages
import Login from "../pages/auth/Login";
import AdminLogin from "../pages/auth/AdminLogin";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import Reports from "../pages/admin/Reports";
import PropertyList from "../pages/admin/PropertyList";
import AddProperty from "../pages/admin/AddProperty";
import EditProperty from "../pages/admin/EditProperty";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSettings from "../pages/admin/AdminSettings";
import FeaturedProperties from '../pages/admin/FeaturedProperties';
import SellerPerformance from '../pages/admin/SellerPerformance';

// Seller Pages
import SellerDashboard from "../pages/seller/Dashboard";
import SellerProperties from "../pages/seller/SellerProperties";
import SellerPublicView from "../pages/seller/SellerPublicView";
import SellerAddProperty from "../pages/seller/AddProperty";
import SellerManageProperties from "../pages/seller/ManageProperties";
import SellerProfile from "../pages/seller/SellerProfile";

// Buyer Pages
import Home from "../pages/buyer/Home";
import PropertyDetails from "../pages/buyer/PropertyDetails";
import SearchResults from "../pages/buyer/SearchResults";
import SavedProperties from "../pages/buyer/SavedProperties";
import Profile from "../pages/buyer/Profile";

// Misc Pages
import NotFound from "../pages/misc/NotFound";
import About from "../pages/misc/About";

// Onboarding Page
import Onboarding from "../pages/Onboarding";

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem('token');

  if (loading) {
    return <div>Loading...</div>;
  }

  // For admin routes, check token instead of user object
  if (roles.includes('admin')) {
    if (!token) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  }

  // For other routes, check user object as before
  if (!user) {
    // Only redirect if we're not already on a login page
    const isLoginPage = window.location.pathname === '/login';
    if (!isLoginPage) {
      return <Navigate to="/login" replace />;
    }
    return null;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function LayoutRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/seller/:id" element={<SellerPublicView />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/properties"
          element={
            <ProtectedRoute roles={["admin"]}>
              <PropertyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/properties/add"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/properties/edit/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <EditProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/featured-properties"
          element={
            <ProtectedRoute roles={["admin"]}>
              <FeaturedProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/seller-performance"
          element={
            <ProtectedRoute roles={["admin"]}>
              <SellerPerformance />
            </ProtectedRoute>
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/properties"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/properties/add"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerAddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/manage-properties"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerManageProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/profile"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerProfile />
            </ProtectedRoute>
          }
        />

        {/* Buyer Routes */}
        <Route
          path="/saved-properties"
          element={
            <ProtectedRoute roles={["buyer"]}>
              <SavedProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["buyer"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default LayoutRoutes;
