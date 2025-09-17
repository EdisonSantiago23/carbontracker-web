import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FuncionalidadService } from '@services'
import FuncionesSistema from "./../FuncionesSistema";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonAuto(props) {
  const [usuario, setUsuarios] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const threadKey = props.IdHospital;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getConjuntoById = React.useCallback(() => {

    try {
      FuncionalidadService.getFuncionalidad(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setUsuarios(Items);
          },
        },
      );
      setLoading(false);
    } catch (e) {}
  }, []);
  React.useEffect(() => {
    getConjuntoById();
  }, [getConjuntoById]);
  return (
    <div >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {usuario.map((res, index) => {
            return <Tab key={index} label={res.data().Nombre} {...a11yProps(index)} />;
          })}
        </Tabs>
      </AppBar>
      {usuario.map((res, index) => {
        return (
          <TabPanel  key={index} value={value} index={index}>
            <FuncionesSistema idFuncionalidad={res.id} />
          </TabPanel>
        );
      })}
    </div>
  );
}
