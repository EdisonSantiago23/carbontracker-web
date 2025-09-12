import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";
import renderTextField from "../../../../../components/FormElements/InputText";
import { useParams } from "react-router-dom";

const CreateForm = ({ className, send, ...rest }) => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { threadKey } = useParams();

  return (
    <Formik
      initialValues={{
        Nombre: "",
        Detalle: "",
        Numero: "",
        NombrePaciente: "",
        CedulaPaciente: ""
      }}
      validationSchema={Yup.object().shape({
        Nombre: Yup.string()
          .trim()
          .required("¡Se requiere rellenar este campo!"),
        Detalle: Yup.string()
          .trim()
          .required("¡Se requiere rellenar este campo!"),
        Numero: Yup.string()
          .required("Se requiere la cantidad de Áforo")
          .matches(/^(?!0\.00)[1-9]\d{0,2}?$/gm, "¡Solo se admiten un número máximo de Áforo de 999!"),
        NombrePaciente: Yup.string()
          .trim()
          .required("¡Se requiere rellenar el campo!"),
        CedulaPaciente: Yup.string().required("Se requiere la cédula")
      })}
      onSubmit={async (values, { setStatus, setErrors, setSubmitting }) => {
        setLoading(true);
        try {
          await FirestoreService.newBomba(values, threadKey);
          setStatus({ success: true });
          setSubmitting(false);
          setLoading(false);
          enqueueSnackbar("Habitación creada correctamente", { variant: "success" });
          send();
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          setLoading(false);
        }
      }}
    >
      {({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => (
        <Fragment>
          {loading ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit} className={className} {...rest}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={Boolean(errors.Nombre && touched.Nombre)}
                    helperText={touched.Nombre && errors.Nombre}
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
                    error={Boolean(errors.Detalle && touched.Detalle)}
                    helperText={touched.Detalle && errors.Detalle}
                    label="Detalle"
                    name="Detalle"
                    placeholder="Detalle de la bomba"
                    variant="outlined"
                    fullWidth
                    value={values.Detalle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    error={Boolean(errors.Numero && touched.Numero)}
                    helperText={touched.Numero && errors.Numero}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Numero}
                    label="Número de bomba"
                    name="Numero"
                    id="Numero"
                    type="number"
                    component={renderTextField}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={Boolean(errors.NombrePaciente && touched.NombrePaciente)}
                    helperText={touched.NombrePaciente && errors.NombrePaciente}
                    label="Nombre Paciente"
                    name="NombrePaciente"
                    placeholder="Nombre del Paciente"
                    variant="outlined"
                    fullWidth
                    value={values.NombrePaciente}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={Boolean(errors.CedulaPaciente && touched.CedulaPaciente)}
                    helperText={touched.CedulaPaciente && errors.CedulaPaciente}
                    label="Cédula Paciente"
                    name="CedulaPaciente"
                    placeholder="Cédula del Paciente"
                    variant="outlined"
                    fullWidth
                    value={values.CedulaPaciente}
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
  className: PropTypes.string,
  send: PropTypes.func.isRequired
};

export default CreateForm;
