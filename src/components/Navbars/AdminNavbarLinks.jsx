import React from "react";
import classNames from "classnames"; // @mui/material components

import { makeStyles } from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Hidden from "@mui/material/Hidden";
import Poppers from "@mui/material/Popper";
import Divider from "@mui/material/Divider"; // @mui/icons-material

import Person from "@mui/icons-material/Person"; // core components

import Button from "../CustomButtons/Button"; // import app from "../../services/firestore";

import { db } from '../../Firebase';
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
const useStyles = makeStyles(styles);
export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const logout = async () => {
    await firebase.auth().signOut();
  };

  return <div>


      <div className={classes.manager}>
        <Button color={window.innerWidth > 959 ? "transparent" : "white"} justIcon={window.innerWidth > 959} simple={!(window.innerWidth > 959)} aria-owns={openProfile ? "profile-menu-list-grow" : null} aria-haspopup="true" onClick={handleClickProfile} className={classes.buttonLink}>
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers open={Boolean(openProfile)} anchorEl={openProfile} transition disablePortal className={classNames({
        [classes.popperClose]: !openProfile
      }) + " " + classes.popperNav}>
          {({
          TransitionProps,
          placement
        }) => <Grow {...TransitionProps} id="profile-menu-list-grow" style={{
          transformOrigin: placement === "bottom" ? "center top" : "center bottom"
        }}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">

                    <Divider light />
                    <MenuItem onClick={logout} // onClick={handleCloseProfile}
                className={classes.dropdownItem}>
                      Salir
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>}
        </Poppers>
      </div>
    </div>;
}