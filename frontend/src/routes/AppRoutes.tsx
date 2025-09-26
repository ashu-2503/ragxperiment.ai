import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Lazy load pages
const Login = lazy(() => import("../modules/auth/login"));
const Signup = lazy(() => import("../modules/auth/signup"));
const Dashboard = lazy(() => import("../modules/pages/Dashboard"));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protected dashboard route */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
