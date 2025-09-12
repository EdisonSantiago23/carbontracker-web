import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";
import useSettings from "../../../../contextapi/hooks/useSettings";
import { firebase } from "../../../../Firebase"; // asegúrate de importar firebase correctamente

const CreateForm = ({ className, send, ...rest }) => {
  const { settings } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        Nombre: "",
        Apellido: "",
        Correo: "",
        Cedula: "",
        Celular: "",
      }}
      validationSchema={Yup.object().shape({
        Nombre: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .trim()
          .min(1, "Campo Nombre se encuentra vacío"),
        Apellido: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .trim()
          .min(1, "Campo Apellido se encuentra vacío"),
        Correo: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .email("Ingrese un correo válido"),
        Cedula: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .matches(/^\d{10}$/, "¡Ingrese una cédula válida de 10 dígitos!"),
        Celular: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .matches(/^\d{10}$/, "¡Ingrese un celular válido de 10 dígitos!"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);
        try {
          values.Rol = '{ "administrador": false, "enfermero": false, "hospital": false,"jefe": false}';

          await FirestoreService.newUser(values);

          await firebase.auth().createUserWithEmailAndPassword(values.Correo, values.Cedula);
          await firebase.auth().sendPasswordResetEmail(values.Correo);

          setStatus({ success: true });
          enqueueSnackbar("Usuario añadido correctamente", { variant: "success" });
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
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <Fragment>
          {loading ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit} className={clsx(className)} {...rest}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Nombre && touched.Nombre}
                    helperText={errors.Nombre && touched.Nombre && errors.Nombre}
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre del residente"
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
                    helperText={errors.Apellido && touched.Apellido && errors.Apellido}
                    label="Apellido"
                    name="Apellido"
                    placeholder="Apellido del residente"
                    variant="outlined"
                    fullWidth
                    value={values.Apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.Correo && touched.Correo}
                    helperText={errors.Correo && touched.Correo && errors.Correo}
                    label="Correo Electrónico"
                    name="Correo"
                    placeholder="Correo del residente"
                    variant="outlined"
                    fullWidth
                    value={values.Correo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.Cedula && touched.Cedula}
                    helperText={errors.Cedula && touched.Cedula && errors.Cedula}
                    label="Número de Cédula"
                    name="Cedula"
                    placeholder="Número de cédula del residente"
                    variant="outlined"
                    fullWidth
                    value={values.Cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.Celular && touched.Celular}
                    helperText={errors.Celular && touched.Celular && errors.Celular}
                    label="Número de Celular"
                    name="Celular"
                    placeholder="Número de Celular"
                    variant="outlined"
                    fullWidth
                    value={values.Celular}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  color="primary"
                  disabled={loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
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
  send: PropTypes.func.isRequired,
};

export default CreateForm;
