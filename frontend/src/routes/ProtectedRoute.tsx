import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => !!localStorage.getItem("token"); // use "token"

interface Props { children: JSX.Element; }

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
