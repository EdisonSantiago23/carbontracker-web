import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";
import { useParams } from "react-router-dom";

const CreateForm = ({ className, send, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { threadKey } = useParams();

  return (
    <Formik
      initialValues={{
        Nombre: "",
        Numero: "",
        NombreEncargado: "",
        CedulaEncargado: ""
      }}
      validationSchema={Yup.object({
        Nombre: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .trim()
          .min(1, "Campo Nombre se encuentra vacío"),
        Numero: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .trim()
          .min(1, "Campo Número se encuentra vacío"),
        NombreEncargado: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .trim()
          .min(1, "Campo Nombre Encargado se encuentra vacío"),
        CedulaEncargado: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .trim()
          .min(1, "Campo Cédula Encargado se encuentra vacío")
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);
        try {
          await FirestoreService.newHabitacion(values, threadKey);
          setStatus({ success: true });
          enqueueSnackbar("Habitación creada correctamente", { variant: "success" });
          send();
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      }}
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
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre del hospital"
                    variant="outlined"
                    fullWidth
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.Nombre && touched.Nombre)}
                    helperText={errors.Nombre && touched.Nombre && errors.Nombre}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="Numero"
                    name="Numero"
                    placeholder="Numero de habitación"
                    variant="outlined"
                    fullWidth
                    value={values.Numero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.Numero && touched.Numero)}
                    helperText={errors.Numero && touched.Numero && errors.Numero}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="Nombre Encargado"
                    name="NombreEncargado"
                    placeholder="Nombre del encargado"
                    variant="outlined"
                    fullWidth
                    value={values.NombreEncargado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.NombreEncargado && touched.NombreEncargado)}
                    helperText={errors.NombreEncargado && touched.NombreEncargado && errors.NombreEncargado}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="Cédula Encargado"
                    name="CedulaEncargado"
                    placeholder="Cédula del encargado"
                    variant="outlined"
                    fullWidth
                    value={values.CedulaEncargado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.CedulaEncargado && touched.CedulaEncargado)}
                    helperText={errors.CedulaEncargado && touched.CedulaEncargado && errors.CedulaEncargado}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={<AddShoppingCartIcon />}
                >
                  Agregar
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
