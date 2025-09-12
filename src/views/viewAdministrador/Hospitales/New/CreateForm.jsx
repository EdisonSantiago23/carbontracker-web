import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";

const CreateForm = ({ className, send, data }) => {
  const [loading, setLoading] = React.useState(false);

  const agregar = (values) => {
    FirestoreService.newHospital(values).then(() => {
      setLoading(false);
      send();
    }).catch(() => setLoading(false));
  };

  const update = (values) => {
    FirestoreService.updateHospital(values, data.id).then(() => {
      setLoading(false);
      send();
    }).catch(() => setLoading(false));
  };

  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Direccion: data?.data().Direccion || "",
        Telefono: data?.data().Telefono || "",
        Detalle: data?.data().Detalle || ""
      }}
      validationSchema={Yup.object({
        Nombre: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
        Direccion: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
        Telefono: Yup.string()
          .trim()
          .required("¡Se requiere rellenar este campo!")
          .max(20, "¡Máximo 20 caracteres!")
          .matches(/^\d+$/, "¡Solo se admiten números!"),
        Detalle: Yup.string().trim().required("¡Se requiere rellenar este campo!")
      })}
      onSubmit={(values) => {
        setLoading(true);
        data ? update(values) : agregar(values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={className}>
          {loading ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
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
                  label="Teléfono"
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
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddIcon />}
                  disabled={loading}
                >
                  {data ? "Actualizar" : "Agregar"}
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      )}
    </Formik>
  );
};

CreateForm.propTypes = {
  className: PropTypes.string,
  send: PropTypes.func.isRequired,
  data: PropTypes.object
};

export default CreateForm;
