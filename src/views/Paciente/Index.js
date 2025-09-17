import React, { useState } from "react";
import { Tooltip, IconButton } from '@mui/material';
import useAuth from "../../contextapi/hooks/useAuth";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "../../components/CustomButtons/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import StartIcon from '@mui/icons-material/Start';
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { PacienteService } from "@services";
import { Grid, Box, TableCell, TableRow } from "@mui/material";
import { sentenceCase } from "change-case";
import { PacientesTabla } from "@config";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TablePage, ContentForm, Label, Container, confirmDialog, Iconify } from "@components";
import CreateForm from "./CreateForm";
import CreateFormAlta from "./CreateFormAlta";
import CreateFormHistorial from "./Historial/CreateFormHistorial";


const Index = () => {
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  let nombre = 'Paciente';
  const [filteredData, setFilteredData] = React.useState({ data: [], page: 0, rowsPerPage: 5 });

  const { enqueueSnackbar } = useSnackbar();
  const [pacientes, setPacientes] = React.useState([]);
  const { user } = useAuth();
  const IdHospital = user.IdHospital;

  const filtro = [
    { id: 1, label: "Ingresados" },
    { id: 2, label: "Dados de alta" },
    { id: 3, label: "Todos" },
  ];

  const [filtroSelect, setFiltroSelect] = useState(1);
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    getPacientes();
  }, [getPacientes]);
  const getPacientes = React.useCallback(() => {
    datosPacientesFilter(filtroSelect);
  }, [datosPacientesFilter, filtroSelect]);
  const datosPacientesFilter = React.useCallback((estado) => {
    setLoading(true);
    PacienteService.getPacientesByEstado(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setPacientes(Items);
          setLoading(false);
        },
      }, IdHospital, estado);
    setLoading(false);
  }, [IdHospital]);
  const datosPacientesAllFilter = React.useCallback((estado) => {
    setLoading(true);
    PacienteService.getAllPacientes(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setPacientes(Items);
          setLoading(false);
        },
      },
      IdHospital
    );
    setLoading(false);
  }, [IdHospital]);

  const submit = async () => {
    getFiltro();
  };

  const getFiltro = () => {
    PacienteService.getPacienteByCedula(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setPacientes(Items);
        },
      },
      IdHospital,
      email
    );
    setLoading(false);
  };

  const buscarPacientes = (inf) => {
    setFiltroSelect(inf);
    if (inf === 3) {
      datosPacientesAllFilter();
    } else {
      datosPacientesFilter(inf);
    }
  };
  const limpiar = () => { };
  const validarTipo = (idTipo) => {
    switch (idTipo) {
      case 1:
        return "success";
      case 2:
        return "warning";
      case 3:
        return "error";
      case 4:
        return "info";
    }
  };
  const validarNombre = (idTipo) => {
    switch (idTipo) {
      case 1:
        return "Ingresado";
      case 2:
        return "Dado de alta";
    }
  };
  const desactivarRegistro = (Registro) => {
    let estado = !Registro.data().Estado ? "Activar" : "Desactivar";
    confirmDialog(
      "¿Estás seguro que deseas " +
      estado +
      " el paciente " +
      Registro.data().Nombre +
      "?",
      () => estadoRegistro(Registro, estado)
    );
  };
  const estadoRegistro = (Registro, estado) => {
    PacienteService.estadoRegistro(IdHospital, Registro).then(() => {
      enqueueSnackbar("Paciente " + estado + " correctamente", {
        variant: "success",
      });
    });
  };
  const eliminaRegistro = (Registro) => {
    confirmDialog(
      "¿Estás seguro que deseas eliminar el paciente " +
      Registro.data().Nombre +
      "?",
      () => eliminarRegistro(Registro)
    );
  };
  const eliminarRegistro = (Registro) => {
    PacienteService.eliminarRegistro(IdHospital, Registro).then(() => {
      enqueueSnackbar("Equipo eliminado correctamente", { variant: "success" });
    });
  };
  const reingresar = (Registro) => {
    let estado = "Reingresar";
    confirmDialog(
      "¿Estás seguro que deseas " +
      estado +
      " el paciente " +
      Registro.data().Nombre +
      "?",
      () => estadoReingreso(Registro)
    );
  };
  const estadoReingreso = (Registro) => {
    PacienteService.updateEstadoPaciente(IdHospital, Registro.id, 1).then(() => {
      enqueueSnackbar("Paciente reingresado correctamente", {
        variant: "success",
      });
    });
  };
  const obtenerFIltrado = (res) => {
    setTimeout(() => {
      setFilteredData(res)
    }, 100);
  }
  return (
    <Container loading={loading} titulo={nombre} component={<ContentForm openModal={openModal} content={<CreateForm tieneCama={true} close={() => setOpenModal(false)} />} />}>

      <Box mt={2}>
        <Grid container spacing={3} alignItems="center">

          <Grid item={true} sm={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Número de cédula"
              autoFocus
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </Grid>
          <Grid item={true} sm={3}>
            <Button color="primary" onClick={submit}>
              BUSCAR
            </Button>
            <Button color="danger" onClick={() => limpiar()}>
              Limpiar
            </Button>
          </Grid>
          <Grid item={true} sm={3}>
            <Typography component={"span"} variant="h5" color="textPrimary">
              Tipo de búsqueda
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filtroSelect}
              label="Age"
              style={{ width: 150 }}
              onChange={(e) => buscarPacientes(e.target.value)}
            >
              {filtro.map((row, index) => {
                return (
                  <MenuItem key={index} value={row.id}>
                    {row.label}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <TablePage
          titulo={nombre}
          Cabecera={PacientesTabla()}
          Lista={pacientes}
          returnList={obtenerFIltrado}
          contenidoTabla={filteredData.data.slice(filteredData.page * filteredData.rowsPerPage, filteredData.page * filteredData.rowsPerPage + filteredData.rowsPerPage).map((row, index) => {
            const { Estado, EstadoPaciente, Habitacion, Nombre, Apellido, Cedula } = row.data();
            return (
              <TableRow hover key={index.toString()} tabIndex={-1} >
                <TableCell align="left">
                  <Label color={Estado ? "success" : "error"}>
                    {sentenceCase(Estado ? "Activo" : "Inactivo")}
                  </Label>
                </TableCell>
                <TableCell align="left">
                  <Label color={validarTipo(EstadoPaciente)}>
                    {sentenceCase(validarNombre(EstadoPaciente))}
                  </Label>
                </TableCell>
                <TableCell align="left">{Nombre}</TableCell>
                <TableCell align="left">{Apellido}</TableCell>
                <TableCell align="left">{Cedula}</TableCell>
                <TableCell align="left">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    {/* {Estado && (
                      <Grid>
                        <ContentForm
                          titulo={'Ingresos'}
                          icono={"game-icons:medicine-pills"}
                          openModal={openModal}
                          content={<CreateFormHistorial
                            data={row}
                            close={() => setOpenModal(false)} />}
                        />
                      </Grid>
                    )} */}
                    {/* {Habitacion && EstadoPaciente === 1 && (
                      <Grid>
                      <ContentForm
                          titulo={"Dar de alta"}
                          icono={"material-symbols:outpatient"}
                          openModal={openModal}
                        content={<CreateFormAlta
                          data={row}
                          close={() => setOpenModal(false)} />}
                      />
                    </Grid>
                    )} */}

                    <Grid>
                      <ContentForm
                        titulo={"Dar de alta"}
                        icono={"material-symbols:outpatient"}
                        openModal={openModal}
                        content={<CreateFormAlta
                          data={row}
                          close={() => setOpenModal(false)} />}
                      />
                    </Grid>

                  </Grid>
                </TableCell>
                <TableCell align="left">
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justifyContent="center">
                    {/* {Estado && EstadoPaciente == 1 && (
                      <Grid>
                        <ContentForm
                           titulo={"Asignar cama"}
                           icono={"uil:stretcher"}
                          data={row}
                          openModal={openModal}
                          content={<CreateForm
                            data={row}
                            tieneCama={false}
                            close={() => setOpenModal(false)} />}
                        />
                      </Grid>
                    )} */}
                    {Estado && EstadoPaciente == 1 && (
                      <Grid>
                        <ContentForm
                          data={row}
                          titulo={"Editar"}
                          openModal={openModal}
                          content={<CreateForm
                            data={row}
                            tieneCama={true}
                            close={() => setOpenModal(false)} />}
                        />

                      </Grid>
                    )}
                    {Estado && EstadoPaciente == 2 && (
                      <Grid>
                        <Tooltip
                          title={"Reingresar"}>
                          <IconButton
                            aria-label={"Reingresar"}
                            onClick={() => reingresar(row)}>
                            {<StartIcon />}
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    )}
                    {Estado && (
                      <Grid>
                        <Tooltip title="Historial clínico">
                          <Link
                            to={"/jefeAdmin/hospitales/Paciente/historial/" + row.id}>
                            <IconButton aria-label="Historial clínico">
                              <FolderSharedIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      </Grid>
                    )}

                    {/* <Grid>
                      <Tooltip
                        title={
                          !Estado ? "Activar" : "Desactivar"
                        }>
                        <IconButton
                          aria-label={
                            !Estado
                              ? "Activar"
                              : "Desactivar"
                          }
                          onClick={() => desactivarRegistro(row)}>
                          {Estado ? (
                            <RestoreFromTrashIcon />
                          ) : (
                            <CheckCircleOutlineIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Grid> */}
                    {/* {Estado && EstadoPaciente == 1 && (
                      <Grid>
                        <Tooltip title="Eliminar">
                          <IconButton
                            aria-label="eliminar"
                            onClick={() => eliminaRegistro(row)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    )} */}
                  </Grid>
                </TableCell>

              </TableRow>
            )
          })}
        />
      </Box>

    </Container>
  );
};
export default Index;
