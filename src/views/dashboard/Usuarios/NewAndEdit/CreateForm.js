import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField, makeStyles, InputAdornment } from "@material-ui/core";
import * as FirestoreService from "../services/firestore";
import AddShoppingCartIcon from "@material-ui/icons/Add";
import useSettings from "../../../../contextapi/hooks/useSettings";
import { db } from "../../../../Firebase";
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
  const {
    settings
  } = useSettings();
  const [loading, setLoading] = React.useState(false);
  const {
    enqueueSnackbar
  } = useSnackbar();
  const [usuarios, setUsuarios] = React.useState([]);
  React.useEffect(() => {
    try {} catch (e) {}
  }, [settings.idConjunto]);
  return <Formik initialValues={{
    Nombre: "",
    Apellido: "",
    Correo: "",
    Cedula: "",
    Celular: ""
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
    Apellido: Yup.string().required("¡Se requiere rellenar este campo!").test("", "Campo Apellido se encuentra vacio", function vapellido(apellido) {
      if (typeof apellido === "undefined") {
        return false;
      } else {
        apellido = apellido.trim();

        if (apellido == "") {
          return false;
        } else {
          return true;
        }
      }
    }),
    Correo: Yup.string().required("¡Se requiere rellenar este campo!").email("Ingrese un correo válido"),
    Cedula: Yup.string().required("¡Se requiere rellenar este campo!").matches(/^\d*\.?\d*$/gm, "¡Solo se admiten números!") // .max(10,'¡Maximo de 10 caracteres!')
    .test("", "¡Ingrese una cedula válida!", function vcedula(cedula) {
      if (typeof cedula === "undefined") {
        return false;
      } else {
        var tdig = 0;
        tdig = cedula.length;

        if (tdig == 10) {
          var strsuma = "",
              dig = 0,
              dig1 = 0,
              digito = 0,
              valor1 = 0,
              valor2 = 0,
              valor3 = 0,
              valor4 = 0,
              valor5 = 0,
              valor6 = 0,
              valor7 = 0,
              valor8 = 0,
              valor9 = 0,
              valor10 = 0,
              simpar = 0,
              suma = 0,
              spar = 0;
          valor1 = cedula.substr(0, 1);
          valor2 = cedula.substr(1, 1);
          valor3 = cedula.substr(2, 1);
          valor4 = cedula.substr(3, 1);
          valor5 = cedula.substr(4, 1);
          valor6 = cedula.substr(5, 1);
          valor7 = cedula.substr(6, 1);
          valor8 = cedula.substr(7, 1);
          valor9 = cedula.substr(8, 1);
          valor10 = cedula.substr(9, 1);
          valor1 = parseInt(valor1);
          valor2 = parseInt(valor2);
          valor3 = parseInt(valor3);
          valor4 = parseInt(valor4);
          valor5 = parseInt(valor5);
          valor6 = parseInt(valor6);
          valor7 = parseInt(valor7);
          valor8 = parseInt(valor8);
          valor9 = parseInt(valor9);
          valor10 = parseInt(valor10);
          spar = valor2 + valor4 + valor6 + valor8;
          valor1 = valor1 * 2;

          if (valor1 > 9) {
            valor1 = valor1 - 9;
          }

          valor3 = valor3 * 2;

          if (valor3 > 9) {
            valor3 = valor3 - 9;
          }

          valor5 = valor5 * 2;

          if (valor5 > 9) {
            valor5 = valor5 - 9;
          }

          valor7 = valor7 * 2;

          if (valor7 > 9) {
            valor7 = valor7 - 9;
          }

          valor9 = valor9 * 2;

          if (valor9 > 9) {
            valor9 = valor9 - 9;
          }

          simpar = valor1 + valor3 + valor5 + valor7 + valor9;
          suma = spar + simpar;
          strsuma = String(suma);
          dig = strsuma.substr(0, 1);
          dig1 = parseInt(dig);
          dig1 = (dig1 + 1) * 10;
          digito = dig1 - suma;

          if (digito == 10) {
            digito = 0;
          }

          if (digito == valor10) {
            return true;
          } else {
            return false;
          }
        }

        {
          return true;
        }
      }
    }),
    Celular: Yup.string().required("¡Se requiere rellenar este campo!").max(10, "¡Maximo de 20 caracteres!").matches(/^\d*\.?\d*$/gm, "¡Solo se admiten números!")
  })} onSubmit={async (values, {
    setErrors,
    setStatus,
    setSubmitting
  }) => {
    setLoading(true);

    try {
      console.log("aaaaaaaaaaaaaaa");
      values.Rol = '{ "administrador": false, "superAdministrador": false, "hospital": false,"jefe": true}';
      FirestoreService.newUser(values).then(() => {
        firebase.auth().createUserWithEmailAndPassword(values.Correo, values.Cedula).then(() => {
          firebase.auth().sendPasswordResetEmail(values.Correo).then(function () {
            setSubmitting(false);
            setStatus({
              success: true
            });
            setLoading(false);
            enqueueSnackbar("Usuario añadido correctamente", {
              variant: "success"
            });
            send();
          }).catch(function (error) {
            console.log("An error happened." + error);
            enqueueSnackbar("No se pudo enviar el correo electrónico", {
              variant: "error"
            });
          });
        });
      }).catch(error => console.log('eeeeeeeee', error));
    } catch (err) {
      console.log('aaaaaaaaa', err);
      setStatus({
        success: false
      });
      setErrors({
        submit: err.message
      });
      setSubmitting(false);
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
                  <TextField error={errors.Nombre && touched.Nombre} helperText={errors.Nombre && touched.Nombre && errors.Nombre} label="Nombre" name="Nombre" placeholder="Nombre del residente" variant="outlined" fullWidth="true" value={values.Nombre} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Apellido && touched.Apellido} helperText={errors.Apellido && touched.Apellido && errors.Apellido} label="Apellido" name="Apellido" placeholder="Apellido del residente" variant="outlined" fullWidth="true" value={values.Apellido} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField error={errors.Correo && touched.Correo} label="Correo Electrónico" name="Correo" placeholder="Correo del residente" variant="outlined" fullWidth="true" value={values.Correo} onChange={handleChange} onBlur={handleBlur} helperText={errors.Correo && touched.Correo && errors.Correo} />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField error={errors.Cedula && touched.Cedula} label="Número de Cédula" name="Cedula" placeholder="Número de cédula del residente" variant="outlined" fullWidth="true" value={values.Cedula} onChange={handleChange} onBlur={handleBlur} helperText={errors.Cedula && touched.Cedula && errors.Cedula} />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField error={errors.Celular && touched.Celular} label="Número de Celular" name="Celular" placeholder="Número de Celular" variant="outlined" fullWidth="true" value={values.Celular} onChange={handleChange} onBlur={handleBlur} helperText={errors.Celular && touched.Celular && errors.Celular} />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button color="primary" disabled={loading} fullWidth size="large" type="submit" variant="contained">
                  <AddShoppingCartIcon /> Agregar usuario
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