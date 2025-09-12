import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField,  Typography } from "@mui/material";
import * as FirestoreService from "../services/firestore";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import useAuth from "../../../../contextapi/hooks/useAuth";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    "& .ql-editor": {
      height: 160
    }
  }
}));

const CreateForm = ({
  className,
  send,
  data
}) => {
  React.useEffect(() => {
    getPacientes();
  }, [getPacientes]);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [area, setArea] = React.useState(false);
  const [areas, setAreas] = React.useState([]);
  const [habitacion, setHabitacion] = React.useState(false);
  const [habitacionS, setHabitacionS] = React.useState(false);
  const [habitaciones, setHabitaciones] = React.useState([]);
  const [cama, setCama] = React.useState(false);
  const [camaS, setCamaS] = React.useState(false);
  const [camas, setCamas] = React.useState([]);
  const {
    enqueueSnackbar
  } = useSnackbar();
  const {
    isAuthenticated,
    user
  } = useAuth();
  const [threadKey, setthreadKey] = React.useState(user.hospitalId);

  const agregar = values => {
    try {
      console.log('habitacionShabitacionShabitacionS', habitacionS.data().Nombre);
      values.area = habitacionS.data().Nombre;
      values.habitacion = habitacion;
      values.cama = cama;
      FirestoreService.newHospital(values, threadKey).then(() => {
        setLoading(false);
        updatePaciente(values);
        enqueueSnackbar("Paciente creado correctamente", {
          variant: "success"
        });
        send();
      });
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  const update = values => {
    FirestoreService.updateHospital(values, data.id, threadKey).then(rss => {
      setLoading(false);
      enqueueSnackbar("Paciente actualizada correctamente", {
        variant: "success"
      });
      send();
    });
  };

  const updatePaciente = item => {
    FirestoreService.asignarpaciente(item, threadKey, cama).then(rss => {
      enqueueSnackbar("Paciente gestionado correctamente", {
        variant: "success"
      });
    });
  };

  const getHabitaciones = value => {
    setArea(value.target.value);
    setHabitacionS(value.target.value);

    try {
      FirestoreService.getHabitacionesByHospital({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setHabitaciones(Items);
        }
      }, threadKey, value.target.value.id);
      setLoading(false);
    } catch (e) {}
  };

  const getCamas = value => {
    setHabitacion(value.target.value);

    try {
      FirestoreService.getCamasByHabitacion({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setCamas(Items);
        }
      }, threadKey, value.target.value.id);
      setLoading(false);
    } catch (e) {}
  };

  const getBomba = value => {
    setCama(value.target.value);
  };

  const getPacientes = React.useCallback(() => {
    try {
      FirestoreService.getAreaById({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          setAreas(Items);
        }
      }, threadKey);
      setLoading(false);
    } catch (e) {}
  }, [threadKey]);
  return <Formik initialValues={{
    Nombre: data?.data().Nombre || "",
    Apellido: data?.data().Apellido || "",
    Edad: data?.data().Edad || "",
    Cedula: data?.data().Cedula || "",
    Diagnostico: data?.data().Diagnostico || ""
  }} validationSchema={Yup.object().shape({
    Nombre: Yup.string().required("¡Se requiere rellenar eleste campo!").test("", "Campo Nombre se encuentra vacio", function vnombre(nombre) {
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
    Apellido: Yup.string().required("¡Se requiere rellenar este campo!").test("", "Campo Apellido se encuentra vacio", function vApellido(Apellido) {
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
    Edad: Yup.string().required("¡Se requiere rellenar este campo!").max(20, "¡Maximo de 20 caracteres!").matches(/^\d*\.?\d*$/gm, "¡Solo se admiten números!"),
    Cedula: Yup.string().required("¡Se requiere rellenar este campo!").max(20, "¡Maximo de 20 caracteres!").matches(/^\d*\.?\d*$/gm, "¡Solo se admiten números!"),
    Diagnostico: Yup.string().required("¡Se requiere rellenar este campo!").test("", "Campo Apellido se encuentra vacio", function vApellido(Apellido) {
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
    })
  })} onSubmit={async (values, {
    setErrors,
    setStatus,
    setSubmitting
  }) => {
    setLoading(true);

    if (data) {
      update(values);
    } else {
      agregar(values);
    }
  }}>
      {({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      touched,
      values
    }) => <Fragment>
          {loading ? <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box> : <form onSubmit={handleSubmit} className={clsx(classes.root, className)}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Nombre && touched.Nombre} helperText={errors.Nombre && touched.Nombre && errors.Nombre} label="Nombre" name="Nombre" placeholder="Nombre del hospital" variant="outlined" fullWidth="true" value={values.Nombre} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Apellido && touched.Apellido} helperText={errors.Apellido && touched.Apellido && errors.Apellido} label="Apellido" name="Apellido" placeholder="Apellido" variant="outlined" fullWidth="true" value={values.Apellido} onChange={handleChange} onBlur={handleBlur} />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Cedula && touched.Cedula} label="Número de Cedula" name="Cedula" placeholder="Número de Cedula del residente" variant="outlined" fullWidth="true" value={values.Cedula} onChange={handleChange} onBlur={handleBlur} helperText={errors.Cedula && touched.Cedula && errors.Cedula} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Edad && touched.Edad} label="Edad" name="Edad" placeholder="Edad" variant="outlined" fullWidth="true" value={values.Edad} onChange={handleChange} onBlur={handleBlur} helperText={errors.Edad && touched.Edad && errors.Edad} />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField error={errors.Diagnostico && touched.Diagnostico} helperText={errors.Diagnostico && touched.Diagnostico && errors.Diagnostico} label="Diagnostico" name="Diagnostico" placeholder="Diagnostico" variant="outlined" fullWidth="true" value={values.Diagnostico} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Typography variant="h3" color="textPrimary">
                    Asignar cama
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={area} label="Age" style={{
              width: 150
            }} onChange={e => getHabitaciones(e)}>
                    {areas.map((row, index) => {
                return <MenuItem value={row}>{row.data().Nombre}</MenuItem>;
              })}
                  </Select>
                </Grid>
   

                <Grid item xs={12} lg={4}>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={habitacion} label="Age" style={{
              width: 150
            }} onChange={e => getCamas(e)}>
                    {habitaciones.map((row, index) => {
                return <MenuItem value={row}>{row.data().Nombre}</MenuItem>;
              })}
                  </Select>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={cama} label="Age" style={{
              width: 150
            }} onChange={e => getBomba(e)}>
                    {camas.map((row, index) => {
                return <MenuItem value={row.id}>{row.data().Nombre}</MenuItem>;
              })}
                  </Select>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button color="primary" disabled={loading} fullWidth size="large" type="submit" variant="contained">
                  <AddShoppingCartIcon /> Agregar
                </Button>
              </Box>
            </form>}
        </Fragment>}
    </Formik>;
};

CreateForm.propTypes = {
  className: PropTypes.string
};
export default CreateForm;