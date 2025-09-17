import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Grid, Stack, Toolbar } from '@mui/material';
import Account from "./Account";
import useAuth from "../../contextapi/hooks/useAuth";
import { Box, Typography, Icon } from '@mui/material';
import { TimerRender } from "@components";
import { bgBlur } from '../../utils/cssStyles';
import { styled } from '@mui/system';
import { HospitalService } from "@services";

const NAV_WIDTH = -1;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: "#051E34", opacity: 1 }),
  boxShadow: 'none',
  width:'100%',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,

  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const TopBar = ({ className, onMobileNavOpen, img, ...rest }) => {
  const { user, nombreArea } = useAuth();
  const rol = user?.Rol;
  const [openDrawer, setOpenDrawer] = useState(rol.navLateral);
  const [hospital, setHospital] = useState(null);

  React.useEffect(() => {
    HospitalService.getHispitalById(user.IdHospital).then((res) => {
      setHospital(res.data())
    })
  }, [user.IdHospital]);

  return (
    <StyledRoot>

      <StyledToolbar  >
        <Box ml={2}>
          {(rol.navLateral && !openDrawer )&& 
            <IconButton
              onClick={() => openNav(openDrawer)}
            >
              <MenuIcon />
            </IconButton>
          }
        </Box>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          {hospital && <Box>
            <img
              alt="Imagen"
              width={150}
              height={70}
              src={hospital?.LogoImg}
            />
          </Box>}
          <Box ml={10}>
            <TimerRender />
          </Box>
          <Grid item>
            <Box marginLeft={"80px"}>
              <Typography component={'span'}
                variant="h6"
              >
                {rol.Nombre} {nombreArea}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1
          }}>
          <Account />

        </Stack>


      </StyledToolbar>
    </StyledRoot>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

TopBar.defaultProps = {
  onMobileNavOpen: () => { },
};

export default TopBar;
