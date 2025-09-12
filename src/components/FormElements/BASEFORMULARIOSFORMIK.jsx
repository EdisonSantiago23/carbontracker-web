import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Grid, Button, CircularProgress } from '@mui/material';
import { useDispatch } from 'src/store';

const NAMEFILE = () => {
  const dispatch = useDispatch();
  const initialValues = {
    // aquí tus valores iniciales
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        // aquí tu esquema de validación
      })}
      onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
        try {
          // dispatch(postClientesCrear(values, step, cedulaCli));
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        setFieldValue,
        values
      }) => (
        <Fragment>
          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Box mt={2}>
                <Button
                  color="secondary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ py: 1.5, fontWeight: 'bold' }} // ejemplo de estilo moderno
                >
                  Sign up
                </Button>
              </Box>
            </form>
          )}
        </Fragment>
      )}
    </Formik>
  );
};

export default NAMEFILE;
