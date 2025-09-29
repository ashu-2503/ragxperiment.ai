import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Lazy load pages
const Auth = lazy(() => import("../modules/auth/auth"));
const Dashboard = lazy(() => import("../modules/pages/Dashboard"));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Suspense>
  );
}
