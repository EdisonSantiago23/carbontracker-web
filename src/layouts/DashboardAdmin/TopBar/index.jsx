import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AppBar, Grid, Toolbar, Box, Typography } from "@mui/material";
import Account from "./Account";
import Notifications from "./Notifications";
import moment from "moment";

const TopBar = ({ className, onMobileNavOpen, img, ...rest }) => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppBar
      className={className}
      sx={{ backgroundColor: "transparent", zIndex: 1029 }}
      {...rest}
    >
      <Toolbar sx={{ minHeight: 64, backgroundColor: "#051E34" }}>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item>
            <Box sx={{ fontSize: 30, color: "#ffffff" }}>
              {currentTime.format("HH:mm:ss")}
            </Box>
          </Grid>
          <Grid item>
            <Box ml={10}>
              <Typography variant="h6" sx={{ fontSize: 50, color: "#ffffff" }}>
                Monitoreo de equipos
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box ml={2} flexGrow={1} />
        <Notifications />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
