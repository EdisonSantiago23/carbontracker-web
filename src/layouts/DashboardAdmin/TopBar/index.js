import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AppBar, Grid, Toolbar, makeStyles } from "@material-ui/core";
import Logo from "../../../components/Common/Logo";
import Account from "./Account";
import Notifications from "./Notifications";
import Moment from "react-moment";
import moment from "moment";
import { Box, Typography, Icon } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    zIndex: "1029"
  },
  toolbar: {
    minHeight: 64,
    backgroundColor: '#051E34'
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  img,
  ...rest
}) => {
  const classes = useStyles();
  const [dateToFormat, setdateToFormat] = useState(moment().toDate().getTime());

  const updateTime = () => {
    let clock = moment().toDate().getTime();
  };

  setInterval(updateTime, 1000);
  useEffect(() => {
    let time = updateTime;
    setdateToFormat(time);
  }, []);
  return <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item>
            <Box>
              <Moment interval={1} unit="seconds" style={{
              fontSize: 30
            }}>
                {dateToFormat}
              </Moment>
            </Box>
          </Grid>
          <Grid item>
            <Box marginLeft={"80px"}>
              <Typography bold variant="h6" color="#ffffff" style={{
              fontSize: 50
            }}>
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
    </AppBar>;
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};
export default TopBar;