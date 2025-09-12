import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  MenuItem
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/Add";
import * as FirestoreService from "../services/firestore";
import { useParams } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateForm = ({ className, send, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { threadKey } = useParams();
  const [role, setRole] = useState("jefe");

  const handleSubmitForm = async (values) => {
    setLoading(true);
    try {
      const password = values.Cedula;
      values.Rol = role;
      values.hospitalId = threadKey;

      const doc = await FirestoreService.getUser(values.Cedula);

      if (!doc.exists) {
        await FirestoreService.newUser(values);
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, values.Correo, password);
        enqueueSnackbar("Usuario creado correctamente", { variant: "success" });
        send();
      } else {
        enqueueSnackbar("La cédula ya está registrada", { variant: "warning" });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Ocurrió un error al crear el usuario", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        Nombre: "",
        Apellido: "",
        Cedula: "",
        Correo: ""
      }}
      validationSchema={Yup.object({
        Nombre: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
        Apellido: Yup.string().trim().required("¡Se requiere rellenar este campo!"),
        Correo: Yup.string().email("Ingrese un correo válido!").required("Se requiere rellenar este campo!"),
        Cedula: Yup.string().trim().required("¡Se requiere rellenar este campo!")
      })}
      onSubmit={handleSubmitForm}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form onSubmit={handleSubmit} className={className} {...rest}>
          {loading && (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="Nombre"
                placeholder="Nombre del encargado"
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
                label="Apellido"
                name="Apellido"
                placeholder="Apellido del encargado"
                variant="outlined"
                value={values.Apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.Apellido && touched.Apellido)}
                helperText={touched.Apellido && errors.Apellido}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                label="Correo"
                name="Correo"
                placeholder="Correo del encargado"
                variant="outlined"
                value={values.Correo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.Correo && touched.Correo)}
                helperText={touched.Correo && errors.Correo}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                label="Cédula"
                name="Cedula"
                placeholder="Cédula del encargado"
                variant="outlined"
                value={values.Cedula}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.Cedula && touched.Cedula)}
                helperText={touched.Cedula && errors.Cedula}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                select
                fullWidth
                label="Rol"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="jefe">Jefe</MenuItem>
                <MenuItem value="jefeAdmin">Jefe administrativo</MenuItem>
              </TextField>
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
              Agregar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

CreateForm.propTypes = {
  className: PropTypes.string,
  send: PropTypes.func.isRequired
};

export default CreateForm;
