import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Dummy auth function, replace with real auth logic
const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
