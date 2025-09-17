import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CamaService, EquiposService } from "@services";
import Box from "@mui/material/Box";
import New from "./New/New";
import Button from "../../../components/CustomButtons/Button";
import { Tooltip, IconButton } from '@mui/material';
import { StyledTableRow, StyledTableCell } from "../../../styles";
import { useSnackbar } from "notistack";
import useAuth from "../../../contextapi/hooks/useAuth";
import Typography from "@mui/material/Typography";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DarAlta from "./DarAlta/DarAlta";
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import { Autocomplete, TextField } from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { Container, confirmDialog, Label } from "@components";
import { CamasTabla } from "@config"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { sentenceCase } from 'change-case';

const Index = (props) => {
  const { IdHospital, area, habitacion, agregar } = props;
  const [equipos, setEquipos] = React.useState([]);
  const [camas, setCamas] = React.useState([]);
  const [openS, setOpenS] = React.useState(false);
  const [paciente, setPaciente] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [elm, setElm] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  let rol = user?.Rol;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpenS(false);
  };
  function deleteUserby(event) {
    setOpen(true);
    setElm(event);
  }

  React.useEffect(() => {
    getCamas();

    getEquiposByHospital();
  }, [getCamas, getEquiposByHospital]);

  const getCamas = React.useCallback(() => {
    CamaService.getHabitacionesByHospital(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setCamas(Items);
        },
      },
      IdHospital,
      habitacion.id
    );
    setLoading(false);
  }, [habitacion.id, IdHospital]);

  const getEquiposByHospital = React.useCallback(() => {
    EquiposService.getEquiposByEstadoTotal(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setEquipos(Items);
        },
      },
      IdHospital
    );
    setLoading(false);
  }, [IdHospital]);

  const asignarEquipo = (idEquipo, idCama) => {
    updateCama(idEquipo, idCama)

  };
  const updateCama = (idEquipo, idCama) => {
    const equipoInfo = equipos.find((x) => x.id == idEquipo);
    CamaService.updateCamaByEquipos(
      IdHospital,
      idCama,
      equipoInfo
    ).then((rss) => {
      updateEquipoByEstado(idEquipo)

    });
  };
  const updateEquipoByEstado = (idEquipo) => {
    EquiposService.updateEquipoByEstado(IdHospital, idEquipo, habitacion, area, 2).then((rss) => {
      setLoading(false);
      enqueueSnackbar("Equipo asignado correctamente", { variant: "success" });

    });
  };




  const daralta = (item) => {
    try {
      setPaciente(JSON.parse(item.data().DatosPaciente));
      setOpenS(true);
    } catch (e) { }
  };

  const limpiarBomba = (idCama, IdEquipo) => {

    setLoading(true)
    quitarCama(idCama, IdEquipo)
  };

  const quitarCama = React.useCallback((idCama, idEquipo) => {
    EquiposService.quitarEquipoCama(IdHospital, idEquipo).then((res) => {
      quitarEquipoCama(idCama)
    });
  }, [IdHospital, quitarEquipoCama]);
  const quitarEquipoCama = React.useCallback((id) => {
    CamaService.quitarEquipo(IdHospital, id).then(() => {
      enqueueSnackbar("Equipo retirado correctamente", { variant: "success" });
      setLoading(false);
    });
  }, [enqueueSnackbar, IdHospital]);


  const desactivarRegistro = (Registro) => {
    let estado = !Registro.data().Estado ? "Activar" : "Desactivar";
    confirmDialog("¿Estás seguro que deseas " + estado + " el equipo " + Registro.data().Nombre + "?", () =>
      estadoRegistro(Registro, estado)
    );
  };
  const estadoRegistro = (Registro, estado) => {
    CamaService.estadoRegistro(IdHospital, Registro).then(() => {
      enqueueSnackbar("Equipo " + estado + " correctamente", { variant: "success" });
    });
  };
  const eliminaRegistro = (Registro) => {
    confirmDialog('¿Estás seguro que deseas eliminar el equipo ' + Registro.data().Nombre + "?", () =>
      eliminarRegistro(Registro)
    );
  };
  const eliminarRegistro = (Registro) => {
    CamaService.eliminarRegistro(IdHospital, Registro).then(() => {
      enqueueSnackbar("Equipo eliminado correctamente", { variant: "success" });
    });
  };
  return (
    <Container loading={loading} titulo={area.data().Nombre + "-" + habitacion.data().Nombre}>
      <Box mt={2}> {agregar && <New
        aria-label="Nuevo"
        IdHospital={IdHospital}
        habitacion={habitacion}
        area={area}
        data={null}
      />}
      </Box>
      <Dialog
        open={openS}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xl"}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography variant="h3" color="textPrimary">
            Datos del paciente
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h5" color="textPrimary">
            {"Nombre:"} {paciente.Nombre}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            {"Apellido:"} {paciente.Apellido}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            {"Edad:"} {paciente.Edad}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            {"Diagnóstico:"} {paciente.Diagnostico}
          </Typography>
        </DialogContent>
        <DialogActions>
          <DarAlta data={paciente} send={() => setOpenS(false)} />
          <Button autoFocus onClick={handleClose} color="warning">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table
            size="small"
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {CamasTabla().map((column, index) => (
                  <StyledTableCell align="center" key={index}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {camas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow hover tabIndex={-1} key={index}>
                      <StyledTableCell align="center">
                        <Label color={row.data().Estado ? "success" : "error"}>{sentenceCase(row.data().Estado ? "Activo" : "Inactivo")}</Label>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Nombre}
                      </StyledTableCell>


                      <StyledTableCell align="center" style={{ width: "30%" }}>

                        {rol.asignarEquipo ? <Autocomplete
                          value={row.data()?.Equipo && { id: JSON.parse(row.data()?.Equipo).id, label: JSON.parse(row.data()?.Equipo).Codigo }}
                          disableClearable={true}
                          disabled={!row.data().Estado }
                          onChange={(event, newValue) => {
                            asignarEquipo(newValue.id, row.id);
                          }}
                          id="controllable-states-demo"
                          options={equipos.map((option, index) => ({
                            key: index,
                            id: option.id,
                            label: option.data()?.Codigo || ""
                          }))}
                          renderInput={(params) => (
                            <TextField {...params} label="Equipos" />
                          )}
                        /> : row.data().Equipo}

                      </StyledTableCell>
                      <StyledTableCell>
                        <Grid
                          container
                          spacing={0}
                        >
                          {row.data().DatosPaciente && <Grid>
                            <Tooltip title="Paciente">
                              <IconButton
                                aria-label="Paciente"
                                onClick={() => daralta(row)}>
                                <AirlineSeatIndividualSuiteIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>}
                          <Grid>
                            {row.data().Equipo && <Grid>
                              <Tooltip title="Limpiar bomba">
                                <IconButton
                                  aria-label="Limpiar bomba"
                                  onClick={() => limpiarBomba(row.id, row.data().IdEquipo)}
                                >
                                  <AutoDeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>}
                          </Grid>
                          {row.data().Estado && <Grid>
                            <New
                              aria-label="editar"
                              IdHospital={IdHospital}
                              habitacion={habitacion}
                              area={area}
                              data={row}
                            />
                          </Grid>}

                          <Grid>
                            <Tooltip title={!row.data().Estado ? "Activar" : "Desactivar"}>
                              <IconButton
                                aria-label={!row.data().Estado ? "Activar" : "Desactivar"}
                                onClick={() => desactivarRegistro(row)}>
                                {row.data().Estado ? <RestoreFromTrashIcon /> : <CheckCircleOutlineIcon />}
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          {row.data().Estado && <Grid>
                            <Tooltip title="Eliminar">
                              <IconButton
                                aria-label="Eliminar"
                                onClick={() => eliminaRegistro(row)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>}
                        </Grid>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


      <TablePagination
        labelRowsPerPage={"Filas por página"}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={camas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
export default Index;
