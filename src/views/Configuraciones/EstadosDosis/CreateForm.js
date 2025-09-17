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
import { EstadosService } from "@services";

import AddShoppingCartIcon from "@material-ui/icons/Add";


const CreateForm = ({ className, send, data }) => {
  const [loading, setLoading] = React.useState(false);
  const [stateAux, setStateAux] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {

  }, []);



  const agregar = (values, stateDats) => {
    try {
      EstadosService.newEstado(values, stateDats).then(() => {
        setLoading(false);

        enqueueSnackbar("Roll creado correctamente", {
          variant: "success",
        });
        send();
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const update = (values, stateDats) => {
    EstadosService.updateEstado(values, stateDats, data.id).then((rss) => {
      setLoading(false);

      enqueueSnackbar("Estado actualizada correctamente", {
        variant: "success",
      });
      send();
    });
  };
  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Tag: data?.data().Tag || "",

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
        Tag: Yup.string()
          .required("¡Se requiere rellenar eleste campo!")
          .test("", "Campo Tag se encuentra vacio", function vnombre(
            Tag
          ) {
            if (typeof Tag === "undefined") {
              return false;
            } else {
              Tag = Tag.trim();
              if (Tag == "") {
                return false;
              } else {
                return true;
              }
            }
          }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const objetosRoles = stateAux.reduce(function (map, obj) {
          map[obj.tag] = obj.valor;
          return map;
        }, {});
         setLoading(true);
        if (data) {
           update(values, objetosRoles);
        } else {
          agregar(values, objetosRoles);
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
                    placeholder="Nombre del rol"
                    variant="outlined"
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Tag && touched.Tag}
                    helperText={
                      errors.Tag && touched.Tag && errors.Tag
                    }
                    label="Tag"
                    name="Tag"
                    placeholder="Tag"
                    variant="outlined"
                    value={values.Tag}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                </Grid>
           
              </Grid>
              <Box mt={2}>
                <Button
                  color="primary"
                  disabled={loading}
                  size="large"
                  type="submit"
                  fullWidth
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
