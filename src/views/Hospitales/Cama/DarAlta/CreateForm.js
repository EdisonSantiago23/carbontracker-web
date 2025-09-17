import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import AddShoppingCartIcon from "@material-ui/icons/Add";
import { useSnackbar } from "notistack";

import useAuth from "../../../../contextapi/hooks/useAuth";
import {
  PacienteService,
  CamaService,
  EquiposService,
  HistorialPacienteService,
} from "@services";
const CreateForm = ({ className, send, data }) => {
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [threadKey, setthreadKey] = React.useState(user.IdHospital);
  const daralta = (values) => {
    setLoading(false);
    enqueueSnackbar("Dado de alta correctamente", {
      variant: "success",
    });
    send()
    PacienteService.updateEstadoPaciente(data.id, threadKey, 2).then(() => {
      quitarCama(values);
    }).catch((err) => {
    });;
  };
  const quitarCama = (values) => {
    getHistorialByUsers(values);
    CamaService.getHabitacionesByPaciente(threadKey, data.id).then(
      (querySnapshot) => {
        querySnapshot.forEach(element => {
          limpiarBomba(element.data().idEquipo, element.id)
        });
      }
    )  .catch((err) => {
    });
  };

  const limpiarCama = (item) => {
    CamaService.limpiarCama(threadKey, item).then((res) => { });
  };
  const limpiarBomba = async (item, id) => {
    await EquiposService.limpiarBomba(threadKey, item).then((res) => {
      limpiarCama(id);
    });
  };
  const getHistorialByUsers = (values) => {
    HistorialPacienteService.getHistorialByPaciente(threadKey, data.id)
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        darAltaHistorial(doc, values);
      });
    })
  
  };
  const darAltaHistorial = (item, values) => {
    HistorialPacienteService.updateHistorial(
      threadKey,
      data.id,
      item.id,
      values.Detalle
    ).then(() => { });
  };
  return (
    <Formik
      initialValues={{
        Detalle: data?.Detalle || "",
      }}
      validationSchema={Yup.object().shape({
        Detalle: Yup.string()
          .required("¡Se requiere rellenar este campo!")
          .test("", "Campo Apellido se encuentra vacio", function vApellido(
            Detalle
          ) {
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
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);
        
        daralta(values);
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
                    label="Detalle para dar de alta al paciente"
                    name="Detalle"
                    placeholder="Detalle"
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
                  <AddShoppingCartIcon /> Dar de alta
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
