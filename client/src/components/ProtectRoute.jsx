import React from "react";
import { Navigate } from "react-router-dom";

function ProtectRoute({
  children,
  adminOnly = false
}) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================
  // LOGIN CHECK
  // =========================
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =========================
  // ADMIN CHECK
  // =========================
  if (
    adminOnly &&
    user.role !== "admin"
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default ProtectRoute;