import React, { Fragment } from "react";
import PropTypes from "prop-types";
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
import { DocumentosService } from "@services";
import AddShoppingCartIcon from "@material-ui/icons/Add";


const CreateForm = ({ IdHospital, send, data }) => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [imageAsFile, setImageAsFile] = React.useState('')

  const agregar = async (values) => {
    try {
      await DocumentosService.subirArchivos(imageAsFile).then((response) => {
        values.Url = response;
        DocumentosService.newDocumento(values,IdHospital).then(() => {
          setLoading(false);

          enqueueSnackbar("Soporte creado correctamente", {
            variant: "success",
          });
          send();
        });
      });


    } catch (err) {
      console.error(err)
      setLoading(false);
    }
  };

  const update = (values) => {
    DocumentosService.newDocumento(values, data.id).then((rss) => {
      setLoading(false);

      enqueueSnackbar("Soporte actualizado correctamente", {
        variant: "success",
      });
      send();
    });
  };
  const archivoHandler = async (e) => {
    const image = e.target.files[0]
    setImageAsFile(image)
  };

  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
       

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
          })
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
                    placeholder="Nombre del Soporte"
                    variant="outlined"
                    fullWidth
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>


                <Grid item xs={12} lg={6}>
                  <input
                    type="file"
                    onChange={archivoHandler}
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
