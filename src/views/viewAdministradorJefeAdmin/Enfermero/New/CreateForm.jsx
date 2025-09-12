import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";
import useAuth from "../../../../contextapi/hooks/useAuth";

const CreateForm = ({ className, send, data }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const threadKey = user?.hospitalId;

  const agregar = async (values) => {
    try {
      await FirestoreService.newHospital(values, threadKey);
      setLoading(false);
      enqueueSnackbar("Hospital creado correctamente", { variant: "success" });
      send();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const update = async (values) => {
    try {
      await FirestoreService.updateHospital(values, data.id, threadKey);
      setLoading(false);
      enqueueSnackbar("Hospital actualizado correctamente", { variant: "success" });
      send();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Apellido: data?.data().Apellido || "",
        Cedula: data?.data().Cedula || ""
      }}
      validationSchema={Yup.object({
        Nombre: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .trim()
          .min(1, "Campo Nombre se encuentra vacío"),
        Apellido: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .trim()
          .min(1, "Campo Apellido se encuentra vacío"),
        Cedula: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .max(20, "¡Máximo de 20 caracteres!")
          .matches(/^\d+$/, "¡Solo se admiten números!")
      })}
      onSubmit={(values) => {
        setLoading(true);
        data ? update(values) : agregar(values);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <Fragment>
          {loading ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit} className={clsx(className)}>
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
                    label="Apellido"
                    name="Apellido"
                    placeholder="Apellido"
                    variant="outlined"
                    fullWidth
                    value={values.Apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.Apellido && touched.Apellido)}
                    helperText={errors.Apellido && touched.Apellido && errors.Apellido}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="Número de Cedula"
                    name="Cedula"
                    placeholder="Número de Cedula"
                    variant="outlined"
                    fullWidth
                    value={values.Cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.Cedula && touched.Cedula)}
                    helperText={errors.Cedula && touched.Cedula && errors.Cedula}
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
                  {data ? "Actualizar" : "Agregar"}
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
  data: PropTypes.object
};

export default CreateForm;
