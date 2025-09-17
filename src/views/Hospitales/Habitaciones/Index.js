import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Tooltip, IconButton, } from '@mui/material';
import Box from "@mui/material/Box";
import New from "./New/New";
import Cama from "../Cama/Cama";
import { StyledTableRow, StyledTableCell } from "./../../../styles";
import { useSnackbar } from "notistack";
import { Autocomplete } from "../../../components";
import { sentenceCase } from 'change-case';
import { HabitacionesService, EnfermerosService, CamaService } from "@services";
import useAuth from "../../../contextapi/hooks/useAuth";
import { Container, confirmDialog, Label } from "@components";
import { HabitacionesTabla } from "@config"
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Index = (props) => {
  
  const { area } = props;
  const IdArea = area.id;
  const { user } = useAuth();
  let rol = user?.Rol;
  const [habitaciones, setHabitaciones] = React.useState([]);
  const [camas, setCamas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const IdHospital = props.IdHospital;
  const { enqueueSnackbar } = useSnackbar();
  const [enfermeros, setEnfermeros] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getEnfermeros();
    getHabitacionesByArea();
    getCamasByArea();
  }, [getCamasByArea, getEnfermeros, getHabitacionesByArea]);



  const getEnfermeros = React.useCallback(() => {
    EnfermerosService.getEnfermerosByHospital(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setEnfermeros(Items);
        },
      },
      IdHospital
    );

  }, [IdHospital]);
  const getHabitacionesByArea = React.useCallback(() => {
    HabitacionesService.getHabitacionesByArea(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setHabitaciones(Items);
        },
      },
      IdHospital,
      IdArea,

    );
  }, [IdArea, IdHospital]);

  const getCamasByArea = React.useCallback(() => {
    CamaService.getCamasByArea2(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setCamas(Items);
          setLoading(false);

        },
      },
      IdHospital,
      IdArea
    );

  }, [IdArea, IdHospital]);


  const asignarEnfermero = (valor, item) => {
    const valorInfo = enfermeros.find(x => x.data().Cedula === valor);
    item.idEncargado = valor;
    item.datosEncargado = valorInfo.data();
    update(item);
  };
  const update = (item) => {
    HabitacionesService.asignarEnfermero(item, IdHospital, item.id).then((rss) => {
      enqueueSnackbar("Enfermero asignado correctamente", {
        variant: "success",
      });
    });
  };
  const cambasByHabitacionEstado = (tipo, estado, IdHabitacion) => {
    const camasFiltradas = camas.filter((x) => x.data().IdHabitacion === IdHabitacion);

    if (tipo == 1) {
      const filter = camasFiltradas.filter((x) => x.data().EstadoCama === estado);
      return filter.length
    } else {
      const filter = camas.filter((x) => x.data().IdHabitacion === IdHabitacion);
      return filter.length
    }


  }
  const validarTipo = (idTipo) => {
    switch (idTipo) {
      case 1:
        return "success";
      case 2:
        return "warning";
      case 3:
        return "error";
      case 4:
        return "info"
    }
  };
  const validarTexto = (row) => {
    const inregrsos = cambasByHabitacionEstado(2, 1, row.id);
    const libres = cambasByHabitacionEstado(1, 1, row.id);
    const ocupadas = cambasByHabitacionEstado(1, 2, row.id);
    return "Ingresadas:" + inregrsos.toString() + " Libres:" + libres.toString() + " Ocupadas:" + ocupadas.toString();

  };
  const desactivarRegistro = (Registro) => {
    let estado = !Registro.data().Estado ? "Activar" : "Desactivar";
    confirmDialog("¿Estás seguro que deseas " + estado + " el equipo " + Registro.data().Nombre + "?", () =>
      estadoRegistro(Registro, estado)
    );
  };
  const estadoRegistro = (Registro, estado) => {
    HabitacionesService.estadoRegistro(IdHospital, Registro).then(() => {
      enqueueSnackbar("Equipo " + estado + " correctamente", { variant: "success" });
    });
  };
  const eliminaRegistro = (Registro) => {
    confirmDialog('¿Estás seguro que deseas eliminar el equipo ' + Registro.data().Nombre + "?", () =>
      eliminarRegistro(Registro)
    );
  };
  const eliminarRegistro = (Registro) => {
    HabitacionesService.eliminarRegistro(IdHospital, Registro).then(() => {
      enqueueSnackbar("Equipo eliminado correctamente", { variant: "success" });
    });
  };
  return <Container loading={loading}>
    <Box mt={2}>
      {rol.agregarHabitaciones && <New info={IdHospital} IdArea={IdArea} />}
    </Box>
    <Box mt={2}>
      <TableContainer component={Paper}>
        <Table
          size="small"
          aria-label="customized table">
          <TableHead>
            <TableRow>
              {HabitacionesTabla().map((column, index) => (
                <StyledTableCell align="center" key={index}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {habitaciones
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((row, index) => {
                return (
                  <StyledTableRow hover tabIndex={-1} key={index}>
                    <StyledTableCell align="center">
                      <Label color={row.data().Estado ? "success" : "error"}>{sentenceCase(row.data().Estado ? "Activo" : "Inactivo")}</Label>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.data().Nombre}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.data().Capacidad}
                    </StyledTableCell>
                    <StyledTableCell align="center">

                      <Label color={validarTipo(4)}>{validarTexto(row)}</Label>
                    </StyledTableCell>

                    <StyledTableCell align="center" style={{ width: "20%" }}>
                      {rol.asignarEnfermero ?
                        <Autocomplete
                          value={row.data()?.idEncargado}
                          disableClearable={true}
                          disabled={!row.data().Estado }
                          onChangeValue={(newValue) => {
                            asignarEnfermero(newValue.id, row);
                          }}
                          opciones={enfermeros}
                          labelText="Enfermeros"
                        /> : row.data().datosEncargado ? JSON.parse(row.data().datosEncargado).Nombre + JSON.parse(row.data().datosEncargado).Apellido : null}


                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                      >
                       {row.data().Estado && <Grid>
                          <Tooltip title="Camas">
                            <Cama agregar={row.data().Capacidad > cambasByHabitacionEstado(2, 1, row.id)} IdHospital={IdHospital} area={area} habitacion={row} />

                          </Tooltip>
                        </Grid>}

                        {row.data().Estado &&  <Grid>
                          <New
                            aria-label="editar"
                            info={IdHospital}
                            data={row}
                            IdArea={IdArea}
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
                              aria-label="eliminar"
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
      count={habitaciones.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Container>

};
export default Index;
