import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../contextapi/hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const rol = user?.Rol;

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado y es superAdministrador, redirigir al dashboard
  if (rol === "superAdministrador") {
    return <Navigate to="/administrador/dashboard" replace />;
  }

  // Usuario autenticado normal, renderizar los hijos
  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
