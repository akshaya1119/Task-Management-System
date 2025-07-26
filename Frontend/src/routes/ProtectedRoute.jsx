import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user has auto-generated password and hasn't skipped, and is not on change password page, redirect to change password
  if (user && (user.isAutoGenPass === true || user.requirePasswordChange === true) && !user.skipPasswordChange && location.pathname !== "/changepassword") {
    console.log("User has auto-generated password, redirecting to change password", user);
    return <Navigate to="/changepassword" replace />;
  }

  return children;
};

export default ProtectedRoutes;