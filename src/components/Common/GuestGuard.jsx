import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../contextapi/hooks/useAuth";

const GuestGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const rol = user?.Rol;

  if (isAuthenticated) {
    switch (rol) {
      case "superAdministrador":
        return <Navigate to="/administrador/dashboard" replace />;
      case "jefe":
        return <Navigate to="/jefe/dashboard" replace />;
      case "jefeAdmin":
        return <Navigate to="/jefeAdmin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Si no está autenticado, renderizar los hijos
  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
