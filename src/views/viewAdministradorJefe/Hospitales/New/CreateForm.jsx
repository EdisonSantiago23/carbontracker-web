import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";

const CreateForm = ({ className, send, ...rest }) => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    Nombre: "",
    Direccion: "",
    Telefono: "",
    Detalle: ""
  };

  const validationSchema = Yup.object({
    Nombre: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
    Direccion: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
    Telefono: Yup.string()
      .trim()
      .required("¡Se requiere rellenar este campo!")
      .max(20, "¡Máximo 20 caracteres!")
      .matches(/^\d*$/, "¡Solo se admiten números!"),
    Detalle: Yup.string().trim().required("¡Se requiere rellenar este campo!")
  });

  const handleSubmit = async (values, { setStatus, setErrors, setSubmitting }) => {
    setLoading(true);
    try {
      await FirestoreService.newHospital(values);
      enqueueSnackbar("Hospital creado correctamente", { variant: "success" });
      send();
      setStatus({ success: true });
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      enqueueSnackbar("Error al crear el hospital", { variant: "error" });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => (
        <Fragment>
          {loading ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit} className={className} {...rest}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="Nombre"
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Nombre && errors.Nombre)}
                    helperText={touched.Nombre && errors.Nombre}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="Direccion"
                    value={values.Direccion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Direccion && errors.Direccion)}
                    helperText={touched.Direccion && errors.Direccion}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Número de Teléfono"
                    name="Telefono"
                    value={values.Telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Telefono && errors.Telefono)}
                    helperText={touched.Telefono && errors.Telefono}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Detalle"
                    name="Detalle"
                    value={values.Detalle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Detalle && errors.Detalle)}
                    helperText={touched.Detalle && errors.Detalle}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={loading}
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
  className: PropTypes.string,
  send: PropTypes.func.isRequired
};

export default CreateForm;
