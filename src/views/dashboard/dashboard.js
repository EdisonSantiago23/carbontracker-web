import React from "react";
import * as FirestoreService from "./services/firestore";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress, CardContent, Box, Grid } from "@material-ui/core";
import moment from "moment";
import useStyles from "./useStyles";
import useAuth from "../../contextapi/hooks/useAuth";
import Habitaciones from "./Habitaciones/Habitaciones";

function Dashboard(props) {
  const [bombas, setBombas] = React.useState([]);
  const [equipos, setEquipos] = React.useState([]);
  const [validator, SetValidator] = React.useState(1);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [elm, setElm] = React.useState(null);
  const [dataA, setDataA] = React.useState([]);
  const [valTab, setValTab] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const columns = [{
    id: "habitacion",
    label: "Habitación"
  }, {
    id: "time",
    label: "Tiempo"
  }, {
    id: "fecha",
    label: "Hora"
  }];
  const {
    user
  } = useAuth();
  const [hospitalId] = React.useState(user?.hospitalId);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (validator === 0) {
        SetValidator(1);
      }

      if (validator === 1) {
        SetValidator(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [validator]);
  React.useEffect(() => {
    FirestoreService.getBombas({
      next: querySnapshot => {
        const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
        setBombas(Items);
        setLoading(false);
      }
    }, hospitalId);
  }, [hospitalId]);
  React.useEffect(() => {
    FirestoreService.getEquips({
      next: querySnapshot => {
        const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
        setEquipos(Items);
        setLoading(false);
      }
    }, hospitalId);
  }, [hospitalId]);
  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "#051e34",
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14,
      maxHeight: "400px",
      overflowX: "hidden"
    }
  }))(TableCell);
  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);

  function secondsToString(time) {
    // Hours, minutes and seconds 
    var hrs = ~~(time / 3600);
    var mins = ~~(time % 3600 / 60);
    var secs = time % 60; // Output like "1:01" or "4:03:59" or "123:03:59" 

    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs.toFixed(2);
    return ret;
  }

  return <Paper className={classes.root}>
      {!loading ? <Paper className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={6}>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="customized table">
                  <TableHead style={{
                fontSize: 50
              }}>
                    <TableRow style={{
                  height: 100
                }}>
                      {columns.map((column, index) => <StyledTableCell align="center" key={index} style={{
                    fontSize: 50
                  }}>
                          {column.label}
                        </StyledTableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {equipos.length > 0 ? equipos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return <StyledTableRow hover tabIndex={-1} key={index} style={index === 0 ? validator === 0 ? {
                    backgroundColor: "#FFE873"
                  } : {
                    backgroundColor: "#ffffff"
                  } : {
                    backgroundColor: "#ffffff"
                  }}>
                              <StyledTableCell align="center" style={{
                      fontSize: 50
                    }}>
                                {row.data().habitacionNombre}
                              </StyledTableCell>

                              <StyledTableCell align="center" style={{
                      fontSize: 50
                    }}>
                                {secondsToString(row.data().Duracion)}
                              </StyledTableCell>

                              <StyledTableCell align="center" style={{
                      fontSize: 50
                    }}>
                                {moment(row.data().Fecha?.seconds * 1000).format("HH:mm:ss")}
                              </StyledTableCell>
                            </StyledTableRow>;
                }) : equipos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return <StyledTableRow hover tabIndex={-1} key={index}>
                              <StyledTableCell align="center">
                                {row.data().Nombre}
                              </StyledTableCell>
                            </StyledTableRow>;
                })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item md={6} xs={6}>
              <Habitaciones />
            </Grid>
          </Grid>
        </Paper> : <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>}
    </Paper>;
}

export default Dashboard;