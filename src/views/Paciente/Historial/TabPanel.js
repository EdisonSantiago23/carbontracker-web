import React from "react";
import { sentenceCase } from 'change-case';
import useAuth from "../../../contextapi/hooks/useAuth";
import {
  Grid,
  TextField,
  Typography, Checkbox, Button, TableCell
} from '@mui/material';
import AppWidgetSummary from "../../../components/AppWidgetSummary/AppWidgetSummary";
import { StyledTableRow, StyledTableCell } from "@styles";

import moment from "moment";
import { useSnackbar } from "notistack";
import { TratamientoService, EstadosService, MedicamentoService, CombinacionesService } from "@services";
import { Stack, Autocomplete } from '@mui/material';
import { Table, Box, TableBody, TableHead, TableRow } from '@mui/material';
import { MedicamentosCombinaTabla } from "@config"
import Gotosensibles from "../../../assets/img/Gotosensibles.png";
import normales from "../../../assets/img/normales.jpeg";
import { Card, CardContent, CardHeader } from "@mui/material";
import { TablePage, ContentForm, Label, Container, confirmDialog, Iconify } from "@components";

const Index = (props) => {
  const { isHistorial, DatosPaciente, enfermeroTurno, historial } = props;
  let nombre = 'Paciente';

  const { user } = useAuth();
  const IdHospital = user.IdHospital;
  const [filteredData, setFilteredData] = React.useState({ data: [], page: 0, rowsPerPage: 5 });

  const [usuario, setUsuarios] = React.useState([]);
  const [combinacionesDetalle, setCombinacionesDetalle] = React.useState([]);
  const [tipo, setTipo] = React.useState(4);
  const [unavia, setUnavia] = React.useState(true);
  const [estado, setEstado] = React.useState(null);
  const [detalle, setDetalle] = React.useState("");
  const [medicamentos, setMedicamentos] = React.useState([]);

  const [medicamento1, setMedicamento1] = React.useState([]);
  const [medicamento1Id, setMedicamento1Id] = React.useState(null);
  const [medicamento2Id, setMedicamento2Id] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [estados, setEstados] = React.useState([]);



  React.useEffect(() => {
    getTratamiento();
    getMedicamentos();
    getEstados();
  }, [getTratamiento, getMedicamentos, getEstados]);
  const getEstados = React.useCallback(() => {
    EstadosService.getEstados(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setEstados(Items);

        },
      }
    );
  }, []);
  const getTratamiento = React.useCallback(() => {
    TratamientoService.getTratamiento(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setUsuarios(Items);
          if (Items.length > 0) {
            setMedicamento1(Items[0]);
            getCombinacionesByMedicamentos(Items[0].data().MedicamentoId);
          }
        },
      },
      IdHospital,
      DatosPaciente.id,
      historial.id
    );
  }, [DatosPaciente.id, historial.id, IdHospital]);
  const getMedicamentos = React.useCallback(() => {
    MedicamentoService.getMedicamentos(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setMedicamento1(Items);
          setMedicamentos(Items)
        },
      },
      IdHospital
    );
  }, [IdHospital]);
  const getCombinacionesByMedicamentos = (diMedicamento) => {
    CombinacionesService.getCombinacionesByMedicamento(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setCombinacionesDetalle(Items);
        },
      },
      diMedicamento
    );
  };


  const { enqueueSnackbar } = useSnackbar();

  const validador = (e) => {
    setMedicamento1Id(e);
    getCombinacionesByMedicamentos(e.id);

    if (combinacionesDetalle.length > 0) {
      let resultado = combinacionesDetalle.filter(
        (x) => x.data().medicamentoAcombinarId === e.id
      );

      if (resultado.length > 0) {
        setTipo(resultado[0].data().tipo);
      } else {
        setTipo(4);
      }
    }
  };
  const validador2 = (e) => {
    setMedicamento2Id(e)
    if (combinacionesDetalle.length > 0) {
      let resultado = combinacionesDetalle.filter(
        (x) => x.data().medicamentoAcombinarId === e.id
      );

      if (resultado.length > 0) {
        setTipo(resultado[0].data().tipo);
      } else {
        setTipo(4);
      }
    }
  };

  const submit = async () => {
    const data = [];
    if (!unavia) {
      const pacienteData = medicamentos.find((x) => x.id == medicamento1Id.id);
      const pacienteDatasA = pacienteData.data();
      pacienteDatasA.Id = pacienteData.id;
      data.push(pacienteDatasA)

    } else {
      const pacienteDatas = medicamentos.find((x) => x.id == medicamento2Id.id);
      const pacienteDatasA = pacienteDatas.data();
      pacienteDatasA.Id = pacienteDatas.id;


      const pacienteData = medicamentos.find((x) => x.id == medicamento1Id.id);
      const pacienteDatasB = pacienteData.data();
      pacienteDatasB.Id = pacienteData.id;


      data.push(pacienteDatasA)
      data.push(pacienteDatasB)

    }
    const estadoInfo = estados.find((x) => x.id == estado.id);

    const formInfo = {
      detalle: detalle,
      data: data,
      estado: estadoInfo,
      enfermeroTurno: enfermeroTurno
    }

    TratamientoService.newTratamiento(
      formInfo,
      IdHospital,
      DatosPaciente.id,
      historial.id,
      tipo,
    ).then(() => {
      enqueueSnackbar("Tratamiento creado correctamente", {
        variant: "success",
      });
    });

  };
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
  const validarNombre = (idTipo) => {
    switch (idTipo) {
      case 1:
        return "Compatible";
      case 2:
        return "Com. variada";
      case 3:
        return "Incompatibles";
      case 4:
        return "Sin Datos"
    }
  };

  const BasicAlerts = (tipos) => {
    return (
      <Stack   >
        {tipo === 1 && (
          <AppWidgetSummary title="Compatible" color={"success"} color2={"rgba(84, 214, 44, 0.16)"} icon={'mdi:bookmark-check'} />
        )}
        {tipo === 2 && (
          <AppWidgetSummary title="Compatibilidad variada" color={"warning"} color2={"rgba(255, 193, 7, 0.16)"} icon={'mdi:information-slab-circle-outline'} />
        )}
        {tipo === 3 && (
          <AppWidgetSummary title="Incompatibles" color={"error"} color2={"rgba(255, 72, 66, 0.16)"} icon={'mdi:alert-circle'} />
        )}
        {tipo === 4 && (
          <AppWidgetSummary title="Sin Datos" color={"info"} color2={"rgba(173, 237, 255 ,0.8)"} icon={'mdi:alert-outline'} />
        )}
      </Stack>
    );
  };

  const defaultOptions = {
    options: medicamento1.length > 0 ? medicamento1.map((option) => ({
      id: option.id,
      label: option.data().Nombre,
    })) : [],
    getOptionLabel: (options) => options.label
  }
  const defaultOptions2 = {
    options: combinacionesDetalle.length > 0 ? combinacionesDetalle.map((option) => ({
      id: option.data().medicamentoAcombinarId,
      label: option.data().medicamento,
    })) : [],
    getOptionLabel: (options) => options.label
  }
  const defaultOptions3 = {
    options: estados.length > 0 ? estados.map((option) => ({
      id: option.id,
      label: option.data().Nombre,
    })) : [],
    getOptionLabel: (options) => options.label
  }
  const handleChanges = (event) => {
    setUnavia(!unavia);
  };
  const obtenerFIltrado = (res) => {
    setTimeout(() => {
      setFilteredData(res)
    }, 100);
  }
  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        <Typography component={'span'} variant="h5" color="textPrimary">
          Medicamentos
        </Typography>
      </Grid>

      {isHistorial && <Grid container spacing={3}>

        <Grid item xs={12} md={10} lg={10}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={3} lg={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Checkbox checked={unavia} onChange={handleChanges} />

                <Typography component={'span'}>¿Dos vias?</Typography>
              </Stack>
              <Autocomplete
                {...defaultOptions3}
                id="controlled-demo"
                value={estado}
                disableClearable={true}

                onChange={(event, newValue) => {
                  setEstado(newValue);
                }}

                renderInput={(params) => (
                  <TextField {...params} label="Tipo de ingreso" />
                )}
              />

              <Grid item xs={12} paddingTop={2} >
                <TextField
                  value={detalle}
                  variant="outlined"
                  placeholder="Comentario"
                  multiline
                  fullWidth
                  onChange={(e) => {
                    setDetalle(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} paddingTop={2} >

                <Button variant="contained" onClick={submit}>
                  APLICAR DOSIS
                </Button>
              </Grid>

            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <Card>
                <CardHeader
                  component={Typography}
                  title={"Medicamento 1"} />
                <CardContent >
                  <Autocomplete
                    {...defaultOptions}
                    id="controlled-demo"
                    value={medicamento1Id}
                    onChange={(event, newValue) => {
                      validador(newValue);
                    }}
                    disableClearable={true}

                    renderInput={(params) => (
                      <TextField {...params} label="Medicamento 1" />
                    )}
                  />
                  <Box>
                    <img
                      alt="Imagen"
                      width={150}
                      height={170}
                      src={normales}
                    />
                  </Box>
                </CardContent>
              </Card>


            </Grid>
            {unavia && (
              <Grid item xs={12} md={3} lg={3}>
                <Card>
                  <CardHeader
                    component={Typography}
                    title={"Medicamento 2"} />
                  <CardContent >
                    <Autocomplete
                      {...defaultOptions2}
                      disableClearable={true}
                      id="controlled-demo"
                      value={medicamento2Id}
                      onChange={(event, newValue) => {
                        validador2(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Medicamento 2" />
                      )}
                    />
                    <Box>
                      <img
                        alt="Imagen"
                        width={150}
                        height={170}
                        src={Gotosensibles}
                      />
                    </Box>
                  </CardContent>
                </Card>


              </Grid>
            )}


          </Grid>

        </Grid>
        <Grid item xs={12} md={2} lg={2}>
          {BasicAlerts(tipo)}

        </Grid>

      </Grid>}

      <Grid container style={{ marginTop: 10 }} >
        <TablePage
          titulo={nombre}
          Cabecera={MedicamentosCombinaTabla()}
          Lista={usuario}
          returnList={obtenerFIltrado}
          parametroFiltro={'Estado'}
          contenidoTabla={filteredData.data.slice(filteredData.page * filteredData.rowsPerPage, filteredData.page * filteredData.rowsPerPage + filteredData.rowsPerPage).map((row, index) => {
            const { FechaAsignacion, Estado, Detalle, EnfermeroTurno, Medicamentos,Tipo } = row.data();
            return (
              <TableRow hover key={index.toString()} tabIndex={-1} >
                <TableCell align="left">
                  {moment(FechaAsignacion?.seconds * 1000).format("YYYY-MM-DD [-] HH:mm:ss")}

                </TableCell>
                <TableCell align="left">
                  {Estado && JSON.parse(Estado)?.Nombre}

                </TableCell>
                <TableCell align="left">
                  {Detalle}
                </TableCell>

                <TableCell align="left">
                  {EnfermeroTurno && <Typography color="textPrimary">
                    {JSON.parse(EnfermeroTurno)?.Nombre + " " + JSON.parse(EnfermeroTurno)?.Apellido}
                  </Typography>}
                </TableCell>
                <TableCell align="left">
                  {Medicamentos && JSON.parse(Medicamentos).map((option) => (
                    <Typography color="textPrimary">
                      {"* "}{option.Nombre}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell align="left">
                <Label color={validarTipo(Tipo)}>{sentenceCase(validarNombre(Tipo))}</Label>

                </TableCell>
              </TableRow>
            )
          })}
        />
      </Grid>


    </Grid>
  );
}
export default Index;
