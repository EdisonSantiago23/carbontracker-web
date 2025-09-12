import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types"; // @mui/material components

import { makeStyles } from '@mui/styles';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden"; // @mui/icons-material

import Menu from "@mui/icons-material/Menu"; // core components

import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import Button from "../CustomButtons/Button"; //hooks

import { useRouteName } from "../../hooks";
import styles from "../../assets/jss/material-dashboard-react/components/headerStyle.jsx";
const useStyles = makeStyles(styles);
export default function Header(props) {
  const classes = useStyles();
  const routeName = useRouteName();
  const {
    color
  } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {
          /* Here we create navbar brand, based on route name */
        }
          <Button color="transparent" href="#" className={classes.title}>
            {routeName}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {<AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>;
}
Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};