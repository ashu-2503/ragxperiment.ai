import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import { Spinner } from "react-bootstrap";

// Lazy load pages
const Auth = lazy(() => import("../modules/auth/auth"));
const Dashboard = lazy(() => import("../modules/pages/Dashboard"));
const KnowledgeBase = lazy(() => import("../modules/knowledge-base/knowledgeBase"));
const Chat = lazy(() => import("../modules/chat/chat"));

const withProtectedLayout = (Component: React.FC) => (
  <ProtectedRoute>
    <LayoutWrapper>
      <Component />
    </LayoutWrapper>
  </ProtectedRoute>
);

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
        </div>
      }
    >
      <Routes>
        {/* Public route */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={withProtectedLayout(Dashboard)} />
        <Route path="/knowledge" element={withProtectedLayout(KnowledgeBase)} />
        <Route path="/chat" element={withProtectedLayout(Chat)} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Suspense>
  );
}
