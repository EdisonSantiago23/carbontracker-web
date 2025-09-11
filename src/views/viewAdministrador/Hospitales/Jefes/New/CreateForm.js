import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField, makeStyles, InputAdornment } from "@material-ui/core";
import * as FirestoreService from "../services/firestore";
import AddShoppingCartIcon from "@material-ui/icons/Add";
import { useParams } from "react-router-dom";
import { db } from "../../../../../Firebase";
const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    "& .ql-editor": {
      height: 160
    }
  }
}));

const CreateForm = ({
  className,
  send,
  ...rest
}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const {
    enqueueSnackbar
  } = useSnackbar();
  const {
    threadKey
  } = useParams();
  const [currentFruit, setCurrentFruit] = React.useState('jefe');

  const changeFruit = newFruit => {
    setCurrentFruit(newFruit);
  };

  return <Formik initialValues={{
    Nombre: "",
    Apellido: "",
    Cedula: "",
    Correo: ""
  }} validationSchema={Yup.object().shape({
    Nombre: Yup.string().required("¡Se requiere rellenar eleste campo!").test("", "Campo Nombre se encuentra vacio", function vnombre(nombre) {
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
    Apellido: Yup.string().required("¡Se requiere rellenar eleste campo!").test("", "Campo Apellido se encuentra vacio", function vnombre(Apellido) {
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
    Correo: Yup.string().email("Ingrese un correo Valido!").required("Se requiere rellenar este campo!").nullable(),
    Cedula: Yup.string().required("¡Se requiere rellenar este campo!").test("", "Campo NÚmero se encuentra vacio", function vdireccion(direccion) {
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
    })
  })} onSubmit={async (values, {
    setErrors,
    setStatus,
    setSubmitting
  }) => {
    setLoading(true);

    try {
      let password = values.Cedula;
      values.Rol = currentFruit;
      values.hospitalId = threadKey;
      console.log("password", password);
      FirestoreService.getUser(values.Cedula).then(doc => {
        if (!doc.exists) {
          FirestoreService.newUser(values).then(() => {
            firebase.auth().createUserWithEmailAndPassword(values.Correo, password).then(doc => {
              setLoading(false);
              send();
            });
          }).catch(error => {
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }).catch(error => {
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
    }
  }}>
      {({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      touched,
      values
    }) => <Fragment>
          {loading ? <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box> : <form onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Nombre && touched.Nombre} helperText={errors.Nombre && touched.Nombre && errors.Nombre} label="Nombre" name="Nombre" placeholder="Nombre del hospital" variant="outlined" fullWidth="true" value={values.Nombre} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Apellido && touched.Apellido} helperText={errors.Apellido && touched.Apellido && errors.Apellido} label="Apellido" name="Apellido" placeholder="Apellido" variant="outlined" fullWidth="true" value={values.Apellido} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Correo && touched.Correo} helperText={errors.Correo && touched.Correo && errors.Correo} label="Correo Encargado" name="Correo" placeholder="Correo del encargado" variant="outlined" fullWidth="true" value={values.Correo} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Cedula && touched.Cedula} helperText={errors.Cedula && touched.Cedula && errors.Cedula} label="Cedula" name="Cedula" placeholder="Cedula del Encargado" variant="outlined" fullWidth="true" value={values.Cedula} onChange={handleChange} onBlur={handleBlur} />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <select onChange={event => changeFruit(event.target.value)} value={currentFruit}>
                    <option value="jefe">jefe</option>
                    <option value="jefeAdmin">Jefe administrativo</option>
                  </select>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button color="primary" disabled={loading} fullWidth size="large" type="submit" variant="contained">
                  <AddShoppingCartIcon /> Agregar
                </Button>
              </Box>
            </form>}
        </Fragment>}
    </Formik>;
};

CreateForm.propTypes = {
  className: PropTypes.string
};
export default CreateForm;