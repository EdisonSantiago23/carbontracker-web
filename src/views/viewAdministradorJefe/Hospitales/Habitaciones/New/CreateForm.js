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
  return <Formik initialValues={{
    Nombre: "",
    Numero: "",
    NombreEncargado: "",
    CedulaEncargado: ""
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
    Numero: Yup.string().required("¡Se requiere rellenar este campo!").test("", "Campo NÚmero se encuentra vacio", function vdireccion(direccion) {
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
    NombreEncargado: Yup.string().required("¡Se requiere rellenar eleste campo!").test("", "Campo Nombre se encuentra vacio", function vnombre(nombre) {
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
    CedulaEncargado: Yup.string().required("¡Se requiere rellenar este campo!").test("", "Campo NÚmero se encuentra vacio", function vdireccion(direccion) {
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
      FirestoreService.newHabitacion(values, threadKey).then(() => {
        setStatus({
          success: true
        });
        setSubmitting(false);
        setLoading(false);
        enqueueSnackbar("Habitación creada correctamente", {
          variant: "success"
        });
        send();
      });
    } catch (err) {
      console.log(err);
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
                  <TextField error={errors.Nombre && touched.Nombre} helperText={errors.Nombre && touched.Nombre && errors.Nombre} label="Nombre" name="Nombre" placeholder="Nombre del hospital" variant="outlined" fullWidth="true" value={values.Nombre} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Numero && touched.Numero} helperText={errors.Numero && touched.Numero && errors.Numero} label="Numero" name="Numero" placeholder="Numero de habitación" variant="outlined" fullWidth="true" value={values.Numero} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.NombreEncargado && touched.NombreEncargado} helperText={errors.NombreEncargado && touched.NombreEncargado && errors.NombreEncargado} label="Nombre Encargado" name="NombreEncargado" placeholder="Nombre del encargado" variant="outlined" fullWidth="true" value={values.NombreEncargado} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.CedulaEncargado && touched.CedulaEncargado} helperText={errors.CedulaEncargado && touched.CedulaEncargado && errors.CedulaEncargado} label="CedulaEncargado" name="CedulaEncargado" placeholder="Cedula del Encargado" variant="outlined" fullWidth="true" value={values.CedulaEncargado} onChange={handleChange} onBlur={handleBlur} />
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