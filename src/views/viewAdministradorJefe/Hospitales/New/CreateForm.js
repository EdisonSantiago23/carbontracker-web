import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField, makeStyles, InputAdornment } from "@material-ui/core";
import * as FirestoreService from "../services/firestore";
import AddShoppingCartIcon from "@material-ui/icons/Add";
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
  return <Formik initialValues={{
    Nombre: "",
    Direccion: "",
    Telefono: "",
    Detalle: ""
  }} validationSchema={Yup.object().shape({
    Nombre: Yup.string().required("¡Se requiere rellenar eleste campo!").test('', 'Campo Nombre se encuentra vacio', function vnombre(nombre) {
      if (typeof nombre === 'undefined') {
        return false;
      } else {
        nombre = nombre.trim();

        if (nombre == '') {
          return false;
        } else {
          return true;
        }
      }
    }),
    Direccion: Yup.string().required("¡Se requiere rellenar este campo!").test('', 'Campo Direccion se encuentra vacio', function vdireccion(direccion) {
      if (typeof direccion === 'undefined') {
        return false;
      } else {
        direccion = direccion.trim();

        if (direccion == '') {
          return false;
        } else {
          return true;
        }
      }
    }),
    Telefono: Yup.string().required("¡Se requiere rellenar este campo!").max(20, '¡Maximo de 20 caracteres!').matches(/^\d*\.?\d*$/gm, "¡Solo se admiten números!"),
    Detalle: Yup.string().required("¡Se requiere rellenar eleste campo!").test('', 'Campo Detalle se encuentra vacio', function vdetalle(detalle) {
      if (typeof detalle === 'undefined') {
        return false;
      } else {
        detalle = detalle.trim();

        if (detalle == '') {
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
      console.log('values', values);
      FirestoreService.newHospital(values).then(() => {
        setStatus({
          success: true
        });
        setSubmitting(false);
        setLoading(false);
        enqueueSnackbar("Hospital creado correctamente", {
          variant: "success"
        });
        send();
      });
    } catch (err) {
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
                  <TextField error={errors.Direccion && touched.Direccion} helperText={errors.Direccion && touched.Direccion && errors.Direccion} label="Direccion" name="Direccion" placeholder="Direccion del hospital" variant="outlined" fullWidth="true" value={values.Direccion} onChange={handleChange} onBlur={handleBlur} />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Telefono && touched.Telefono} label="Número de Teléfono" name="Telefono" placeholder="Número de Teléfono del residente" variant="outlined" fullWidth="true" value={values.Telefono} onChange={handleChange} onBlur={handleBlur} helperText={errors.Telefono && touched.Telefono && errors.Telefono} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Detalle && touched.Detalle} helperText={errors.Detalle && touched.Detalle && errors.Detalle} label="Detalle" name="Detalle" placeholder="Detalle del hospital" variant="outlined" fullWidth="true" value={values.Detalle} onChange={handleChange} onBlur={handleBlur} />
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