import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

function ProtectedRoute({ children, requiredRole }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
