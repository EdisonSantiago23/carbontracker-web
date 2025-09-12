import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  ListSubheader,
} from "@mui/material";
import Dashboard from "@mui/icons-material/Dashboard";
import AirlineSeatIndividualSuite from "@mui/icons-material/AirlineSeatIndividualSuite";
import Residente from "@mui/icons-material/People";
import AirplanemodeInactive from "@mui/icons-material/Pages";
import CloudCircleOutlined from "@mui/icons-material/CloudCircleOutlined";
import Logo from "../../../components/Common/Logo.jsx";
import LogoDown from "../../../components/Common/LogoDown.jsx";
import NavItem from "./NavItem";
import useAuth from "../../../contextapi/hooks/useAuth";
import { makeStyles } from '@mui/styles';

const sectionsAdmin = [
  {
    items: [
      { title: "Dashboard", icon: Dashboard, href: "/administrador/dashboard" },
      { title: "Administración", icon: Residente, href: "/administrador/hospitales" },
    ],
  },
];

const sectionsAdminJefe = [
  {
    items: [
      { title: "Dashboard", icon: Dashboard, href: "/jefeAdmin/dashboard" },
      { title: "Administración", icon: AirplanemodeInactive, href: "/jefeAdmin/hospitales/areas" },
      { title: "Enfermeros", icon: CloudCircleOutlined, href: "/jefeAdmin/hospitales/enfermero" },
      { title: "Pacientes", icon: Residente, href: "/jefeAdmin/hospitales/Paciente" },
      { title: "Equipos", icon: AirlineSeatIndividualSuite, href: "/jefeAdmin/hospitales/Equipos" },
    ],
  },
];

const renderNavItems = ({ items, pathname, depth = 0 }) => (
  <List disablePadding>
    {items.reduce((acc, item) => reduceChildSwitch({ acc, item, pathname, depth }), [])}
  </List>
);

const reduceChildSwitch = ({ acc, pathname, item, depth }) => {
  const key = item.title + depth;

  if (item.items) {
    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(false)}
        title={item.title}
      >
        {renderNavItems({ depth: depth + 1, pathname, items: item.items })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem depth={depth} href={item.href} icon={item.icon} info={item.info} key={key} title={item.title} />
    );
  }
  return acc;
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#051e34",
  },
  mobileDrawer: { width: 256 },
  desktopDrawer: { width: 256, height: "100%" },
  textColor: { color: "#ffffff", fontSize: 15 },
  dividerColor: { backgroundColor: "#B0A36C" },
}));

const NavBar = ({ image }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useAuth();
  const rol = user?.Rol;
  const userSection = rol === "superAdministrador" ? sectionsAdmin : sectionsAdminJefe;

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      className={classes.root}
      style={{ backgroundImage: `url(${image})`, overflowY: "auto" }}
    >
      <Hidden lgUp>
        <Box p={2} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
      </Hidden>
      <Box p={2}>
        <LogoDown />
      </Box>
      <Divider className={classes.dividerColor} variant="middle" />
      <Box p={2}>
        {userSection.map((section, idx) => (
          <List key={idx} subheader={<ListSubheader disableGutters disableSticky>{section.subheader}</ListSubheader>}>
            {renderNavItems({ items: section.items, pathname: location.pathname })}
          </List>
        ))}
      </Box>
    </Box>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer anchor="left" classes={{ paper: classes.mobileDrawer }} variant="temporary">
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  image: PropTypes.string,
};

export default NavBar;
