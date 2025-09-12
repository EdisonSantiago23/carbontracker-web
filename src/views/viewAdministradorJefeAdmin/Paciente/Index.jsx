import React, { useState } from "react";
import useStyles from "./useStyles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { withStyles } from "@mui/material/styles";
import NoInfo from "../../../components/Common/NoInfo";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import RateReview from "@mui/icons-material/HomeWork";
import People from "@mui/icons-material/People";
import useAuth from "../../../contextapi/hooks/useAuth";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import Button from "../../../components/CustomButtons/Button";
import * as FirestoreService from "./services/firestore";
import Box from "@mui/material/Box";
import LoadingData from "src/components/Common/LoadingData.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import New from "./New/New";

const Index = () => {
  const classes = useStyles();
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [elm, setElm] = React.useState(null);
  const {
    isAuthenticated,
    user
  } = useAuth();
  const [threadKey, setthreadKey] = React.useState(user.hospitalId);
  const columns = [{
    id: "name",
    label: "Nombre"
  }, {
    id: "apellido",
    label: "Apellido"
  }, {
    id: "cedula",
    label: "Cédula"
  }, {
    id: "edad",
    label: "Edad"
  }, {
    id: "edad",
    label: "Area"
  }, {
    id: "edad",
    label: "Habitación"
  }, {
    id: "edad",
    label: "Cama"
  }, {
    id: "fecha",
    label: "Fecha Ingreso"
  }, {
    id: "Diagnostico",
    label: "Diagnostico"
  }, {
    id: "alta",
    label: "Dar de alta"
  }, {
    id: "acciones",
    label: "Acciones"
  }];
  const [errorMSG, setErrorMsg] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [searched, setSearched] = React.useState("");
  const [filterUsuario, setfilterUsuario] = React.useState([]);
  const [email, setEmail] = useState("");

  const requestSearch = searchedVal => {
    const valor = 1;
    const filteredRows = usuario.filter(row => {
      return row.data().Nombre.toLowerCase().includes(searchedVal.toLowerCase()) || row.data().Direccion.toLowerCase().includes(searchedVal.toLowerCase()) || row.data();
    });
    setfilterUsuario(filteredRows);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const borrarSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const getConjuntoById = React.useCallback(() => {
    try {
      FirestoreService.getHispitales({
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

  const handleClose = () => {
    setOpen(false);
  };

  function deleteUserby(event) {
    setOpen(true);
    setElm(event);
  }

  const confir = () => {
    setOpen(false);

    if (elm) {
      FirestoreService.deleteBomba(elm, threadKey).then(docRef => {
        setOpen(false);
      });
    }
  };

  const update = item => {
    FirestoreService.asignarpaciente(item, threadKey, item.id).then(rss => {
      enqueueSnackbar("Paciente gestionado correctamente", {
        variant: "success"
      });
    });
  };

  const submit = async () => {
    console.error(email);
    getFiltro();
  };

  const getFiltro = () => {
    try {
      FirestoreService.getFiltro({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setUsuarios(Items);
        }
      }, threadKey, email);
      setLoading(false);
    } catch (e) {}
  };

  const daralta = item => {
    try {
      FirestoreService.updatePaciente(item.id, threadKey).then(() => {
        item.idPaciente = null; //  update(item);

        setLoading(false);
      });
    } catch (e) {}
  };

  return loading ? <LoadingData onLoad={() => borrarSearch()} /> : <Paper className={classes.root}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{
        cursor: "move"
      }} id="draggable-dialog-title">
          Eliminar
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estás seguro que quieres eliminar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="warning">
            Cancelar
          </Button>
          <Button onClick={confir} color="danger">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Box mt={2}>
        <Grid container spacing={3} alignItems="center">

          <Grid xs={12} lg={2}>
            <New />
          </Grid>
          <Grid xs={12} lg={4}>
            <TextField variant="outlined" margin="normal" fullWidth label="Número de cédula" autoFocus onChange={ev => setEmail(ev.target.value)} />

          </Grid>
          <Grid xs={12} lg={4}>
            <Button color="primary" onClick={submit}>
              BUSCAR
            </Button>
            <Button color="danger" onClick={() => getConjuntoById()}>
              Limpiar
            </Button>
          </Grid>
        </Grid>


      </Box>
      {usuario ? <Box mt={2}>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => <StyledTableCell align="center" key={index}>
                      {column.label}
                    </StyledTableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterUsuario.length > 0 ? filterUsuario.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return <StyledTableRow hover tabIndex={-1} key={index}>
                          <StyledTableCell align="center">
                            {row.data().Nombre}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data().Direccion}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data().Telefono}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data().Detalle}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {""}
                          </StyledTableCell>
                        </StyledTableRow>;
            }) : usuario.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return <StyledTableRow hover tabIndex={-1} key={index}>
                          <StyledTableCell align="center">
                            {row.data().Nombre}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data().Apellido}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data().Cedula}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data().Edad}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data()?.area}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data()?.habitacion}
                          </StyledTableCell>                            <StyledTableCell align="center">
                            {row.data()?.cama}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {moment(row.data().FechaIngreso?.seconds * 1000).format("YYYY-MM-DD")}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.data().Diagnostico}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button color="danger" onClick={() => daralta(row)}>
                              Dar de alta
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Grid container spacing={0} alignItems="center" justifyContent="center">
                              <Grid>
                                <New aria-label="editar" data={row} />
                              </Grid>
                              <Grid>
                                <Tooltip title="Eliminar">
                                  <IconButton aria-label="eliminar" onClick={() => deleteUserby(row.id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </StyledTableCell>
                        </StyledTableRow>;
            })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box> : <center>
          <NoInfo />
        </center>}

      <TablePagination labelRowsPerPage={"Filas por página"} rowsPerPageOptions={[10, 25, 100]} component="div" count={usuario.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
    </Paper>;
};

export default Index;