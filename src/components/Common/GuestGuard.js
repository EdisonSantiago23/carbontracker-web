import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../contextapi/hooks/useAuth";

const GuestGuard = ({
  children
}) => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  let rol = user?.Rol;
  console.log("rol", rol);

  if (isAuthenticated) {
    if (rol == "superAdministrador") {
      return <Redirect to="/administrador/dashboard" />;
    }

    if (rol == "jefe") {
      return <Redirect to="/jefe/dashboard" />;
    }

    if (rol == "jefeAdmin") {
      return <Redirect to="/jefeAdmin/dashboard" />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};
export default GuestGuard;