import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@mui/styles';
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as FirestoreService from "./services/firestore";
import useAuth from "../../../../contextapi/hooks/useAuth";
import Habitaciones from "./../Habitaciones/Index";

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;
  return <div role="tabpanel" hidden={value !== index} id={`scrollable-auto-tabpanel-${index}`} aria-labelledby={`scrollable-auto-tab-${index}`} {...other}>
      {value === index && <Box p={3}>
          <Typography>{children}</Typography>
        </Box>}
    </div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));
export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const {
    isAuthenticated,
    user
  } = useAuth();
  const [usuario, setUsuarios] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [threadKey, setthreadKey] = React.useState(user.hospitalId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getConjuntoById = React.useCallback(() => {
    try {
      FirestoreService.getAreaById({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setUsuarios(Items);
        }
      }, threadKey);
      setLoading(false);
    } catch (e) {}
  }, [threadKey]);
  React.useEffect(() => {
    getConjuntoById();
  }, [getConjuntoById]);
  return <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          {usuario.map((res, index) => {
          return <Tab label={res.data().Nombre} {...a11yProps(index)} />;
        })}
        </Tabs>
      </AppBar>
      {usuario.map((res, index) => {
      return <TabPanel value={value} index={index}>
            <Habitaciones idArea={res.id} idHospital={threadKey} />
          </TabPanel>;
    })}
    </div>;
}