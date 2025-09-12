import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import renderTextField from "../../../../../components/FormElements/InputText";
import * as FirestoreService from "../services/firestore";
import { useParams } from "react-router-dom";

const CreateForm = ({ className, send, data }) => {
  const [loading, setLoading] = useState(false);
  const [habitacion, setHabitacion] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { threadKey } = useParams();

  const getConjuntoById = useCallback(async () => {
    try {
      const doc = await FirestoreService.getHb(threadKey);
      setHabitacion(doc);
    } catch (err) {
      console.error(err);
    }
  }, [threadKey]);

  useEffect(() => {
    getConjuntoById();
  }, [getConjuntoById]);

  const handleSubmitForm = async (values) => {
    setLoading(true);
    try {
      values.Valor = 0;
      values.duracion = 0;
      values.habitacionNombre = habitacion?.data()?.Nombre || "";

      if (data) {
        await FirestoreService.updateBomba(values, threadKey, data.id);
        enqueueSnackbar("Bomba actualizada correctamente", { variant: "success" });
      } else {
        await FirestoreService.newBomba(values, threadKey);
        enqueueSnackbar("Bomba creada correctamente", { variant: "success" });
      }
      send();
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Ocurrió un error al guardar la bomba", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        Nombre: data?.data()?.Nombre || "",
        Detalle: data?.data()?.Detalle || "",
        Numero: data?.data()?.Numero || ""
      }}
      validationSchema={Yup.object({
        Nombre: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
        Detalle: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
        Numero: Yup.string()
          .required("Se requiere la cantidad de Áforo")
          .matches(/^(?!0\.00)[1-9]\d{0,2}?$/, "¡Solo se admiten un número máximo de Áforo de 999!")
      })}
      onSubmit={handleSubmitForm}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <>
          {loading ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit} className={className}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre del hospital"
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
                    label="Detalle"
                    name="Detalle"
                    placeholder="Detalle de la cama"
                    variant="outlined"
                    value={values.Detalle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.Detalle && touched.Detalle)}
                    helperText={touched.Detalle && errors.Detalle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="Numero"
                    type="number"
                    label="Numero de cama"
                    component={renderTextField}
                    value={values.Numero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Numero && errors.Numero)}
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
        </>
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
