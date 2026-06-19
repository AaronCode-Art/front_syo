import React from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import PageLoader from "../loading/PageLoader";

interface Props {
  children?: React.ReactNode;
}

/**
 * ProtectedRoute
 * Protege rutas privadas
 */
const ProtectedRoute: React.FC<Props> = ({
  children,
}) => {

  const {
    isAuthenticated,
    isAuthLoading,
  } = useAuth();

  if (isAuthLoading) {
    return (
      <PageLoader message="Verificando sesión..." />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;