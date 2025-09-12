import React from "react";
import * as FirestoreService from "./services/firestore";
import { makeStyles } from '@mui/styles';
import Paper from "@mui/material/Paper";
import useAuth from "../../../contextapi/hooks/useAuth";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import { withStyles } from "@mui/material/styles";
import Button from "../../../components/CustomButtons/Button";
import moment from "moment";
import TableRow from "@mui/material/TableRow";
const useStyles = makeStyles(theme => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  },
  textColor: {
    color: "#FFFFFF"
  },
  textColors: {
    color: "#EC4D43"
  },
  textColorss: {
    color: "#113CA0"
  }
}));

function Habitaciones(props) {
  const [usuario, setUsuarios] = React.useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [encargado, setEncargado] = React.useState(0);
  const [numero, setNumero] = React.useState(0);
  const [cama, setCama] = React.useState([]);
  const columns = [{
    id: "time",
    label: "Nombre"
  }, {
    id: "time",
    label: "Apellido"
  }, {
    id: "time",
    label: "Ingreso"
  }, {
    id: "time",
    label: "Diagnostico"
  }];
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {
    user
  } = useAuth();
  const [hospitalId] = React.useState(user?.hospitalId);
  const [equipos, setEquipos] = React.useState([]);
  const [validator, SetValidator] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "#051e34",
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);
  React.useEffect(() => {
    FirestoreService.getEquips({
      next: querySnapshot => {
        const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
        console.error("xxxxxxxxxxxxxxxxxx", Items[0].data());
        setEquipos(Items);
      }
    }, hospitalId);
  }, [hospitalId]);
  React.useEffect(() => {
    FirestoreService.getHabitaciones({
      next: querySnapshot => {
        const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
        Items.forEach(item => {
          try {
            FirestoreService.getEquipsByHabitacionAux({
              next: querySnapshot => {
                const Item = querySnapshot.docs.map(docSnapshot => docSnapshot);
                item.total = Item.length;
              }
            }, hospitalId, item.id);
            setLoading(false);
          } catch (e) {}
        });
        setUsuarios(Items);
      }
    }, hospitalId);
  }, []);
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

  const selectHB = valor => {
    if (valor.data().idEncargado) {
      setEncargado(JSON.parse(valor.data().idEncargado));
      setNumero(valor.data().Nombre);
    }

    getBombas(valor.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBombas = React.useCallback(idHabitacion => {
    try {
      FirestoreService.getEquipsByHabitacion({
        next: querySnapshot => {
          setCama([]);
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setCama(Items);
          setOpen(true);
        }
      }, hospitalId, idHabitacion);
      setLoading(false);
    } catch (e) {}
  }, [hospitalId]);
  return <div>
      <Paper className={classes.root}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth={"xl"}>
          <DialogTitle style={{
          cursor: "move"
        }} id="draggable-dialog-title">
            <Typography variant="h3" color="textPrimary">
              Encargado: {encargado.Nombre} {encargado.Apellido} | {numero}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow style={{
                  height: 100
                }}>
                    {columns.map((column, index) => <StyledTableCell align="center" style={{
                    width: "300px",
                    fontSize: 30
                  }} key={index}>
                        {column.label}
                      </StyledTableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cama.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  let paciente = JSON.parse(row.data().idPaciente);

                  if (row.data().idPaciente) {
                    return <StyledTableRow hover tabIndex={-1} key={index}>
                            <StyledTableCell align="center" style={{
                        fontSize: 30
                      }}>
                              {paciente.Nombre}
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{
                        fontSize: 30
                      }}>
                              {paciente.Apellido}
                            </StyledTableCell>

                            <StyledTableCell align="center" style={{
                        fontSize: 30,
                        width: "200px"
                      }}>
                              {moment(paciente.FechaIngreso?.seconds * 1000).format("YYYY-MM-DD")}
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{
                        width: "200px",
                        fontSize: 30
                      }}>
                              {paciente.Diagnostico}
                            </StyledTableCell>
                          </StyledTableRow>;
                  } else {
                    if (index === 0) {
                      return <StyledTableRow hover tabIndex={-1} key={index}>
                              <StyledTableCell align="center" style={{
                          fontSize: 30
                        }}>
                                {"Libre"}
  
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{
                          fontSize: 30
                        }}>
                                {"Libre"}
  
                              </StyledTableCell>
  
                              <StyledTableCell align="center" style={{
                          fontSize: 30,
                          width: "200px"
                        }}>
                                {"Libre"}
  
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{
                          width: "200px",
                          fontSize: 30
                        }}>
                                {"Libre"}
                              </StyledTableCell>
                            </StyledTableRow>;
                    }
                  }
                })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="warning">
              Salir
            </Button>
          </DialogActions>
        </Dialog>
        <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        marginTop: 20,
        flexDirection: "row"
      }}>
          <div style={{
          width: 100,
          height: 20,
          marginTop: 5,
          backgroundColor: "#EC4D43"
        }} />

          <Typography variant="h6" className={classes.textColors}>
            Alarma encendida
          </Typography>
          <div style={{
          width: 100,
          height: 20,
          marginTop: 5,
          backgroundColor: "#113CA0"
        }} />
          <Typography variant="h6" className={classes.textColorss}>
            Alarma apagada
          </Typography>
        </div>
        <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        marginTop: 20,
        flexDirection: "row"
      }}>
          <div style={{
          width: 100,
          height: 20,
          marginTop: 5,
          backgroundColor: "#2DC639"
        }} />

          <Typography variant="h6" className={classes.textColors}>
            Con disponibilidad
          </Typography>
          <div style={{
          width: 100,
          height: 20,
          marginTop: 5,
          backgroundColor: "#FFC000"
        }} />
          <Typography variant="h6" className={classes.textColorss}>
            Sin disponibilidad
          </Typography>
        </div>
        <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20,
        padding: 10,
        flexDirection: "row"
      }}>
          {usuario.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
          return <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: 20,
            padding: 10,
            flexDirection: "row"
          }}>
                  <Grid container spacing={0} direction="column" alignItems="center" onClick={() => {
              selectHB(row);
            }} justifyContent="center" style={equipos.filter(x => x.data().habitacionNombre === row.data().Nombre).filter(x => x.data().Valor === 1).length > 0 ? validator === 0 ? {
              background: "#EC4D43",
              width: 200,
              height: 150,
              textAlign: "center"
            } : {
              background: row.total < row.data().Numero ? "#2DC639" : "#FFC000",
              width: 200,
              height: 150,
              textAlign: "center"
            } : {
              background: row.total < row.data().Numero ? "#2DC639" : "#FFC000",
              width: 200,
              height: 150,
              textAlign: "center"
            }}>
                    <Typography variant="h6" className={classes.textColor} style={{
                fontSize: 50
              }}>
                      {row.data().Nombre}
                    </Typography>
                  </Grid>
                </div>;
        })}
        </div>

      </Paper>
    </div>;
}

export default Habitaciones;