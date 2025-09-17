import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { Box, CircularProgress, } from '@mui/material';
import { useDispatch } from 'src/store';
import renderTextField from '../../../components/FormElements/InputText';
import useAuth from "../../../contextapi/hooks/useAuth";
import Button from "../../../components/CustomButtons/Button";

const ResetClave = () => {
    const dispatch = useDispatch();
    const { reset } = useAuth();

    const valueIni = {
        password: '',
    };

    return (
        <Formik
            initialValues={valueIni}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .required("¡Se requiere rellenar eleste campo!")
                    .test("", "Campo Correo se encuentra vacio", function vemail(
                        email
                    ) {
                        if (typeof email === "undefined") {
                            return false;
                        } else {
                            email = email.trim();
                            if (email == "") {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }),

            })}

            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                try {
                    setStatus({ success: true });
                    setSubmitting(false);
                    await reset(values.email);

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
                            <Field
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                label="Correo"
                                name="email"
                                id="email"
                                type="email"
                                component={renderTextField}
                            />


                            <Box mt={2}>
                                <Button color="danger" disabled={isSubmitting} fullWidth size="md" type="submit" variant="contained" >
                                    Enviar
                                </Button>
                            </Box>
                        </form>
                    )}
                </Fragment>

            )}
        </Formik>
    );
};


export default ResetClave;
