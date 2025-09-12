import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import New from "./New/New";

const Header = ({ className, ...rest }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={3}
      className={className}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link
            variant="body1"
            color="inherit"
            to="/administrador/hospitales"
            component={RouterLink}
          >
            Administración
          </Link>
          <Typography variant="body1" color="textPrimary">
            Jefes
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary" sx={{ mt: 1 }}>
          Jefes administradores
        </Typography>
      </Grid>
      <Grid item>
        <New />
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
