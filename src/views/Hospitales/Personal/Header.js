import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
} from '@mui/material';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import New from "./New/New";


const Header = ({ className, ...rest }) => {

  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={3}
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

          <Typography component={'span'} variant="body1" color="textPrimary">
            Jefes
          </Typography>
        </Breadcrumbs>
        <Typography component={'span'} variant="h3" color="textPrimary">
        Usuarios
        </Typography>
      </Grid>
      <Grid item>
        <New />
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
