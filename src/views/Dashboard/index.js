import React from "react";
import PropTypes from "prop-types";
import { Container } from "../../components";
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { PacienteService,EquiposService,CamaService } from "@services";
import useAuth from "../../contextapi/hooks/useAuth";

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

      </Grid>
    </Container>

  );
};

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
