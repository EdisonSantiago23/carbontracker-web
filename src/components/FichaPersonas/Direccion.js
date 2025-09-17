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
                <Grid item xs={12} lg={3}>
                  <TextField
                    error={errors.DireccionResidencia && touched.DireccionResidencia}
                    label="Direccion Residencia Habitual"
                    name="DireccionResidencia"
                    placeholder="Direccion Residencia Habitual"
                    variant="outlined"
                    fullWidth
                    value={values.DireccionResidencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.DireccionResidencia && touched.DireccionResidencia && errors.DireccionResidencia}
                  />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <TextField
                    error={errors.Barrio && touched.Barrio}
                    label="Barrio"
                    name="Barrio"
                    placeholder="Barrio"
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
                    label="Parroquia"
                    name="Parroquia"
                    placeholder="Parroquia"
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
                    label="Canton"
                    name="Canton"
                    placeholder="Canton"
                    variant="outlined"
                    fullWidth
                    value={values.Canton}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Canton && touched.Canton && errors.Canton} />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <TextField
                    error={errors.Provincia && touched.Provincia}
                    label="Provincia"
                    name="Provincia"
                    placeholder="Provincia"
                    variant="outlined"
                    fullWidth
                    value={values.Provincia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Provincia && touched.Provincia && errors.Provincia} />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <TextField
                    error={errors.ZonaUR && touched.ZonaUR}
                    label="ZonaUR"
                    name="ZonaUR"
                    placeholder="ZonaUR"
                    variant="outlined"
                    fullWidth
                    value={values.ZonaUR}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.ZonaUR && touched.ZonaUR && errors.ZonaUR} />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <TextField
                    error={errors.Telefono && touched.Telefono}
                    label="Teléfono"
                    name="Telefono"
                    placeholder="Teléfono"
                    variant="outlined"
                    fullWidth
                    value={values.Telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Telefono && touched.Telefono && errors.Telefono} />
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

