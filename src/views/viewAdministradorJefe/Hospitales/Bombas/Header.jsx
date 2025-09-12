import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import New from "./New/New";

const Header = ({ className, ...rest }) => {
  const { threadKey } = useParams();
  const idHospii = threadKey.split("&&&&")[0];

  return (
    <Grid
      container
      justifyContent="space-between"
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
          <Link
            variant="body1"
            color="inherit"
            to={`/administrador/areas/${idHospii}`}
            component={RouterLink}
          >
            Areas
          </Link>
          <Typography variant="body1" color="textPrimary">
            Camas
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Camas
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
