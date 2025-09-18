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
import AddShoppingCartIcon from "@material-ui/icons/Add";
import { useParams } from "react-router-dom";
import firebase from "../../../Firebase";
import { RolService,UsuariosService } from "@services";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const CreateForm = ({ className, send, data, ...rest }) => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { threadKey } = useParams();
  const [rol, setRol] = React.useState([]);

  const [currentFruit, setCurrentFruit] = React.useState();
  const [idRol, setIdrol] = React.useState(null);

  const getRoles = React.useCallback(() => {
    try {
      RolService.getRoles({
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setRol(Items);

          if (data) {
            let pacienteData = Items.find((x) => x.id == data.data().Rol.IdRol);
            setCurrentFruit(pacienteData.data());
            setIdrol(pacienteData.id);
          }
        },
      });
    } catch (e) { }
  }, [data]);
  React.useEffect(() => {
    getRoles();
  }, [getRoles]);
  const handleChanges = (valor) => {
    const pacienteData = rol.find((x) => x.id == valor.target.value);
    setCurrentFruit(pacienteData.data());
    setIdrol(pacienteData.id);
  };
  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Apellido: data?.data().Apellido || "",
        Cedula: data?.data().Cedula || "",
        Correo: data?.data().Correo || "",
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
          .required("¡Se requiere rellenar eleste campo!")
          .test("", "Campo Apellido se encuentra vacio", function vnombre(
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
        Correo: Yup.string()
          .email("Ingrese un correo Valido!")
          .required("Se requiere rellenar este campo!")
          .nullable(),

        Cedula: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo NÚmero se encuentra vacio", function vdireccion(
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
        try {
          let password = values.Cedula;
          currentFruit.IdRol = idRol;
          values.Rol = currentFruit;
          values.IdHospital = data?.data().IdHospital || threadKey;
          UsuariosService.getUser(values.Cedula)
            .then((doc) => {
              if (!doc.exists) {
                UsuariosService.newUser(values)
                  .then(() => {
                    if (data) {
                      enqueueSnackbar("Usuario creado correctamente", {
                        variant: "success",
                      });
                      setLoading(false);
                      send();
                    } else {
                      firebase
                        .auth()
                        .createUserWithEmailAndPassword(values.Correo, password)
                        .then((doc) => {
                          enqueueSnackbar("Usuario actualizado correctamente", {
                            variant: "success",
                          });
                          setLoading(false);
                          send();
                        }).catch((error) => {
                          enqueueSnackbar(
                            "La contraseña debe tener al menos 6 caracteres.",
                            {
                              variant: "error",
                            }
                          );
                          setLoading(false);
                        });
                    }
                  })
                  .catch((error) => {
                    setLoading(false);
                  });
              } else {
                setLoading(false);
              }
            })
            .catch((error) => {
              setLoading(false);
            });
        } catch (err) {
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
              {...rest}
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
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Correo && touched.Correo}
                    helperText={
                      errors.Correo && touched.Correo && errors.Correo
                    }
                    label="Correo Encargado"
                    name="Correo"
                    placeholder="Correo del encargado"
                    variant="outlined"
                    fullWidth
                    value={values.Correo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Cedula && touched.Cedula}
                    helperText={
                      errors.Cedula && touched.Cedula && errors.Cedula
                    }
                    label="Cedula"
                    name="Cedula"
                    placeholder="Cedula del Encargado"
                    variant="outlined"
                    fullWidth
                    value={values.Cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={idRol}
                    label="Age"
                    style={{ width: 320 }}
                    onChange={(e) => handleChanges(e)}
                  >
                    {rol.map((row, index) => {
                      return (
                        <MenuItem key={index} value={row.id}>{row.data().Nombre}</MenuItem>
                      );
                    })}
                  </Select>
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
