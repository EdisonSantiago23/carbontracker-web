import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "../../../components";
import { useParams } from "react-router-dom";
import { PacienteService, HistorialPacienteService } from '@services'
import useAuth from "../../../contextapi/hooks/useAuth";
import Persona from "../../../components/Persona";
import PersonaReferencia from "../../../components/PersonaReferencia";
import HistorialPersona from "../../../components/HistorialPersona";
import moment from "moment";


const Index = () => {
  const { idPaciente } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [paciente, setPaciente] = React.useState(false);
  const [historial, setHistorial] = React.useState([]);
  const { user } = useAuth();
  const threadKey = user.IdHospital;
  React.useEffect(() => {
    obtenerUsuarioById(idPaciente)
  }, [idPaciente, obtenerUsuarioById]);
  const obtenerUsuarioById = React.useCallback((id) => {
    PacienteService.getPacienteById(threadKey, id).then((res) => {
      setPaciente(res.data())
      getHistorial(res.id)
      setLoading(false)
    });
  }, [getHistorial, threadKey]);
  const getHistorial = React.useCallback((id) => {
    setLoading(true);
    HistorialPacienteService.getHistorialByUser(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setHistorial(Items);

        },
      },
      threadKey,
      id
    );
    setLoading(false);
  }, [threadKey]);
  return (
    <Container loading={loading} titulo={"Pacientes"}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6} lg={6}>
          <Persona
            nombre={paciente.Nombre}
            apellido={paciente.Apellido}
            cedula={paciente.Cedula}
            FechaNacimiento={paciente.FechaNacimiento} />
        </Grid>

        <Grid item xs={6} lg={6}>
          <PersonaReferencia
            nombre={paciente.NombreContacto}
            apellido={paciente.ApellidoContacto}
            cedula={paciente.CedulaContacto}
            celular={paciente.CelularContacto}
            parentezco={paciente.ParentezcoContacto} />
        </Grid>
      </Grid>
      {historial.map((res, index) => {
        return <HistorialPersona
          IdHistorial={res.id}
          IdPaciente={idPaciente}
          area={JSON.parse(res.data().Area).Nombre}
          habitacion={JSON.parse(res.data().Habitacion).Nombre}
          cama={JSON.parse(res.data().Cama).Nombre}
          equipo={JSON.parse(res.data().Equipo)}
          diagnostico={res.data().Diagnostico}
          detalleSalida={res.data().DetalleSalida}
          fechaIngreso={moment(res.data().FechaIngreso * 1000).format("YYYY-MM-DD")}
          fechaSalida={moment(res.data().FechaSalida * 1000).format("YYYY-MM-DD")}
        />
      })}



    </Container>
  );
};
export default Index;
