// src/routes/ProtectedRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

// This is a simple JWT check
const isAuthenticated = () => {
  const token = localStorage.getItem("jwt_token"); // adjust key if needed
  return !!token; // returns true if token exists
};

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
