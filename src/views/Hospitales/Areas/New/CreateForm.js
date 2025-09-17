
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
import { AreaService } from "@services";

import AddShoppingCartIcon from "@material-ui/icons/Add";


const CreateForm = ({ className, send, data ,info}) => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const threadKey = info;
  const agregar = (values) => {
    try {
      AreaService.newArea(values, threadKey).then(() => {
        setLoading(false);
        enqueueSnackbar("Área creada correctamente", {
          variant: "success",
        });
        send();
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const update = (values) => {
    AreaService.updateArea(values, threadKey,data.id).then((rss) => {
      setLoading(false);

      enqueueSnackbar("Área actualizada correctamente", {
        variant: "success",
      });
      send();
    });
  };
  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Numero: data?.data().Numero || "",
     
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
        Numero: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo Número se encuentra vacio", function vdireccion(
            direccion
          ) {
            if (typeof direccion === "undefined") {
              return false;
            } else {
              direccion = direccion.trim();
              if (direccion == "") {
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
                    error={errors.Nombre && touched.Nombre}
                    helperText={
                      errors.Nombre && touched.Nombre && errors.Nombre
                    }
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
                    helperText={
                      errors.Numero && touched.Numero && errors.Numero
                    }
                    label="Numero"
                    name="Numero"
                    placeholder="Numero"
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
