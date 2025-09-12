import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";

const CreateForm = ({ className, send, data, info }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [threadKey] = useState(info);

  const handleSubmitForm = async (values) => {
    setLoading(true);
    try {
      if (data) {
        await FirestoreService.updateArea(values, threadKey, data.id);
        enqueueSnackbar("Área actualizada correctamente", { variant: "success" });
      } else {
        await FirestoreService.newArea(values, threadKey);
        enqueueSnackbar("Área creada correctamente", { variant: "success" });
      }
      send();
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Ocurrió un error, intente nuevamente", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Numero: data?.data().Numero || ""
      }}
      validationSchema={Yup.object({
        Nombre: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
        Numero: Yup.string().trim().required("¡Se requiere rellenar este campo!")
      })}
      onSubmit={handleSubmitForm}
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
                    fullWidth
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre"
                    variant="outlined"
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.Nombre && touched.Nombre)}
                    helperText={touched.Nombre && errors.Nombre}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Numero"
                    name="Numero"
                    placeholder="Numero"
                    variant="outlined"
                    value={values.Numero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.Numero && touched.Numero)}
                    helperText={touched.Numero && errors.Numero}
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
                  startIcon={<AddShoppingCartIcon />}
                  disabled={loading}
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
  data: PropTypes.object,
  info: PropTypes.any.isRequired
};

export default CreateForm;
