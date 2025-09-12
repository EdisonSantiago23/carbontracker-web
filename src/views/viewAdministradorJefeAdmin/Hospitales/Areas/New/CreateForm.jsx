import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";
import { useParams } from "react-router-dom";

const CreateForm = ({ className, send, data, info }) => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [threadKey] = React.useState(info);

  const agregar = async (values) => {
    try {
      await FirestoreService.newArea(values, threadKey);
      setLoading(false);
      enqueueSnackbar("Área creada correctamente", { variant: "success" });
      send();
    } catch (err) {
      setLoading(false);
    }
  };

  const update = async (values) => {
    await FirestoreService.updateArea(values, threadKey, data.id);
    setLoading(false);
    enqueueSnackbar("Área actualizada correctamente", { variant: "success" });
    send();
  };

  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Numero: data?.data().Numero || ""
      }}
      validationSchema={Yup.object().shape({
        Nombre: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo Nombre se encuentra vacio", (nombre) => nombre?.trim() !== ""),
        Numero: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo Número se encuentra vacio", (numero) => numero?.trim() !== "")
      })}
      onSubmit={async (values) => {
        setLoading(true);
        if (data) {
          update(values);
        } else {
          agregar(values);
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
            <form
              onSubmit={handleSubmit}
              className={clsx(className)}
              style={{ width: "100%" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Nombre && touched.Nombre}
                    helperText={errors.Nombre && touched.Nombre && errors.Nombre}
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre"
                    variant="outlined"
                    fullWidth
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Numero && touched.Numero}
                    helperText={errors.Numero && touched.Numero && errors.Numero}
                    label="Número"
                    name="Numero"
                    placeholder="Número"
                    variant="outlined"
                    fullWidth
                    value={values.Numero}
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
  className: PropTypes.string
};

export default CreateForm;
