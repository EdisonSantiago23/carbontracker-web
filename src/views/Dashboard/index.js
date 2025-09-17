import React from "react";
import PropTypes from "prop-types";
import { Container } from "../../components";
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { PacienteService,EquiposService,CamaService } from "@services";
import useAuth from "../../contextapi/hooks/useAuth";

import {
  AppCurrentVisits,

} from '../../components/ChartsDashboard';

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const IdHospital = user?.IdHospital;
  const [pacientes, setPacientes] = React.useState([]);
  const [equipos, setEquipos] = React.useState([]);
  const [camas, setCamas] = React.useState([]);

  const [loading, setLoading] = React.useState([]);

  React.useEffect(() => {
    if (IdHospital) {
      getPacientes();
      getEquipos();
      getCamas();
    }
  }, [getEquipos, getPacientes, IdHospital, getCamas]);
  const getPacientes = React.useCallback(() => {
    setLoading(true);
    PacienteService.getAllPacientes(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
          setPacientes(Items);

          setLoading(false);
        },
      },
      IdHospital,
    );
    setLoading(false);
  }, [IdHospital]);
  const getEquipos = React.useCallback(() => {
    setLoading(true);
    EquiposService.getAllEquipos(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
          setEquipos(Items);
          setLoading(false);
        },
      },
      IdHospital,
    );
    setLoading(false);
  }, [IdHospital]);
  const getCamas = React.useCallback(() => {
    setLoading(true);
    CamaService.getAllCamas(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
          setCamas(Items);

          setLoading(false);
        },
      },
      IdHospital,
    );
    setLoading(false);
  }, [IdHospital]);

  return (
    <Container loading={false}>
      <Grid container spacing={1}>

        {pacientes.length > 0 && <Grid item xs={12} md={4} lg={4}>
          <AppCurrentVisits
            title="Pacientes"
            chartData={[
              { label: 'Ingresados', value: pacientes.filter(word => word.EstadoPaciente === 1).length },
              { label: 'Sin asignar', value: pacientes.filter(word => word.Cama === null).length },
              { label: 'Dados de alta', value: pacientes.filter(word => word.EstadoPaciente === 2).length },
            ]}
            subheader="Gestión de pacientes"
            chartColors={[
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.warning.main,
            ]}
          />
        </Grid>}
        {pacientes.length > 0 && <Grid item xs={12} md={4} lg={4}>
          <AppCurrentVisits
            title="Equipos"
            chartData={[
              { label: 'Ocupados', value: equipos.filter(word => word.EstadoEquipo === 2).length },
              { label: 'Libre', value: equipos.filter(word => word.EstadoEquipo === 1).length },
              { label: 'Reportados', value: equipos.filter(word => word.EstadoEquipo === 3).length },
            ]}
            subheader="Gestión de equipos"
            chartColors={[
              theme.palette.primary.main,
              theme.palette.info.light,
              theme.palette.warning.main,
            ]}
          />
        </Grid>}
        {camas.length > 0 && <Grid item xs={12} md={4} lg={4}>
          <AppCurrentVisits
            title="Camas"
            chartData={[
              { label: 'Ocupados', value: camas.filter(word => word.EstadoCama === 2).length },
              { label: 'Libre', value: camas.filter(word => word.EstadoCama === 1).length },
            ]}
            subheader="Gestión de equipos"
            chartColors={[
              theme.palette.primary.main,
              theme.palette.warning.main,
            ]}
          />
        </Grid>}
      </Grid>
    </Container>

  );
};

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
