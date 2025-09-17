import React from "react";
import { Grid } from "@material-ui/core";
import Habitaciones from "./Habitaciones";
import HistorialMonitoreo from "./HistorialMonitoreo";
import FullScreenComponent from "../../components/FullScreenComponent/FullScreenComponent ";
import { Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/FullscreenRounded";

function Dashboard(props) {

  return (
    <FullScreenComponent>
      {({ ref, onRequest, onExit }) => (
          <Grid >

        
          <Grid container spacing={3}>
            <Grid item md={6} xs={6}>
              <HistorialMonitoreo />
            </Grid>
            <Grid item md={6} xs={6}>
              <Habitaciones />
            </Grid>
          </Grid>
          <Tooltip title="Pantalla completa"  style={{ position: "fixed", bottom: 0, right: "50%" }}>
            <IconButton
              aria-label="Pantalla"
              color="primary"
              
              onClick={() => onRequest()}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          </Grid>
      )}
    </FullScreenComponent>
  );
}

export default Dashboard;
