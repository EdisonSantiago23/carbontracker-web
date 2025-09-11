import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Breadcrumbs, Button, Grid, Link, SvgIcon, Typography, makeStyles } from "@material-ui/core";
import { Edit as EditIcon } from "react-feather";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import New from "./New/New";
import { useParams } from "react-router-dom";
const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const {
    threadKey
  } = useParams();
  const idHospii = threadKey.split("&&&&")[0];
  return <Grid className={clsx(classes.root, className)} container justify="space-between" spacing={3} {...rest}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/jefeAdmin/hospitales/areas" component={RouterLink}>
            Administración
          </Link>
      
          <Typography variant="body1" color="textPrimary">
            Camas
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Camas
        </Typography>
      </Grid>

    </Grid>;
};

Header.propTypes = {
  className: PropTypes.string
};
export default Header;