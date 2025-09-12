import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import New from "./New/New";

const Header = ({ className, ...rest }) => {
  const { threadKey } = useParams();

  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={3}
      className={className}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/administrador/hospitales"
            component={RouterLink}
          >
            Administración
          </Link>
          <Typography variant="body1" color="textPrimary">
            Áreas administrativas
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Áreas y habitaciones
        </Typography>
      </Grid>
      <Grid item>
        <New idHospital={threadKey} />
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
