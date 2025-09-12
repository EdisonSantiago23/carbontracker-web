import React from "react";
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
import NoInfo from "../../../../components/Common/NoInfo";
import moment from "moment";
import { useParams,  } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as FirestoreService from "./services/firestore";
import Box from "@mui/material/Box";
import LoadingData from "../../../../components/Common/LoadingData";
import New from "./New/New";
import Button from "../../../../components/CustomButtons/Button";
import { Tooltip, IconButton } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSnackbar } from "notistack";
import Header from "./Header";

const Index = () => {
  const classes = useStyles();
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const {
    threadKey
  } = useParams();
  const {
    enqueueSnackbar
  } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [elm, setElm] = React.useState(null);
  const columns = [{
    id: "name",
    label: "Nombre"
  }, {
    id: "numero",
    label: "Número"
  }, {
    id: "fecha",
    label: "Fecha de creación"
  }, {
    id: "Asignación",
    label: "Asignación"
  }, {
    id: "accion",
    label: "Acciones"
  }];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [searched, setSearched] = React.useState("");
  const [filterUsuario, setfilterUsuario] = React.useState([]);
  const [enfermeros, setEnfermeros] = React.useState([]);

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

  const borrarSearch = () => {
    setSearched("");
  };

  const handleChange = (valor, item) => {
    console.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', valor.target.value);
    const pacienteData = enfermeros.find(x => x.data().Cedula == valor.target.value);
    item.idPaciente = valor.target.value;
    console.error('pacienteDatapacienteDatapacienteData', pacienteData.data());
    item.datosPaciente = pacienteData;
    update(item);
  };

  const update = item => {
    FirestoreService.asignarpaciente(item, threadKey, item.id).then(rss => {
      enqueueSnackbar("Paciente gestionado correctamente", {
        variant: "success"
      });
    });
  };

  const getPacientes = React.useCallback(() => {
    try {
      FirestoreService.getPacientes({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setEnfermeros(Items);
          console.error("Items", Items[0].data());
          getConjuntoById();
          setLoading(false);
        }
      }, threadKey);
      setLoading(false);
    } catch (e) {}
  }, [threadKey]);
  const getConjuntoById = React.useCallback(() => {
    try {
      FirestoreService.getHabitacionesByHospital({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          console.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
          console.error(Items[0].data());
          setUsuarios(Items);
        }
      }, threadKey);
      setLoading(false);
    } catch (e) {}
  }, [threadKey]);
  React.useEffect(() => {
    console.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    getPacientes();
  }, [getPacientes]);

  const daralta = item => {
    try {
      FirestoreService.updatePaciente(JSON.parse(item.data().idPaciente).Cedula, threadKey).then(() => {
        item.idPaciente = null;
        update(item);
        setLoading(false);
      });
    } catch (e) {}
  };

  return loading ? <LoadingData onLoad={() => borrarSearch()} /> : <Paper className={classes.root}>
      <Header />
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
      <Box mt={2}>{
        /* <New /> */
      }</Box>
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
                              {row.data().Numero}
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
                              {row.data().Numero}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {moment(row.data().FechaRegistro?.seconds * 1000).format("YYYY-MM-DD")}
                            </StyledTableCell>
                            <StyledTableCell>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={row.data()?.idPaciente} label="Age" style={{
                    width: 150
                  }} onChange={e => handleChange(e, row)}>
                              {enfermeros.map((row, index) => {
                      return <MenuItem value={row.data().Cedula}>{row.data().Nombre} {row.data().Apellido}</MenuItem>;
                    })}

                            </Select>

                            </StyledTableCell>
                            <StyledTableCell>
                              <StyledTableCell align="center">
                                {row.data()?.idPaciente && <Button color="danger" onClick={() => daralta(row)}>
                                    Dar de alta
                                  </Button>}
                              </StyledTableCell>
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