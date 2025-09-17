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
import { EnfermerosService } from '@services'
import useAuth from "../../contextapi/hooks/useAuth";
import {Iconify } from '@components';



const CreateForm = (props) => {
  const { close, data } = props;
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const IdHospital = user.IdHospital;
  const agregar = (values) => {
    EnfermerosService.newEnfermero(values, IdHospital).then(() => {
      setLoading(false);

      enqueueSnackbar("Hospital creado correctamente", {
        variant: "success",
      });
      close();
    });

  };

  const update = (values) => {
    EnfermerosService.updateEnfermero(values, data.id, IdHospital).then((rss) => {
      setLoading(false);

      enqueueSnackbar("Bomba actualizada correctamente", {
        variant: "success",
      });
      close();
    });
  };
  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Apellido: data?.data().Apellido || "",
        Cedula: data?.data().Cedula || "",

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
        Apellido: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo Apellido se encuentra vacio", function vApellido(
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



        Cedula: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .max(20, "¡Maximo de 20 caracteres!")
          .matches(/^\d*\.?\d*$/gm, "¡Solo se admiten números!"),


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
                    placeholder="Nombre del hospital"
                    variant="outlined"
                    fullWidth
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Apellido && touched.Apellido}
                    helperText={
                      errors.Apellido && touched.Apellido && errors.Apellido
                    }
                    label="Apellido"
                    name="Apellido"
                    placeholder="Apellido"
                    variant="outlined"
                    fullWidth
                    value={values.Apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Cedula && touched.Cedula}
                    label="Número de Cedula"
                    name="Cedula"
                    placeholder="Número de Cedula del residente"
                    variant="outlined"
                    fullWidth
                    value={values.Cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.Cedula && touched.Cedula && errors.Cedula
                    }
                  />
                </Grid>

              </Grid>
              <Box mt={2}>
                <Button variant="contained" type="submit" fullWidth
                  startIcon={<Iconify icon="eva:plus-fill" color={'#fff'} />}>
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
  close: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

};

export default CreateForm;
