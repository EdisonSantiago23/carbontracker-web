import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Box, CircularProgress, } from '@mui/material';
import renderTextField from '../../../components/FormElements/InputText';
import useAuth from "../../../contextapi/hooks/useAuth";
import Button from "../../../components/CustomButtons/Button";

const FormLogin = () => {
    const { login } = useAuth();
    const valueIni = {
        email: '',
        password: '',
    };
    const handleLogin = React.useCallback(async (values, setSubmitting) => {
        try {
            await login(values.email, values.password);
            setSubmitting(false);

        } catch (err) {
            setSubmitting(false);
        }
    }, [login]);

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
                password: Yup.string()
                    .required("¡Se requiere rellenar eleste campo!")
                    .test("", "Campo password se encuentra vacio", function vpassword(
                        password
                    ) {
                        if (typeof password === "undefined") {
                            return false;
                        } else {
                            password = password.trim();
                            if (password == "") {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }),
            })}

            onSubmit={handleLogin}
        >

            {({ errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setSubmitting,
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
                        <Form onSubmit={handleSubmit}>

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
                            <Field
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                label="Contraseña"
                                name="password"
                                id="password"
                                type="password"
                              
                                component={renderTextField}
                            />

                            <Box mt={2}>
                                <Button onClick={() => {
                                    setSubmitting(true);
                                    handleLogin(values, setSubmitting);
                                }} color="danger" disabled={isSubmitting} fullWidth size="md" type="submit" variant="contained" >
                                    Iniciar
                                </Button>
                            </Box>
                        </Form >
                    )}
                </Fragment>

            )}
        </Formik>
    );
};


export default FormLogin;
