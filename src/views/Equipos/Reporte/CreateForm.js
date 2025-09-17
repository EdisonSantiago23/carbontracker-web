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
import { EquiposService, HospitalService, AreaService } from '@services'

import AddShoppingCartIcon from "@material-ui/icons/Add";
import useAuth from "../../../contextapi/hooks/useAuth";



const CreateForm = ({ className, send, data }) => {
  const [loading, setLoading] = React.useState(true);
  const [areas, setAreas] = React.useState([]);
  const equipo = data.data();

  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, user } = useAuth();
  const [threadKey, setthreadKey] = React.useState(user.IdHospital);
  React.useEffect(() => {
    getPacientes();
  }, [getPacientes]);
  const agregar = (values) => {
    try {
      EquiposService.updateEquipoReport(threadKey, data.id).then(() => {
        setLoading(false);
        reporterBomba(values);
        enqueueSnackbar("Agradecemos la información enviada, estaremos solucionando su problema lo más pronto posible.", {
          variant: "success",
        });
      });
    } catch (err) {
      setLoading(false);
    }
  };
  function reporterBomba(datas) {

    setLoading(true);
    EquiposService.newReporte(datas, threadKey, data.id)
      .then((doc) => {
        setLoading(false);
        seE(datas);
        send();

        enqueueSnackbar("Registro exitoso", {
          variant: "success",
        });
      })
      .catch(function (error) { });
  }

  const seE = (dsatos) => {

    try {
      HospitalService.getHispitalById(threadKey)
        .then((snapshot) => {
          enviarCorreo(snapshot.data(), dsatos);
        })
        .catch((err) => {
        });
    } catch (e) { }
  };
  const enviarCorreo = async (soporte, datas) => {

    const datosSoporte = JSON.parse(soporte.datosSoporte);
    const mensaje = "Bomba(" + equipo?.Modelo + "-" + equipo?.Serial + "-" + equipo?.Codigo + ") reportada con detalle:" + datas.Detalle + "";
    const info = {
      email: datosSoporte.Correo,
      message: mensaje
    };
    const response = await fetch("https://iot-service.vercel.app/api/enviarreporte",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(info),
      }
    );
    if (response.status === "success") {
    } else if (response.status === "fail") {
    }

  };
  const getPacientes = React.useCallback(() => {
    try {
      AreaService.getAreaById(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setAreas(Items);
          },
        },
        threadKey
      );
      setLoading(false);
    } catch (e) { }
  }, [threadKey]);
  return (
    <Formik
      initialValues={{
        Detalle: "",
      }}
      validationSchema={Yup.object().shape({
        Detalle: Yup.string()
          .required("¡Se requiere rellenar eleste campo!")
          .test("", "Campo Detalle se encuentra vacio", function vnombre(
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
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);
        agregar(values);
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
            >
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <TextField
                    error={errors.Detalle && touched.Detalle}
                    helperText={
                      errors.Detalle && touched.Detalle && errors.Detalle
                    }
                    label="Daño"
                    name="Detalle"
                    placeholder="Detalle del reporte"
                    variant="outlined"
                    fullWidth
                    value={values.Detalle}
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
                >
                  <AddShoppingCartIcon /> Reportar
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
