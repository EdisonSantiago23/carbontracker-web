import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../contextapi/hooks/useAuth";

const GuestGuard = ({ children }) => {

  const { isAuthenticated, user } = useAuth();
  let rol = user?.Rol;
  if (isAuthenticated) {
    if (rol.Tag == "super-administrador") {
      return <Redirect to="/administrador/dashboard" />;
    }

    if (rol.Tag == "jefe-enfermeria") {
      return <Redirect to="/jefeAdmin/dashboard" />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
