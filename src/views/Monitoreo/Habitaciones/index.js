import React, { useCallback } from "react";
import Paper from "@mui/material/Paper";
import useAuth from "../../../contextapi/hooks/useAuth";
import { Typography } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import Button from "../../../components/CustomButtons/Button";
import {StyledTableRow,StyledTableCell} from "@styles";
import TableRow from "@mui/material/TableRow";
import { EquiposService, HabitacionesService,CamaService } from "@services";
import EtiquetasMonitoreo from "../../../components/EtiquetasMonitoreo";
import ContenedorAlarma from "../../../components/ContenedorAlarma";
import Box from "@mui/material/Box";

function Index(props) {
  const [habitaciones, setHabitaciones] = React.useState([]);
  const [camas, setCamas] = React.useState([]);
    const { user, IdArea } = useAuth();

  const IdHospital =user?.IdHospital;  
  const [page, setPage] = React.useState(0);
  const [encargado, setEncargado] = React.useState(0);
  const [numero, setNumero] = React.useState(0);
  const [cama, setCama] = React.useState([]);
  const columns = [
    { id: "time", label: "Nombre" },
    { id: "time", label: "Apellido" },
    { id: "time", label: "Diagnostico" },
  ];
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [equipos, setEquipos] = React.useState([]);
  const [validator, SetValidator] = React.useState(1);
  const [opens, setOpens] = React.useState(false);

  React.useEffect(() => {
    if (IdArea) {
      getPacientes();
      getHabicionesArea()
      getCamasByArea()
    }
    
  }, [getPacientes, getHabicionesArea, IdArea, getCamasByArea]);
  const getPacientes = React.useCallback(() => {
    try {
      EquiposService.getEquiposByArea(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);

            setEquipos(Items);
          },
        },
        IdArea,
        IdHospital
      );
    } catch (error) {
    }
  }, [IdHospital, IdArea]);
  const getHabicionesArea = React.useCallback(() => {
    try {
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
    } catch (error) {
    }
  }, [IdHospital, IdArea]);



  const getCamasByArea = React.useCallback(() => {
    CamaService.getCamasByArea2(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setCamas(Items);

        },
      },
      IdHospital,
      IdArea
    );

  }, [IdArea, IdHospital]);

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

  const cambasByHabitacionEstado=(tipo,estado,IdHabitacion)=>{
    const camasFiltradas = camas.filter((x) => x.data().IdHabitacion === IdHabitacion);

    if(tipo ==1){
      const filter = camasFiltradas.filter((x) => x.data().EstadoCama === estado);
      return filter.length
    }else{
      const filter = camas.filter((x) => x.data().IdHabitacion === IdHabitacion);
      return filter.length
    }

  }
  const selectHB = (valor) => {
    if (valor.data().datosEncargado) {
      setEncargado(JSON.parse(valor.data().datosEncargado));
      setNumero(valor.data().Nombre);
    }
    getBombas(valor.id);
  };
  const handleClose = () => {
    setOpens(false);
  };
  const getBombas = (idHabitacion) => {
    setOpens(true);

    EquiposService.getEquipsByHabitacionCamas(
      {
        next: (querySnapshot) => {
          setCama([]);
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setCama(Items);
        },
      },
      IdHospital,
      idHabitacion
    );
  };
  return (
    <Box mt={2}>
      <Dialog
        open={opens}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xl"}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography component={'span'} variant="h3" color="textPrimary">
            Encargado: {encargado.Nombre} {encargado.Apellido} | {numero}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow style={{ height: 100 }}>
                  {columns.map((column, index) => (
                    <StyledTableCell
                      align="center"
                      style={{ width: "300px", fontSize: 30 }}
                      key={index}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cama
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    let paciente = JSON.parse(row.data().DatosPaciente);
                    if (row.data().IdPaciente) {
                      return (
                        <StyledTableRow hover tabIndex={-1} key={index}>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: 30 }}
                          >
                            {paciente.Nombre}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: 30 }}
                          >
                            {paciente.Apellido}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ width: "200px", fontSize: 30 }}
                          >
                            {paciente.Diagnostico}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    } else {
                      if (index === 0) {
                        return (
                          <StyledTableRow hover tabIndex={-1} key={index}>
                            <StyledTableCell
                              align="center"
                              style={{ fontSize: 30 }}
                            >
                              {"Libre"}
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              style={{ fontSize: 30 }}
                            >
                              {"Libre"}
                            </StyledTableCell>

                            <StyledTableCell
                              align="center"
                              style={{ fontSize: 30, width: "200px" }}
                            >
                              {"Libre"}
                            </StyledTableCell>
                            
                          </StyledTableRow>
                        );
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          flexDirection: "row",
        }}
      >
        <EtiquetasMonitoreo texto={"Alarma encendida"} color={"#EC4D43"} />
        <EtiquetasMonitoreo texto={"Con disponibilidad"} color={"#2DC639"} />
        <EtiquetasMonitoreo texto={"Sin disponibilidad"} color={"#FFC000"} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: 20,
          padding: 10,
          flexDirection: "row",
        }}
      >
        {habitaciones 
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row,index) => {
            return (
              <ContenedorAlarma
                Nombre={row.data().Nombre}
                key={index}
                selectHB={() => selectHB(row)}
                campana={
                  equipos
                    .filter(
                      (x) => x.data().IdHabitacion === row.id
                    )
                    .filter((x) => x.data().Valor === 1).length > 0
                }
                color={
                  equipos.filter((x) => x.data().IdHabitacion === row.id)
                    .filter((x) => x.data().Valor === 1).length > 0
                    ? validator === 0
                      ? "#EC4D43"
                      : "#113CA0"
                    : row.data().Capacidad > cambasByHabitacionEstado(1,2,row.id)
                      ? "#2DC639"
                      : "#FFC000"
                }
              />
            );
          })}
      </div>
    </Box>
  );
}

export default Index;
