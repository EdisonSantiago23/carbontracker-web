import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";
import useSettings from "../../../../contextapi/hooks/useSettings";
import { firebase } from "../../../../Firebase";

const CreateForm = ({ className, send, ...rest }) => {
  const { settings } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    Nombre: "",
    Apellido: "",
    Correo: "",
    Cedula: "",
    Celular: ""
  };

  const validationSchema = Yup.object({
    Nombre: Yup.string().trim().required("¡Campo Nombre requerido!"),
    Apellido: Yup.string().trim().required("¡Campo Apellido requerido!"),
    Correo: Yup.string().email("Correo inválido").required("¡Campo Correo requerido!"),
    Cedula: Yup.string().matches(/^\d{10}$/, "Cédula inválida de 10 dígitos").required("¡Campo Cédula requerido!"),
    Celular: Yup.string().matches(/^\d{10}$/, "Celular inválido de 10 dígitos").required("¡Campo Celular requerido!")
  });

  const handleSubmit = async (values, { setSubmitting, setStatus, setErrors }) => {
    setLoading(true);
    try {
      values.Rol = '{ "administrador": false, "superAdministrador": false, "hospital": false,"jefe": true}';

      await FirestoreService.newUser(values);
      await firebase.auth().createUserWithEmailAndPassword(values.Correo, values.Cedula);
      await firebase.auth().sendPasswordResetEmail(values.Correo);

      enqueueSnackbar("Usuario añadido correctamente", { variant: "success" });
      setStatus({ success: true });
      send();
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      enqueueSnackbar("Error al crear el usuario", { variant: "error" });
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
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
                    name="Nombre"
                    label="Nombre"
                    placeholder="Nombre del residente"
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Nombre && !!errors.Nombre}
                    helperText={touched.Nombre && errors.Nombre}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    name="Apellido"
                    label="Apellido"
                    placeholder="Apellido del residente"
                    value={values.Apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Apellido && !!errors.Apellido}
                    helperText={touched.Apellido && errors.Apellido}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="Correo"
                    label="Correo Electrónico"
                    placeholder="Correo del residente"
                    value={values.Correo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Correo && !!errors.Correo}
                    helperText={touched.Correo && errors.Correo}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="Cedula"
                    label="Número de Cédula"
                    placeholder="Número de cédula del residente"
                    value={values.Cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Cedula && !!errors.Cedula}
                    helperText={touched.Cedula && errors.Cedula}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="Celular"
                    label="Número de Celular"
                    placeholder="Número de Celular"
                    value={values.Celular}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Celular && !!errors.Celular}
                    helperText={touched.Celular && errors.Celular}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<AddShoppingCartIcon />}
                  disabled={loading}
                >
                  Agregar usuario
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
