import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../contextapi/hooks/useAuth";

const AdminGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const rol = user?.Rol;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (rol === "superAdministrador") {
    return <Navigate to="/administrador/dashboard" replace />;
  }

  return <Navigate to="/404" replace />;
  
  // Nota: "children" aquí nunca se renderiza porque esta guard siempre redirige.
  // Si quieres permitir que los hijos se rendericen solo para superAdministrador,
  // reemplaza la lógica así:
  // if (isAuthenticated && rol === "superAdministrador") return <>{children}</>;
  // if (!isAuthenticated) return <Navigate to="/" replace />;
  // return <Navigate to="/404" replace />;
};

AdminGuard.propTypes = {
  children: PropTypes.node
};

export default AdminGuard;
