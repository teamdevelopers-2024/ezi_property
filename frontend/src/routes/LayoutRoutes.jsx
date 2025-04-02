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
import AdminDashboard from "../pages/admin/Dashboard";
import Reports from "../pages/admin/Reports";
import ManageProperties from "../pages/admin/ManageProperties";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSettings from "../pages/admin/AdminSettings";

// Seller Pages
import SellerDashboard from "../pages/seller/Dashboard";
import SellerProperties from "../pages/seller/SellerProperties";
import SellerPublicView from "../pages/seller/SellerPublicView";
import AddProperty from "../pages/seller/AddProperty";
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={roles.includes('admin') ? '/admin/login' : '/login'} replace />;
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
              <ManageProperties />
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
              <AddProperty />
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
