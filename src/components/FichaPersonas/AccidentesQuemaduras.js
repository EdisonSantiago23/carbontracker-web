import React, { Fragment } from "react";
import { Stack, Autocomplete } from "@mui/material";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, CircularProgress, Grid, TextField, Typography, Checkbox } from '@mui/material';
import AddShoppingCartIcon from "@material-ui/icons/Add";
import useAuth from "../../contextapi/hooks/useAuth";


export default function Direccion({ className, send, data, tieneCama }) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {

  }, []);


  return (
    <Formik
      initialValues={{


        DireccionResidencia: data?.data().DireccionResidencia || "",
        Barrio: data?.data().Barrio || "",
        Parroquia: data?.data().Parroquia || "",
        Canton: data?.data().Canton || "",
        Provincia: data?.data().Provincia || "",
        ZonaUR: data?.data().ZonaUR || "",
        Telefono: data?.data().Telefono || "",
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
        // agregar(values);

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
              <Grid container spacing={3}>
           
                {/* direccion */}
                <Grid item xs={12} lg={4}>
                <TextField
                    error={errors.FechaNacimiento && touched.FechaNacimiento}
                    label="Fecha y hora del evento"
                    name="FechaNacimiento"
                    placeholder="Fecha y hora del evento"
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
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Barrio && touched.Barrio}
                    label="Ligar del evento"
                    name="Barrio"
                    placeholder="Ligar del evento"
                    variant="outlined"
                    fullWidth
                    value={values.Barrio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Barrio && touched.Barrio && errors.Barrio} />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <TextField
                    error={errors.Parroquia && touched.Parroquia}
                    label="Direccion del evento"
                    name="Parroquia"
                    placeholder="Direccion del evento"
                    variant="outlined"
                    fullWidth
                    value={values.Parroquia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Parroquia && touched.Parroquia && errors.Parroquia} />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <TextField
                    error={errors.Canton && touched.Canton}
                    label="Custodia policial"
                    name="Canton"
                    placeholder="Custodia policial"
                    variant="outlined"
                    fullWidth
                    value={values.Canton}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Canton && touched.Canton && errors.Canton} />
                </Grid>
      
              
                
                
              </Grid>
              <Box mt={2} >
                <Button
                  color="primary"
                  disabled={loading}
                  type="submit"
                  variant="contained">
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

Direccion.propTypes = {
  className: PropTypes.string,
};

