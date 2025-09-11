import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField, makeStyles, InputAdornment } from "@material-ui/core";
import * as FirestoreService from "../services/firestore";
import AddShoppingCartIcon from "@material-ui/icons/Add";
import renderTextField from "../../../../../components/FormElements/InputText";
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
    Detalle: "",
    Numero: "",
    NombrePaciente: "",
    CedulaPaciente: ""
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
    Detalle: Yup.string().required("¡Se requiere rellenar eleste campo!").test("", "Campo Detalle se encuentra vacio", function vDetalle(Detalle) {
      if (typeof Detalle === "undefined") {
        return false;
      } else {
        Detalle = Detalle.trim();

        if (Detalle == "") {
          return false;
        } else {
          return true;
        }
      }
    }),
    Numero: Yup.string().required("Se requiere la cantidad de Áforo").matches(/^(?!0\.00)[1-9]\d{0,2}?$/gm, "¡Solo se admiten un número máximo de Áforo de 999!"),
    NombrePaciente: Yup.string().required("¡Se requiere rellenar eleste campo!").test("", "Campo Detalle se encuentra vacio", function vDetalle(Detalle) {
      if (typeof Detalle === "undefined") {
        return false;
      } else {
        Detalle = Detalle.trim();

        if (Detalle == "") {
          return false;
        } else {
          return true;
        }
      }
    }),
    CedulaPaciente: Yup.string().required("Se requiere la cedula")
  })} onSubmit={async (values, {
    setErrors,
    setStatus,
    setSubmitting
  }) => {
    setLoading(true);

    try {
      FirestoreService.newBomba(values, threadKey).then(() => {
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
                  <TextField error={errors.Detalle && touched.Detalle} helperText={errors.Detalle && touched.Detalle && errors.Detalle} label="Detalle" name="Detalle" placeholder="Detalle de la bomba" variant="outlined" fullWidth="true" value={values.Detalle} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Field error={Boolean(touched.Numero && errors.Numero)} helperText={touched.Numero && errors.Numero} onBlur={handleBlur} onChange={handleChange} value={values.Numero} label="Numero de bomba" name="Numero" id="Numero" type="number" component={renderTextField} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.NombrePaciente && touched.NombrePaciente} helperText={errors.NombrePaciente && touched.NombrePaciente && errors.NombrePaciente} label="NombrePaciente" name="NombrePaciente" placeholder="Nombre del Paciente" variant="outlined" fullWidth="true" value={values.NombrePaciente} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.CedulaPaciente && touched.CedulaPaciente} helperText={errors.CedulaPaciente && touched.CedulaPaciente && errors.CedulaPaciente} label="CedulaPaciente" name="CedulaPaciente" placeholder="Cedula del Paciente" variant="outlined" fullWidth="true" value={values.CedulaPaciente} onChange={handleChange} onBlur={handleBlur} />
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