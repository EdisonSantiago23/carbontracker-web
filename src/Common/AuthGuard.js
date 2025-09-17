import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../contextapi/hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  let rol =  user?.Rol;
  if (!isAuthenticated) {
    if (rol == "superAdministrador") {
      return <Redirect to="/administrador/dashboard" />;
    } else {
      return <Redirect to="/" />;
    }
  }
  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
