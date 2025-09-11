import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../contextapi/hooks/useAuth";

const AdminGuard = ({
  children
}) => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  let rol = user?.Rol;

  if (isAuthenticated) {
    if (rol == "superAdministrador") {
      return <Redirect to="/administrador/dashboard" />;
    } else {
      return <Redirect to="/404" />;
    }
  } else {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

AdminGuard.propTypes = {
  children: PropTypes.node
};
export default AdminGuard;