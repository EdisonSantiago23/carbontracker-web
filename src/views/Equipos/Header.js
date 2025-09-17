import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Breadcrumbs,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import New from "./New/New";
import useAuth from "../../contextapi/hooks/useAuth";
import { Divider } from '@mui/material';

const Header = ({ className, IdHospital, ...rest }) => {
  const { user } = useAuth();
  let rol = user?.Rol;
  if (rol.Tag != "jefe-enfermeria") {
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
              to={"/administrador/hospitales"}
              component={RouterLink}
            >
              Administración
            </Link>



            <Typography component={'span'} variant="body1" color="textPrimary">
              Áreas administrativas
            </Typography>
          </Breadcrumbs>
          <Typography component={'span'} variant="h3" color="textPrimary">
            Equipos
          </Typography>
        </Grid>
        <Grid item>
          {rol.crearEquipos && <New IdHospital={IdHospital} />}
        </Grid>
        <Divider style={{ background: "black" }} variant="middle" />

      </Grid>
    );
  } else {
    return null
  }

};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
