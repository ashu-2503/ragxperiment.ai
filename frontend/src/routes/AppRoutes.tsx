import { Routes, Route } from "react-router-dom";
import React from "react";

const DashboardHome = () => <div>Welcome to Dashboard</div>;

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardHome />} />
      {/* Add other dashboard-related routes here */}
    </Routes>
  );
}
