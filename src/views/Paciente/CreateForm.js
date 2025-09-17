import React, { Fragment } from "react";
import { Stack, Autocomplete } from "@mui/material";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField, Typography, Checkbox } from '@mui/material';
import AddShoppingCartIcon from "@material-ui/icons/Add";
import useAuth from "../../contextapi/hooks/useAuth";
import { PacienteService, EquiposService, HistorialPacienteService, AreaService, CamaService } from "@services";


const CreateForm = (props) => {
  const { close,tieneCama, data } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const rol = user.Rol;
  const [loading, setLoading] = React.useState(true);
  const [area, setArea] = React.useState(null);
  const [isArea, setIsArea] = React.useState(false);
  const [isHabitacion, setIsHabitacion] = React.useState(false);
  const [isCama, setIsCama] = React.useState(false);
  const [isEquipo, setIsEquipo] = React.useState(false);

  const [habitacion, setHabitacion] = React.useState(null);
  const [cama, setCama] = React.useState(null);
  const [IdEquipo, setIdEquipo] = React.useState(null);
  const [equipos, setEquipos] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [seguroPrivado, setSeguroPrivado] = React.useState(data?.data().SeguroPrivado || false);
  const [habitaciones, setHabitaciones] = React.useState([]);
  const [camas, setCamas] = React.useState([]);
  const IdHospital = user.IdHospital;
  React.useEffect(() => {
    getPacientes();
    getEquipoByEstado();
    cargarInfo()
  }, [cargarInfo, getEquipoByEstado, getPacientes]);
  const cargarInfo = React.useCallback(() => {

    if (data?.data().Area) {
      let area = JSON.parse(data?.data().Area)
      setIsArea(true)
      let dataArea = {
        id: data?.data().IdArea,
        label: area.Nombre
      }
      setArea(dataArea)
      getHabitaciones(dataArea)
    }
    if (data?.data().Habitacion) {
      let habitacion = JSON.parse(data?.data().Habitacion);
      setIsHabitacion(true)

      let dataHabitacion = {
        id: data?.data().IdHabitacion,
        label: habitacion.Nombre
      }
      setHabitacion(dataHabitacion)
    }

    if (data?.data().Cama) {
      let cama = JSON.parse(data?.data().Cama);
      setIsCama(true)

      let dataCama = {
        id: data?.data().IdCama,
        label: cama.Nombre
      }
      setCama(dataCama)
    }
    if (data?.data().Equipo) {
      let equipo = JSON.parse(data?.data().Equipo);
      setIsEquipo(true)

      let dataEquipo = {
        id: data?.data().IdEquipo,
        label: equipo.Codigo
      }
      setIdEquipo(dataEquipo)
    }
  }, [data, getHabitaciones]);

  const agregar = (values) => {
    PacienteService.newPaciente(values, IdHospital, seguroPrivado).then(() => {
      if (rol.asignarCama && data) {
        updatePaciente(values);
      } else {
        setLoading(false);
        enqueueSnackbar("Paciente creado correctamente", {
          variant: "success",
        });
        close();
      }
    });
  };

  const update = (values) => {
    let datosCamas = {}
    datosCamas.area = areas.find((x) => x.id == area?.id);
    datosCamas.habitacion = habitaciones.find((x) => x.id == habitacion?.id);
    datosCamas.cama = camas.find((x) => x.id == cama?.id);
    datosCamas.equipo = equipos.find((x) => x.id == IdEquipo?.id);
    PacienteService.updatePaciente(
      values, datosCamas,
      data.id,
      IdHospital,
      seguroPrivado
    ).then((rss) => {
      if (!tieneCama) {
        if (area && habitacion && cama && IdEquipo) {
          updatePaciente(values, datosCamas);

        } else {
          setLoading(false);
          enqueueSnackbar("Debes seleccionar la opciones", { variant: "error" });
        }
      } else {
        setLoading(false);
        enqueueSnackbar("Paciente actualizada correctamente", { variant: "success" });
        close();
      }

    });

  };

  const updatePaciente = (values, datosCamas) => {
    CamaService.asignarPaciente(values, datosCamas, IdHospital).then((rss) => {
      agregarHistorial(values, datosCamas);
    });
  };
  const agregarHistorial = (values, datosCamas) => {
    HistorialPacienteService.newHistoria(values, datosCamas, IdHospital).then(() => {
      updateEquipoByEstado(values)
    });

  };
  const updateEquipoByEstado = (values) => {
    let datosCamas = {}
    datosCamas.area = areas.find((x) => x.id == area.id);
    datosCamas.habitacion = habitaciones.find((x) => x.id == habitacion.id);
    datosCamas.cama = camas.find((x) => x.id == cama.id);
    datosCamas.equipo = equipos.find((x) => x.id == IdEquipo.id);
    EquiposService.updateEquipoByEstado(IdHospital, IdEquipo.id, values, datosCamas, 2).then((rss) => {
      setLoading(false);
      enqueueSnackbar("Paciente asignado correctamente", { variant: "success" });
      close();

    });
  };

  const getEquipoByEstado = React.useCallback(() => {
    EquiposService.getEquipoByEstado(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setEquipos(Items);

        },
      }, IdHospital);
  }, [IdHospital]);
  const getPacientes = React.useCallback(() => {
    AreaService.getAreaById(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setAreas(Items);
        },
      }, IdHospital);
    setLoading(false);
  }, [IdHospital]);
  const getHabitaciones = React.useCallback((value) => {
    setArea(value);
    setHabitaciones([]);
    setCamas([]);
    setHabitacion(null);
    setCama(null);
    AreaService.getHabitacionesByHospital(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setHabitaciones(Items);
        },
      }, IdHospital, value.id);
  }, [IdHospital]);

  const getCamas = (value) => {
    setHabitacion(value)
    setCama(null)
    setCamas([])
    EquiposService.getCamasByHabitacion(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setCamas(Items);
          setLoading(false);
        },
      }, IdHospital, value.id);
  };
  const getBomba = (value) => {
    setCama(value);
  };

  const defaultOptionsArea = {
    options: areas.length > 0 ? areas.map((option) => ({
      id: option.id,
      label: option.data().Nombre,
    })) : [],
    getOptionLabel: (options) => options.label
  }
  const defaultOptionsHabitacion = {
    options: habitaciones.length > 0 ? habitaciones.map((option) => ({
      id: option.id,
      label: option.data().Nombre,
    })) : [],
    getOptionLabel: (options) => options.label
  }
  const defaultOptionsCamas = {
    options: camas.length > 0 ? camas.map((option) => ({
      id: option.id,
      label: option.data().Nombre,
    })) : [],
    getOptionLabel: (options) => options.label
  }
  const defaultOptionsEquipos = {
    options: equipos.length > 0 ? equipos.map((option) => ({
      id: option.id,
      label: option.data().Codigo,
    })) : [],
    getOptionLabel: (options) => options.label
  }
  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Apellido: data?.data().Apellido || "",
        FechaNacimiento: data?.data().FechaNacimiento || "",
        Cedula: data?.data().Cedula || "",
        Diagnostico: data?.data().Diagnostico || "",
        NombreContacto: data?.data().NombreContacto || "",
        ApellidoContacto: data?.data().ApellidoContacto || "",
        CedulaContacto: data?.data().CedulaContacto || "",
        CelularContacto: data?.data().CelularContacto || "",
        ParentezcoContacto: data?.data().ParentezcoContacto || "",
      }}
      validationSchema={Yup.object().shape({
        Nombre: Yup.string()
          .required("¡Se requiere rellenar eleste campo!")
          .test("", "Campo Nombre se encuentra vacio", function vnombre(
            nombre
          ) {
            if (typeof nombre === "undefined") {
              return false;
            } else {
              nombre = nombre.trim();
              if (nombre == "") {
                return false;
              } else {
                return true;
              }
            }
          }),
        Apellido: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo Apellido se encuentra vacio", function vApellido(
            Apellido
          ) {
            if (typeof Apellido === "undefined") {
              return false;
            } else {
              Apellido = Apellido.trim();
              if (Apellido == "") {
                return false;
              } else {
                return true;
              }
            }
          }),
        FechaNacimiento: Yup.string()
          .required("¡Se requiere rellenar este campo!"),
        Cedula: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .max(20, "¡Maximo de 20 caracteres!")
          .matches(/^\d*\.?\d*$/gm, "¡Solo se admiten números!"),
        Diagnostico: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo Apellido se encuentra vacio", function vApellido(
            Apellido
          ) {
            if (typeof Apellido === "undefined") {
              return false;
            } else {
              Apellido = Apellido.trim();
              if (Apellido == "") {
                return false;
              } else {
                return true;
              }
            }
          }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);
        if (data) {
          update(values);
        } else {
          agregar(values);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <Fragment>
          {loading ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
            <form
              onSubmit={handleSubmit}
            >
              {tieneCama && <Grid container spacing={3}>

                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Nombre && touched.Nombre}
                    helperText={
                      errors.Nombre && touched.Nombre && errors.Nombre
                    }
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre del hospital"
                    variant="outlined"
                    fullWidth
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Apellido && touched.Apellido}
                    helperText={
                      errors.Apellido && touched.Apellido && errors.Apellido
                    }
                    label="Apellido"
                    name="Apellido"
                    placeholder="Apellido"
                    variant="outlined"
                    fullWidth
                    value={values.Apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Cedula && touched.Cedula}
                    label="Número de Cedula"
                    name="Cedula"
                    placeholder="Número de Cedula del residente"
                    variant="outlined"
                    fullWidth
                    value={values.Cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.Cedula && touched.Cedula && errors.Cedula
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.FechaNacimiento && touched.FechaNacimiento}
                    label="FechaNacimiento"
                    name="FechaNacimiento"
                    placeholder="FechaNacimiento"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true, required: true }}
                    value={values.FechaNacimiento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.FechaNacimiento && touched.FechaNacimiento && errors.FechaNacimiento}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    error={errors.Diagnostico && touched.Diagnostico}
                    helperText={
                      errors.Diagnostico &&
                      touched.Diagnostico &&
                      errors.Diagnostico
                    }
                    label="Diagnostico"
                    name="Diagnostico"
                    placeholder="Diagnostico"
                    variant="outlined"
                    fullWidth
                    value={values.Diagnostico}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Stack direction="row" spacing={1} alignItems="center">

                    <Typography component={'span'}>¿Tiene seguro privado?</Typography>
                    <Checkbox checked={seguroPrivado} onChange={() => setSeguroPrivado(!seguroPrivado)} />

                  </Stack>


                </Grid>
              </Grid>}
              {!tieneCama && <Grid container spacing={3}>
                {!data ||
                  (rol.asignarCama && (
                    <Grid container spacing={3}  paddingTop={5}>
              <Grid item xs={6} lg={6}>
                        <Autocomplete
                          {...defaultOptionsArea}
                          id="controlled-demo"
                          value={area}
                          disabled={isArea}
                          disableClearable={true}
                          onChange={(event, newValue) => {
                            getHabitaciones(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Áreas" />
                          )}
                        />

                      </Grid>
                      <Grid item xs={6} lg={6}>

                        <Autocomplete
                          {...defaultOptionsHabitacion}
                          id="controlled-demo"
                          value={habitacion}
                          disabled={isHabitacion}

                          disableClearable={true}
                          onChange={(event, newValue) => {
                            getCamas(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Habitaciones" />
                          )}
                        />

                      </Grid>
                      <Grid item xs={6} lg={6}>

                        <Autocomplete
                          {...defaultOptionsCamas}
                          id="controlled-demo"
                          value={cama}
                          disabled={isCama}

                          disableClearable={true}
                          onChange={(event, newValue) => {
                            getBomba(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Camas" />
                          )}
                        />

                      </Grid>
                      <Grid item xs={6} lg={6}>
                        <Autocomplete
                          {...defaultOptionsEquipos}
                          id="controlled-demo"
                          value={IdEquipo}
                          disabled={isEquipo}

                          disableClearable={true}
                          onChange={(event, newValue) => {
                            setIdEquipo(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Equipos" />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ))}
              </Grid>}
              {tieneCama && <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item xs={12} lg={12}>
                  <Typography
                    component={"span"}
                    variant="h4"
                    color="textPrimary"
                  >
                    Contacto de emergencia
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.NombreContacto && touched.NombreContacto}
                    helperText={
                      errors.NombreContacto &&
                      touched.NombreContacto &&
                      errors.NombreContacto
                    }
                    label="NombreContacto"
                    name="NombreContacto"
                    placeholder="NombreContacto"
                    variant="outlined"
                    fullWidth
                    value={values.NombreContacto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.ApellidoContacto && touched.ApellidoContacto}
                    helperText={
                      errors.ApellidoContacto &&
                      touched.ApellidoContacto &&
                      errors.ApellidoContacto
                    }
                    label="ApellidoContacto"
                    name="ApellidoContacto"
                    placeholder="ApellidoContacto"
                    variant="outlined"
                    fullWidth
                    value={values.ApellidoContacto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.CedulaContacto && touched.CedulaContacto}
                    label="CedulaContacto"
                    name="CedulaContacto"
                    placeholder="CedulaContacto"
                    variant="outlined"
                    fullWidth
                    value={values.CedulaContacto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.CedulaContacto &&
                      touched.CedulaContacto &&
                      errors.CedulaContacto
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.CelularContacto && touched.CelularContacto}
                    label="CelularContacto"
                    name="CelularContacto"
                    placeholder="CelularContacto"
                    variant="outlined"
                    fullWidth
                    value={values.CelularContacto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.CelularContacto &&
                      touched.CelularContacto &&
                      errors.CelularContacto
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={
                      errors.ParentezcoContacto && touched.ParentezcoContacto
                    }
                    label="ParentezcoContacto"
                    name="ParentezcoContacto"
                    placeholder="ParentezcoContacto"
                    variant="outlined"
                    fullWidth
                    value={values.ParentezcoContacto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.ParentezcoContacto &&
                      touched.ParentezcoContacto &&
                      errors.ParentezcoContacto
                    }
                  />
                </Grid>
              </Grid>}
              <Box mt={2} style={{ marginTop: 50 }}>
                <Button
                  color="primary"
                  disabled={loading || (!tieneCama && isEquipo && isArea && isHabitacion && isCama)}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  <AddShoppingCartIcon /> Agregar
                </Button>
              </Box>
            </form>
          )}
        </Fragment>
      )}
    </Formik>
  );
};

CreateForm.propTypes = {
};

export default CreateForm;
