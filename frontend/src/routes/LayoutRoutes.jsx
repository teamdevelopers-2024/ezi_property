import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

// Example imports (adjust paths to match your project):
import Home from "../pages/buyer/Home";
import About from "../pages/misc/About";
import AdminDashboard from "../pages/admin/Dashboard";
import SellerDashboard from "../pages/seller/Dashboard";
import NotFound from "../pages/misc/NotFound"; // 404 fallback page
import LoginPage from "../pages/auth/Login";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Replace this with your actual auth logic
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function LayoutRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Seller Routes */}
        <Route
          path="/seller/*"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for unknown routes (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default LayoutRoutes;
