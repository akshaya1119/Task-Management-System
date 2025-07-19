import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const PublicRoutes = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoutes;