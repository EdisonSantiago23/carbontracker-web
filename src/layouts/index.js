import React from "react";
import PropTypes from "prop-types";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import useSettings from "../contextapi/hooks/useSettings";
import useAuth from "../contextapi/hooks/useAuth";
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------


const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
}));

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------



const DashboardLayout = ({ children }) => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const rol = user?.Rol;
  const [openNav, setOpenNav] = React.useState(rol?.navLateral);

  React.useEffect(() => {
    updateVarNav();
  }, [updateVarNav]);

  const updateVarNav = React.useCallback((e) => {
    if (rol?.navLateral) {
      setOpenNav(!e);
    }
  }, [rol?.navLateral]);

  return (
    <StyledRoot>
      <TopBar img={settings.Imagen} onMobileNavOpen={(e) => updateVarNav(e)} />
      {rol?.navLateral && <NavBar
        openNav={openNav} onCloseNav={() => setOpenNav(false)} />}
      <Main>
        {children}
      </Main>
    </StyledRoot>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
