import React from "react";
import useStyles from "./useStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import NoInfo from "../../../components/Common/NoInfo";
import { Tooltip, IconButton, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import RateReview from "@material-ui/icons/HomeWork";
import People from "@material-ui/icons/People";
import useAuth from "../../../contextapi/hooks/useAuth";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import Button from "../../../components/CustomButtons/Button";
import { Typography } from "@material-ui/core";
import * as FirestoreService from "./services/firestore";
import Box from "@material-ui/core/Box";
import SearchBar from "material-ui-search-bar";
import LoadingData from "src/components/Common/LoadingData";
import DeleteIcon from "@material-ui/icons/Delete";
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
    label: "IDENTIFICADOR BOMBA"
  }, {
    id: "apellido",
    label: "FECHA CREACIÓN"
  }, {
    id: "cedula",
    label: "COMENTARIOS OBSERVACIONES"
  }];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [searched, setSearched] = React.useState("");
  const [filterUsuario, setfilterUsuario] = React.useState([]);

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
      FirestoreService.getEquiposById({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setUsuarios(Items);
        }
      }, threadKey);
      setLoading(false);
    } catch (e) {}
  }, [threadKey]);
  React.useEffect(() => {
    console.error("React.useEffectuseEffectuseEffectuseEffectuseEffectuseEffectuseEffectuseEffectuseEffectuseEffectuseEffect");
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
      <Typography variant="h3" color="textPrimary">
          Equipos
        </Typography>
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
                              {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {moment(row.data().FechaRegistro?.seconds * 1000).format("YYYY-MM-DD")}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.data().Detalle}
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