import React, { useState } from "react";
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
import NoInfo from "../../../../components/Common/NoInfo";
import moment from "moment";
import { Tooltip, IconButton } from "@material-ui/core";
import Button from "../../../../components/CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as FirestoreService from "./services/firestore";
import Box from "@material-ui/core/Box";
import LoadingData from "src/components/Common/LoadingData";
import New from "./New/New";
import { Link } from "react-router-dom";
import RateReview from "@material-ui/icons/KingBed";
import useAuth from "../../../../contextapi/hooks/useAuth";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";

const Index = props => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  const classes = useStyles();
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [threadKey, setthreadKey] = React.useState(user.hospitalId);
  const [areaId, setAreaId] = React.useState(props.idArea);
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
    label: "Capacidad"
  }, {
    id: "total",
    label: "Ingresos"
  }, {
    id: "d",
    label: "Dispinibles"
  }, {
    id: "fecha",
    label: "Fecha de creación"
  }, {
    id: "as",
    label: "Asignacion"
  }, {
    id: "acciones",
    label: "Acciones"
  }];
  const [email, setEmail] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [age, setAge] = React.useState('');
  const [enfermeros, setEnfermeros] = React.useState([]);
  const [valueData, setValueData] = React.useState(1);
  const [filter, setfilter] = React.useState([{
    id: 1,
    Nombre: 'Lleno'
  }, {
    id: 2,
    Nombre: 'Vacio'
  }]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confir = () => {
    setOpen(false);

    if (elm) {
      FirestoreService.deleteBomba(elm, threadKey).then(docRef => {
        setOpen(false);
      });
    }
  };

  const handleChange = (valor, item) => {
    const valorInfo = enfermeros.find(x => x.data().Cedula);
    item.idEncargado = valor.target.value;
    item.datosEncargado = valorInfo;
    update(item);
  };

  const update = item => {
    FirestoreService.asignarEnfermero(item, threadKey, item.id).then(rss => {
      enqueueSnackbar("Enfermero asignado correctamente", {
        variant: "success"
      });
    });
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
  const getConjuntoById = React.useCallback(() => {
    try {
      FirestoreService.getHabitacionesByHospital({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          Items.forEach(item => {
            try {
              FirestoreService.getEquipsByHabitacionAux({
                next: querySnapshot => {
                  const Itemss = querySnapshot.docs.map(docSnapshot => docSnapshot);
                  item.total = Itemss.length;
                  item.diferencia = item.data().Numero - Itemss.length;
                }
              }, threadKey, item.id);
              setLoading(false);
            } catch (e) {}
          });
          setUsuarios(Items);
          getFiltro(Items, 1);
          setLoading(false);
        }
      }, threadKey, areaId);
      setLoading(false);
    } catch (e) {}
  }, []);

  const submit = async event => {
    getFiltro(usuario, event.target.value);
  };

  const getFiltro = (usuarioA, vas) => {
    try {
      setUsuarios([]);
      var oJSON = sortJSON(usuarioA, 'diferencia', vas === 1 ? 'desc' : 'asc');
      setTimeout(() => {
        setUsuarios(oJSON);
        setLoading(false);
      }, 500);
    } catch (e) {}
  };

  function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
      var x = a[key],
          y = b[key];

      if (orden === 'asc') {
        return x < y ? -1 : x > y ? 1 : 0;
      }

      if (orden === 'desc') {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  }

  const getEnfermeross = () => {
    try {
      FirestoreService.getEnfermeros({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setEnfermeros(Items);
          setLoading(false);
        }
      }, threadKey);
      setLoading(false);
    } catch (e) {}
  };

  React.useEffect(() => {
    getConjuntoById();
    getEnfermeross();
  }, []);
  return loading ? <LoadingData /> : <Paper className={classes.root}>
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
        {
        /* <New info={threadKey} areaId={areaId} /> */
      }
        <Grid container spacing={3} alignItems="center">
        Habitaciones:  


          <Grid xs={12} lg={4}>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={valueData} label="Age" style={{
            width: 150
          }} onChange={e => submit(e)}>
              {filter.map((row, index) => {
              return <MenuItem value={row.id}>{row.Nombre}</MenuItem>;
            })}

            </Select>

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
                {usuario.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return <StyledTableRow hover tabIndex={-1} key={index}>
                        <StyledTableCell align="center">
                          {row.data().Nombre}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.data().Numero}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.total}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.diferencia}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {moment(row.data().FechaRegistro?.seconds * 1000).format("YYYY-MM-DD")}
                        </StyledTableCell>
                        <StyledTableCell>

                          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={row.data()?.idEncargado} label="Age" style={{
                    width: 150
                  }} onChange={e => handleChange(e, row)}>
                            {enfermeros.map((row, index) => {
                      return <MenuItem value={row.data().Cedula}>{row.data().Nombre} {row.data().Apellido}</MenuItem>;
                    })}

                          </Select>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Grid container spacing={0} alignItems="center" justifyContent="center">
                            <Grid>
                              <Tooltip title="Camas">
                                <Link to={"/jefeAdmin/hospitales/habitaciones/bombas/" + threadKey + "&&&&" + areaId + "&&&&" + row.id}>
                                  <IconButton aria-label="Camas">
                                    <RateReview />
                                  </IconButton>
                                </Link>
                              </Tooltip>
                            </Grid>

                            {
                      /* <Grid>
                         <New
                           aria-label="editar"
                           info={threadKey}
                           data={row}
                           areaId={areaId}
                         />
                       </Grid> */
                    }
                            {
                      /* <Grid>
                           <Tooltip title="Eliminar">
                             <IconButton
                               aria-label="eliminar"
                               onClick={() => deleteUserby(row.id)}
                             >
                               <DeleteIcon />
                             </IconButton>
                           </Tooltip>
                         </Grid> */
                    }
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