import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages
import SellerLogin from "../pages/auth/SellerLogin";
import AdminLogin from "../pages/auth/AdminLogin";
import SellerRegister from '../pages/auth/SellerRegister';
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
import VerifySellers from '../pages/admin/VerifySellers';
import PendingProperties from '../pages/admin/PendingProperties';
import AdminProfile from "../pages/admin/AdminProfile";

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
  const { loading } = useAuth();
  const token = localStorage.getItem('token');
  let user = localStorage.getItem("user")
  user = JSON.parse(user)
  console.log(user , "coming here from protected route")

  if (loading) {
    return <div>Loading...</div>;
  }

  // For admin routes, check both token and user object
  if (roles.includes('admin')) {
    if (!token) {
      return <Navigate to="/admin/login" replace />;
    }
    
    // If we have a token but no user object, we need to check auth status
    if (!user) {
      // We'll let the component render and let the auth context handle the check
      return children;
    }
    
    return children;
  }

  // For other routes, check user object as before
  if (!user) {
    console.log(user,"coming here from protected route")
    // Only redirect if we're not already on a login page
    const isLoginPage = window.location.pathname === '/seller/login';
    if (!isLoginPage) {
      console.log("coming here from protected route")
      return <Navigate to="/seller/login" replace />;
    }
    return null;
  }
  console.log(roles,user,"this is roles here from protected route")
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function LayoutRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/seller/:id" element={<SellerPublicView />} />

      {/* Auth Routes */}
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/seller/register" element={<SellerRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Routes - Now nested under AdminLayout */}
      <Route 
          path="/admin" 
          element={
              <ProtectedRoute roles={["admin"]}>
                  <AdminLayout />
              </ProtectedRoute>
          }
      >
          {/* Redirect /admin to /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} /> 
          <Route path="dashboard" element={<AdminDashboard />}/>
          <Route path="reports" element={<Reports />} />
          <Route path="properties" element={<PropertyList />} />
          <Route path="properties/add" element={<AddProperty />} />
          <Route path="properties/edit/:id" element={<EditProperty />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="featured-properties" element={<FeaturedProperties />} />
          <Route path="seller-performance" element={<SellerPerformance />} />
          <Route path="verify-sellers" element={<VerifySellers />} /> 
          <Route path="properties/pending" element={<PendingProperties />} />
          <Route path="profile" element={<AdminProfile />} /> 
      </Route>

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
  );
}

export default LayoutRoutes;
