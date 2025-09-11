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
import useSettings from "../../../../contextapi/hooks/useSettings";
import NoInfo from "../../../../components/Common/NoInfo";
import numeral from "numeral";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Tooltip, IconButton, CircularProgress } from "@material-ui/core";
import Button from "../../../../components/CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as FirestoreService from "./services/firestore";
import Box from "@material-ui/core/Box";
import SearchBar from "material-ui-search-bar";
import LoadingData from "src/components/Common/LoadingData";
import { nullFormat } from "numeral";
import New from "./New/New";
import { Link } from "react-router-dom";
import RateReview from "@material-ui/icons/KingBed";
import DeleteIcon from "@material-ui/icons/Delete";

const Index = props => {
  const [areaId, setAreaId] = React.useState(props.idArea);
  const classes = useStyles();
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const {
    threadKey
  } = useParams();
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
    id: "acciones",
    label: "Acciones"
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
      FirestoreService.deleteBomba(elm, threadKey, areaId).then(docRef => {
        setOpen(false);
      });
    }
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

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const borrarSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const getConjuntoById = React.useCallback(() => {
    try {
      FirestoreService.getHabitacionesByHospital({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setUsuarios(Items);
          setLoading(false);
        }
      }, threadKey, areaId);
      setLoading(false);
    } catch (e) {
      console.log('eeee', e);
    }
  }, [threadKey]);
  React.useEffect(() => {
    getConjuntoById();
  }, [getConjuntoById]);
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
        <New info={threadKey} areaId={areaId} />
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
                              {row.data().Numero}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.data().Telefono}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.data().Detalle}
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
                            <StyledTableCell align="center">
                              <Grid container spacing={0} alignItems="center" justifyContent="center">
                                <Grid>
                                  <Tooltip title="Camas">
                                    <Link to={"/administrador/hospitales/habitaciones/bombas/" + threadKey + "&&&&" + areaId + "&&&&" + row.id}>
                                      <IconButton aria-label="Camas">
                                        <RateReview />
                                      </IconButton>
                                    </Link>
                                  </Tooltip>
                                </Grid>

                                <Grid>
                                  <New aria-label="editar" info={threadKey} data={row} areaId={areaId} />
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