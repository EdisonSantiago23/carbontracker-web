import React from "react";
import { useLocation, matchPath } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, List, Link, Avatar, Drawer, Typography } from "@mui/material";
import { styled, alpha } from "@mui/system";
import NavItem from "./NavItem";
import useAuth from "../../contextapi/hooks/useAuth";
import NavSection from "../../components/nav-section";
import Img from "../../assets/img/c18.png";
import Logo from "../../components/logo";

import { Build, Dashboard,HomeWorkSharp,VaccinesIcon, MonitorHeartIcon } from "@material-ui/icons";

import Scrollbar from "../../components/scrollbar";
const NAV_WIDTH = 280;
const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));
import bgImage from "../../assets/img/nav_nachos@2x.png";

const sectionsSuperAdministrador = [
  {
    items: [
      {
        title: "Dashboard",
        icon: Dashboard,
        href: "/administrador/dashboard",
      },

      {
        title: "Administración ",
        icon: HomeWorkSharp,
        href: "/administrador/hospitales",
      },
      {
        title: "Soporte ",
        icon: Dashboard,
        href: "/administrador/soporte",
      },

 
      {
        title: "Configuraciones",
        icon: Build,
        href: "/jefeAdmin/configuraciones/roles",
        items: [
          {
            title: "Usuarios",
            href: "/jefeAdmin/configuraciones/jefes",
          },
          {
            title: "Menú",
            href: "/jefeAdmin/configuraciones/menu",
          },
          {
            title: "Roles",
            href: "/jefeAdmin/configuraciones/roles",
          },
          {
            title: "Funcionalidades",
            href: "/jefeAdmin/configuraciones/funcionalidades",
          },
          {
            title: "Estados dosis",
            href: "/jefeAdmin/configuraciones/estados",
          },
        ],
      },
    ],
  },
];
const sectionsAdminJefe = [
  {
    items: [
      // {
      //   title: "Reportes",
      //   icon: Build,
      //   href: "/jefeAdmin/configuraciones/roles",
      //   items: [
      //     {
      //       title: "Usuarios",
      //       href: "/jefeAdmin/configuraciones/jefes",
      //     },
      //     {
      //       title: "Roles",
      //       href: "/jefeAdmin/configuraciones/roles",
      //     },
      //     {
      //       title: "Funcionalidades",
      //       href: "/jefeAdmin/configuraciones/funcionalidades",
      //     },
      //     {
      //       title: "Estados dosis",
      //       href: "/jefeAdmin/configuraciones/estados",
      //     },
      //   ],
      // },
    ],
  },
];
const sectionsRecepcionista = [
  {
    items: [
      {
        title: "Dashboard",
        icon: Dashboard,
        href: "/dashboard",
      },
      {
        title: "Pacientes",
        icon: Dashboard,
        href: "/jefeAdmin/hospitales/Paciente",
      },
    ],
  },
];
const sectionsRecepcionistaCard = [
  {
    items: [
      {
        title: "Dashboard",
        icon: Dashboard,
        href: "/dashboard",
      },
      {
        title: "Pacientes",
        icon: Dashboard,
        href: "/jefeAdmin/hospitales/Paciente",
      },
    ],
  },
];
const renderNavItems = ({ items, pathname, depth = 0 }) => {
  return (
    <List
      disablePadding
      sx={{ p: 1 }}
      style={{ alignContent: "center", flex: 1, width: "100%" }}
    >
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
};

const reduceChildRoutes = ({ acc, pathname, item, depth }) => {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({ depth: depth + 1, pathname, items: item.items })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
};
const validarSection = (nombreRol) => {
  switch (nombreRol) {
    case "super-administrador":
      return sectionsSuperAdministrador;
    case "recepcionista":
      return sectionsRecepcionista;

    case "jefe-enfermeria":
      return sectionsAdminJefe;
    case "medico":
      return [];
    default:
      return [];
  }
};
const NavBar = ({ openNav, onCloseNav }) => {
  const [image] = React.useState(bgImage);
  const location = useLocation();
  const { user } = useAuth();
  let rol = user?.Rol;
  let menu = user?.Rol.Menu;
  const userSection = validarSection(rol.Tag);
  const content = (
    <Scrollbar
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        color: "#f5f5f5",
      }}
      sx={{
        height: 1,
        backgroundColor: "#051E34",
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* <Box sx={{ px: 2.5, display: 'inline-flex', alignContent: "end" }}>
        <IconButton
          onClick={onCloseNav}
          className={classes.icon}
        >
          <Menu />
        </IconButton>
      </Box> */}

      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>
      <Link underline="none">
        <StyledAccount>
          <Avatar src={Img} alt="photoURL" />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "#fff" }}>
              {user.Nombre} {user.Apellido}
            </Typography>

            <Typography variant="body2" sx={{ color: "#fff" }}>
              {rol.Nombre}
            </Typography>
          </Box>
        </StyledAccount>
      </Link>

      <NavSection data={menu} />

      {userSection.map((section, index) => (
        <List key={index.toString()}>
          {renderNavItems({
            items: section.items,
            pathname: location.pathname,
          })}
        </List>
      ))}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        open={openNav}
        ModalProps={{
          keepMounted: true,
        }}
        variant="persistent"
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: "background.default",
            borderRightStyle: "dashed",
          },
        }}
        onClose={onCloseNav}
      >
        {content}
      </Drawer>
    </Box>
  );
};

NavBar.defaultProps = {
  onMobileNavOpen: () => {},
};
NavBar.propTypes = {
  image: PropTypes.string,
  openDrawer: PropTypes.bool,
  onMobileNavOpen: PropTypes.func,
};

export default NavBar;
