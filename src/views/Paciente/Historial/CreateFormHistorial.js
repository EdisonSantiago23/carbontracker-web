import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Grid
} from '@mui/material';
import Table from "@mui/material/Table";
import useAuth from "../../../contextapi/hooks/useAuth";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ListAltSharp from "@material-ui/icons/ListAltSharp";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { Tooltip, IconButton, } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TabPanel from "./TabPanel";
import {StyledTableRow,StyledTableCell} from "@styles";
import { HistorialPacienteService, HabitacionesService } from "@services";
import {Iconify} from "@components";
const CreateForm = ({ className, send, data }) => {
  const columns = [
    { id: "name", label: "Fecha ingreso" },
    { id: "name", label: "Fecha salida" },
    { id: "apellido", label: "Área" },
    { id: "cedula", label: "Habitación" },
    { id: "edad", label: "Cama" },
    { id: "acciones", label: "Acciones" },
  ];
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ishistorial, setIsHistorial] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [Historial, setHistorial] = React.useState([]);
  const [selectHistorial, setselectHistorial] = React.useState();
  const [enfermeroTurno, setEnfermeroTurno] = React.useState("");
  const [enfermeroTurnoGuardar, setEnfermeroTurnoGuardar] = React.useState("");

  const rol = user.Rol;
  const IdHospital = user.IdHospital;


  React.useEffect(() => {
    getHistorial();
  }, [getHistorial]);
  const getHistorial = React.useCallback(() => {
    setLoading(true);
    HistorialPacienteService.getHistorialByUser(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setHistorial(Items);
        },
      },
      IdHospital,
      data.id
    );
    setLoading(false);
  }, [data.id, IdHospital]);

  const getHabitacion = React.useCallback((id) => {
    setLoading(true);
    HabitacionesService.getHabitacionById(IdHospital, id).then((res) => {
      setEnfermeroTurno(JSON.parse(res.data().datosEncargado)?.Nombre + " " + JSON.parse(res.data().datosEncargado)?.Apellido)
      setEnfermeroTurnoGuardar(JSON.parse(res.data().datosEncargado))
    })
    setLoading(false);
  }, [IdHospital]);

  const confir = () => {
    setOpen(false);

  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (historial, estado) => {
    setIsHistorial(estado)
    setselectHistorial(historial);
    getHabitacion(historial.data().IdHabitacion)
    setOpen(true);
  };

  return (
    <Box mt={2}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={'xl'}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid>
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              Dósis del pacientes
            </DialogTitle>
          </Grid>
          <Grid>
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              {"Enfermero de turno: "} {enfermeroTurno}
            </DialogTitle>
          </Grid>


        </Grid>


        <DialogContent>
          <TabPanel DatosPaciente={data} historial={selectHistorial} isHistorial={ishistorial} enfermeroTurno={enfermeroTurnoGuardar} />
        </DialogContent>
        <DialogActions>
          <Button onClick={confir} >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table
          size="small"
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <StyledTableCell align="center" key={index}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Historial.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row, index) => {
              return (
                <StyledTableRow hover tabIndex={-1} key={index}>
                  <StyledTableCell align="center">
                    {moment(row.data().FechaIngreso?.seconds * 1000).format(
                      "YYYY-MM-DD"
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.data()?.FechaSalida && <Grid>
                      {moment(row.data()?.FechaSalida?.seconds * 1000).format("YYYY-MM-DD")}
                    </Grid>}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {JSON.parse(row.data().Area).Nombre}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {JSON.parse(row.data().Habitacion).Nombre}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {JSON.parse(row.data().Cama).Nombre}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Grid
                      container
                      spacing={0}
                      alignItems="center"
                      justifyContent="left"
                    >
                      <Grid> {!row.data().FechaSalida &&
                        <Tooltip title="Dósis">
                          <IconButton
                            aria-label="Dósis"
                            onClick={() => handleOpen(row, true)}
                          >
                            <VaccinesIcon />
                          </IconButton>
                        </Tooltip>}
                      </Grid>
                      <Grid> {rol.historialPaciente && 
                        <Tooltip title="Historial dosis">
                          <IconButton
                            aria-label="Historial"
                            onClick={() => handleOpen(row, false)}
                          >
                            <ListAltSharp />
                          </IconButton>
                        </Tooltip>}
                      </Grid>
                      <Grid>
                        <Iconify icon={'material-symbols:patient-list-outline-rounded'} tooltip={'Ficha paciente'} link={"/jefeAdmin/hospitales/Paciente/ficha/" + row.id} />
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

CreateForm.propTypes = {
  className: PropTypes.string,
};

export default CreateForm;
