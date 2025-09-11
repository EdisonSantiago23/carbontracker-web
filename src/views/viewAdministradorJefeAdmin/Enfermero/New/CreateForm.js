import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, TextField, makeStyles, InputAdornment } from "@material-ui/core";
import * as FirestoreService from "../services/firestore";
import AddShoppingCartIcon from "@material-ui/icons/Add";
import useAuth from "../../../../contextapi/hooks/useAuth";
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
  data
}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const {
    enqueueSnackbar
  } = useSnackbar();
  const {
    isAuthenticated,
    user
  } = useAuth();
  const [threadKey, setthreadKey] = React.useState(user.hospitalId);

  const agregar = values => {
    try {
      FirestoreService.newHospital(values, threadKey).then(() => {
        setLoading(false);
        enqueueSnackbar("Hospital creado correctamente", {
          variant: "success"
        });
        send();
      });
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  };

  const update = values => {
    FirestoreService.updateHospital(values, data.id, threadKey).then(rss => {
      setLoading(false);
      enqueueSnackbar("Bomba actualizada correctamente", {
        variant: "success"
      });
      send();
    });
  };

  return <Formik initialValues={{
    Nombre: data?.data().Nombre || "",
    Apellido: data?.data().Apellido || "",
    Cedula: data?.data().Cedula || ""
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
    Apellido: Yup.string().required("¡Se requiere rellenar este campo!").test("", "Campo Apellido se encuentra vacio", function vApellido(Apellido) {
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
    Cedula: Yup.string().required("¡Se requiere rellenar este campo!").max(20, "¡Maximo de 20 caracteres!").matches(/^\d*\.?\d*$/gm, "¡Solo se admiten números!")
  })} onSubmit={async (values, {
    setErrors,
    setStatus,
    setSubmitting
  }) => {
    setLoading(true);

    if (data) {
      update(values);
    } else {
      agregar(values);
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
            </Box> : <form onSubmit={handleSubmit} className={clsx(classes.root, className)}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Nombre && touched.Nombre} helperText={errors.Nombre && touched.Nombre && errors.Nombre} label="Nombre" name="Nombre" placeholder="Nombre del hospital" variant="outlined" fullWidth="true" value={values.Nombre} onChange={handleChange} onBlur={handleBlur} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Apellido && touched.Apellido} helperText={errors.Apellido && touched.Apellido && errors.Apellido} label="Apellido" name="Apellido" placeholder="Apellido" variant="outlined" fullWidth="true" value={values.Apellido} onChange={handleChange} onBlur={handleBlur} />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField error={errors.Cedula && touched.Cedula} label="Número de Cedula" name="Cedula" placeholder="Número de Cedula del residente" variant="outlined" fullWidth="true" value={values.Cedula} onChange={handleChange} onBlur={handleBlur} helperText={errors.Cedula && touched.Cedula && errors.Cedula} />
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