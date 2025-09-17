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
  Checkbox,
  Typography
} from '@mui/material';
import AddShoppingCartIcon from "@material-ui/icons/Add";
import { EquiposService } from '@services'
const CreateForm = ({ className, send, IdHospital, data }) => {

  const [loading, setLoading] = React.useState(false);
  const [alambrico, setAlambrico] = React.useState(
    data?.data().Alambrico || false
  );
  const { enqueueSnackbar } = useSnackbar();
  const agregar = (values) => {
    
    values.alambrico=alambrico;
    EquiposService.newEquipo(values, IdHospital).then(() => {
      setLoading(false);
      enqueueSnackbar("Equipo creado correctamente", {
        variant: "success",
      });
      send();
    });

  };

  const update = (values) => {
    values.alambrico=alambrico;
    EquiposService.updateEquipo(IdHospital, data.id, values).then((rss) => {
      setLoading(false);
      enqueueSnackbar("Equipo actualizada correctamente", {
        variant: "success",
      });
      send();
    });
  };

  return (
    <Formik
      initialValues={{
        Serial: data?.data().Serial || "",
        Modelo: data?.data().Modelo || "",
        Codigo: data?.data().Codigo || "",

      }}
      validationSchema={Yup.object().shape({
        Serial: Yup.string()
          .required("¡Se requiere rellenar eleste campo!")
          .test("", "Campo Serial se encuentra vacio", function vSerial(
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
        Modelo: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo Modelo se encuentra vacio", function vModelo(
            Apellido
          ) {
            if (typeof Apellido === "undefined") {
              return false;
            } else {
              Apellido = Apellido.trim();
              if (Apellido == "") {
                return false;
              } else {
                return true;
              }
            }
          }),

      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);
        if (data) {
          update(values);
        } else {
          agregar(values);
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
                    error={errors.Serial && touched.Serial}
                    helperText={
                      errors.Serial && touched.Serial && errors.Serial
                    }
                    label="Serial"
                    name="Serial"
                    placeholder="Serial"
                    variant="outlined"
                    value={values.Serial}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Modelo && touched.Modelo}
                    helperText={
                      errors.Modelo && touched.Modelo && errors.Modelo
                    }
                    label="Modelo"
                    name="Modelo"
                    placeholder="Modelo"
                    variant="outlined"
                    value={values.Modelo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Codigo && touched.Codigo}
                    helperText={
                      errors.Codigo && touched.Codigo && errors.Codigo
                    }
                    label="Codigo"
                    name="Codigo"
                    placeholder="Codigo"
                    variant="outlined"
                    value={values.Codigo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                <Typography component={'span'}>¿Equipo alambico?</Typography>
                    <Checkbox checked={alambrico} onChange={() => setAlambrico(!alambrico)} />
                </Grid>
              </Grid>


              <Box mt={2}>
                <Button
                  color="primary"
                  disabled={loading}
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
