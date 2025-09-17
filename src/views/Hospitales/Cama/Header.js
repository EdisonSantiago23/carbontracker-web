import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Breadcrumbs,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import New from "./New/New";
import useAuth from "../../../contextapi/hooks/useAuth";


const Header = ({ className,IdHospital, ...rest }) => {

  const { user } = useAuth();
  let rol = user?.Rol;
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
          {rol.Tag === "super-administrador" && <Link
            variant="body1"
            color="inherit"
            to="/administrador/hospitales"
            component={RouterLink}
          >
            Administración
          </Link>}
          <Link
            variant="body1"
            color="inherit"
            to={"/administrador/areas/" + IdHospital}
            component={RouterLink}
          >
            Areas
          </Link>
          <Typography component={'span'} variant="body1" color="textPrimary">
            Camas
          </Typography>
        </Breadcrumbs>
        <Typography component={'span'} variant="h3" color="textPrimary">
          Camas
        </Typography>
      </Grid>
      <Grid item>
        {rol.agregarCama && <New />}
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
