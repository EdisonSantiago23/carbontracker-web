import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @mui/material components
import { styled } from '@mui/system';
import { Grid, Card, Typography, CardContent, CardHeader, Autocomplete, TextField } from "@mui/material";
import moment from "moment";
import { TimerOff } from '@material-ui/icons';



export default function Index(props) {
  const { row } = props;
  function secondsToString(f1, f2) {
    var fechaInicio = new Date(f1).getTime();
    var fechaFin = new Date(f2).getTime();
    var time = (fechaFin - fechaInicio) / (60000);
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs.toFixed(2);
    return ret;
  }
  return (
    <Card >
      <CardHeader
        title={JSON.parse(row.data().Habitacion).Nombre} />
      <CardContent  >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid  xs={12} container spacing={2}>
              <Grid item xs={6}>
                <Typography component={'span'} variant="h5" color="textPrimary">
                  Fecha 1
                </Typography>
              </Grid>
              <Grid item xs={6}>
                 <Typography component={'span'} variant="h5" color="textPrimary">
                {moment(row.data().FechaOn?.seconds * 1000).format("YYYY-MM-DD")}
                </Typography>
              </Grid>
            </Grid>
            <Grid  xs={12} container spacing={2}>
              <Grid item xs={6} md={8}>
                <Typography component={'span'} variant="h5" color="textPrimary">
                  Fecha 2
                </Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography component={'span'} variant="h5" color="textPrimary">
                {row.data().Valor === 1 ? <TimerOff /> : secondsToString(moment(row.data().FechaOn?.seconds * 1000).format("YYYY-MM-DD HH:mm:ss"), moment(row.data().FechaOff?.seconds * 1000).format("YYYY-MM-DD HH:mm:ss"))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography component={'span'} variant="h5" color="textPrimary">
              Medicamentos
            </Typography>          </Grid>
          <Grid item xs={6} md={4}>
            <Typography component={'span'} variant="h5" color="textPrimary">
            {moment(row.data().FechaOn?.seconds * 1000).format("HH:mm:ss")}
            </Typography>          </Grid>
          <Grid item xs={6} md={8}>
            <Typography component={'span'} variant="h5" color="textPrimary">
              Medicamentos
            </Typography>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
}

Index.propTypes = {
  habitacion: PropTypes.string,
};
