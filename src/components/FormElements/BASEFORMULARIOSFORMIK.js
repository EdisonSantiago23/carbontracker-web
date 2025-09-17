import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Field  } from 'formik';
import {
    Box,
    Grid,
    Button,
    CircularProgress,
} from '@mui/material';


const NAMEFILE = () => {
    const valueIni = {

    };
    return (
        <Formik
            initialValues={valueIni}
            validationSchema={Yup.object().shape({
            })}

            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                try {
                //dispatch(postClientesCrear(values, step, cedulaCli));
                setStatus({ success: true });
                setSubmitting(false);
                } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                }
            }}
        >

            {({ errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                setFieldValue,
                values }) => (
                <Fragment>
                    {isSubmitting ? (
                        <Box display="flex" justifyContent="center" my={5} >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <form onSubmit={handleSubmit}>

                            <Box mt={2}>
                                <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" >
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
