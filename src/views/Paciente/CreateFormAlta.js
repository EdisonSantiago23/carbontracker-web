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
import useAuth from "../../contextapi/hooks/useAuth";
import {
  PacienteService,
  CamaService,
  EquiposService,
  HistorialPacienteService,
} from "@services";
import { useSnackbar } from "notistack";
const CreateForm = ({  send, data }) => {
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();
  const IdHospital = user.IdHospital;
  const { enqueueSnackbar } = useSnackbar();

  const darDeAlta = (values) => {
    PacienteService.updateEstadoPaciente(IdHospital, data.id, 2).then(() => {
      quitarCama(values);
      getHistorialByUsers(values);

    })
  };
  const quitarCama = (values) => {
    CamaService.getHabitacionesByPaciente2(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          Items.forEach((element) => {
            limpiarBomba(element.data().IdEquipo, element.id)
          });
    
        },
      },IdHospital, data.id );
  };

  const limpiarBomba = async (item, id) => {
    await EquiposService.limpiarBomba(IdHospital, item).then((res) => {
      limpiarCama(id);
    });
  };
  const limpiarCama = (item) => {
    CamaService.limpiarCama(IdHospital, item).then((res) => {
      setLoading(false);
      enqueueSnackbar("Dado de alta correctamente", { variant: "success", });
      send()
    });
  };
  const getHistorialByUsers = (values) => {
    HistorialPacienteService.getHistorialByPaciente(IdHospital, data.id)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          darAltaHistorial(doc, values);
        });
      })
  };
  const darAltaHistorial = (item, values) => {
    HistorialPacienteService.updateHistorial(
      IdHospital,
      data.id,
      item.id,
      values.Detalle
    ).then(() => { });
  };
  return (
    <Formik
      initialValues={{
        Detalle: data?.data().Detalle || "",
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
        darDeAlta(values);
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
