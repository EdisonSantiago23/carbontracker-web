import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import { CamaService } from "@services";
import AddShoppingCartIcon from "@material-ui/icons/Add";
const CreateForm = (props) => {
  const {className, send,area, data,IdHospital,habitacion} =props
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
  }, []);

  const newBomba = (values) => {
    CamaService.newCama(IdHospital,values,habitacion,area ).then((rss) => {
      setLoading(false);
      enqueueSnackbar("Cama creada correctamente", {
        variant: "success",
      });
      send();
    });
  };

  const updateBomba = (values) => {
    CamaService.updateCama(IdHospital,values, habitacion,area).then((rss) => {
      setLoading(false);
      enqueueSnackbar("Cama actualizada correctamente", {
        variant: "success",
      });
      send();
    });
  };

  return (
    <Formik
      initialValues={{
        id: data?.id || "",
        Nombre: data?.data().Nombre || "",
        Detalle: data?.data().Detalle || "",

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
        Detalle: Yup.string()
          .required("¡Se requiere rellenar eleste campo!")
          .test("", "Campo Detalle se encuentra vacio", function vDetalle(
            Detalle
          ) {
            if (typeof Detalle === "undefined") {
              return false;
            } else {
              Detalle = Detalle.trim();
              if (Detalle == "") {
                return false;
              } else {
                return true;
              }
            }
          }),

   
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);

        try {
          values.Valor = 0;
          values.duracion = 0;
          values.habitacionNombre=habitacion.data().Nombre;

          try {
            if (data) {
              updateBomba(values);
            } else {
              newBomba(values);
            }
          } catch (err) {
          }
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          setLoading(false);
        }
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
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Nombre && touched.Nombre}
                    helperText={
                      errors.Nombre && touched.Nombre && errors.Nombre
                    }
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre de la cama"
                    variant="outlined"
                    fullWidth
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Detalle && touched.Detalle}
                    helperText={
                      errors.Detalle && touched.Detalle && errors.Detalle
                    }
                    label="Detalle"
                    name="Detalle"
                    placeholder="Detalle de la cama"
                    variant="outlined"
                    fullWidth
                    value={values.Detalle}
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
};

export default CreateForm;
