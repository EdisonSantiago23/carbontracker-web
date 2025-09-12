import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
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
import { useParams } from "react-router-dom";
import { db } from "../../../../../Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as FirestoreService from "../services/firestore";

const CreateForm = ({ className, send, ...rest }) => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { threadKey } = useParams();
  const auth = getAuth();

  const initialValues = {
    Nombre: "",
    Apellido: "",
    Cedula: "",
    Correo: "",
    color: ""
  };

  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
    Apellido: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
    Cedula: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
    Correo: Yup.string().email("Correo inválido").required("Se requiere rellenar este campo"),
    color: Yup.string().required("Selecciona un color")
  });

  const handleSubmit = async (values, { setStatus, setErrors, setSubmitting }) => {
    setLoading(true);
    try {
      const password = values.Cedula;
      values.Rol = JSON.stringify({ administrador: false, superAdministrador: false, jefe: true, jefeAdmin: false });
      values.hospitalId = threadKey;

      const doc = await FirestoreService.getUser(values.Cedula);
      if (!doc.exists) {
        await FirestoreService.newUser(values);
        await createUserWithEmailAndPassword(auth, values.Correo, password);

        enqueueSnackbar("Usuario creado correctamente", { variant: "success" });
        send();
      } else {
        enqueueSnackbar("El usuario ya existe", { variant: "warning" });
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      enqueueSnackbar("Error al crear el usuario", { variant: "error" });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                    fullWidth
                    label="Nombre"
                    name="Nombre"
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Nombre && errors.Nombre)}
                    helperText={touched.Nombre && errors.Nombre}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    name="Apellido"
                    value={values.Apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Apellido && errors.Apellido)}
                    helperText={touched.Apellido && errors.Apellido}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Correo"
                    name="Correo"
                    value={values.Correo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Correo && errors.Correo)}
                    helperText={touched.Correo && errors.Correo}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    label="Cédula"
                    name="Cedula"
                    value={values.Cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Cedula && errors.Cedula)}
                    helperText={touched.Cedula && errors.Cedula}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    select
                    fullWidth
                    label="Color"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.color && errors.color)}
                    helperText={touched.color && errors.color}
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    <option value="red">Rojo</option>
                    <option value="blue">Azul</option>
                    <option value="green">Verde</option>
                  </TextField>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button fullWidth size="large" color="primary" variant="contained" type="submit" disabled={loading}>
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
  send: PropTypes.func.isRequired
};

export default CreateForm;
