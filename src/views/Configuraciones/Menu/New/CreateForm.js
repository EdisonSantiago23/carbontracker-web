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
import { MenuService } from '@services'
import AddShoppingCartIcon from "@material-ui/icons/Add";
import { listIcons } from '@iconify/react';
import Iconify from '../../../../components/iconify';


const CreateForm = ({ className, send, data, idFuncionalidad }) => {
  const [listaIconos,setListaIconos] =  React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [iconBoton, setIconBoton] = React.useState(data ? data?.data().Icon : '');
  const [loadingBt, setLoadingBt] = React.useState(false);
  React.useEffect(() => {
    setListaIconos(listIcons())
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const agregar = (values) => {
    try {
      MenuService.newMenu(values).then(() => {
        setLoading(false);

        enqueueSnackbar("Menú creado correctamente", {
          variant: "success",
        });
        send();
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const update = (values) => {
    MenuService.updateMenu(values, data.id).then((rss) => {
      setLoading(false);

      enqueueSnackbar("Menú actualizada correctamente", {
        variant: "success",
      });
      send();
    });
  };
  const updateBtn=(res)=>{
    setLoadingBt(true)

    setIconBoton(res)

    setTimeout(() => {
      setLoadingBt(false)

    }, 500);
  }
  if (loadingBt) {
    return (<Box display="flex" justifyContent="center" my={5}>
      <CircularProgress />
    </Box>)
  } else {
    return (
      <Formik
        initialValues={{
          Title: data?.data().Title || "",
          Path: data?.data().Path || "",
          Icon: iconBoton || "",
          Orden: data?.data().Orden || "",
        }}
        validationSchema={Yup.object().shape({
          Title: Yup.string()
            .required("¡Se requiere rellenar eleste campo!")
            .test("", "Campo Nombre se encuentra vacio", function vnombre(
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
          Path: Yup.string()
            .required("¡Se requiere rellenar eleste campo!")
            .test("", "Campo Tag se encuentra vacio", function vnombre(
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
          Icon: Yup.string()
            .required("¡Se requiere rellenar eleste campo!")
            .test("", "Campo Tag se encuentra vacio", function vnombre(
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
          Orden: Yup.string()
            .required("¡Se requiere rellenar eleste campo!")
            .test("", "Campo Tag se encuentra vacio", function vnombre(
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
          if (data) {
            update(values);
          } else {
            agregar(values);
          }
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
                  <Grid item xs={12} lg={6}>
                    <TextField
                      error={errors.Title && touched.Title}
                      helperText={
                        errors.Title && touched.Title && errors.Title
                      }
                      label="Title"
                      name="Title"
                      placeholder="Title"
                      variant="outlined"
                      fullWidth
                      value={values.Title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      error={errors.Path && touched.Path}
                      helperText={
                        errors.Path && touched.Path && errors.Path
                      }
                      label="Path"
                      name="Path"
                      placeholder="Path"
                      variant="outlined"
                      fullWidth
                      value={values.Path}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      error={errors.Icon && touched.Icon}
                      helperText={
                        errors.Icon && touched.Icon && errors.Icon
                      }
                      label="Icon"
                      name="Icon"
                      placeholder="Icon"
                      variant="outlined"
                      fullWidth
                      value={values.Icon}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      error={errors.Orden && touched.Orden}
                      helperText={
                        errors.Orden && touched.Orden && errors.Orden
                      }
                      label="Orden"
                      name="Orden"
                      placeholder="Orden"
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={values.Orden}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  {listaIconos.map((contractItem, index) => {
                    return (
                      <Button sx={{
                        marginTop: 2
                      }} onClick={() => updateBtn(contractItem)} >

                        <Iconify icon={contractItem} sx={{ width: 25, height: 25 }}  />
                      </Button>

                    );
                  })}
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
                    <AddShoppingCartIcon /> Agregar
                  </Button>
                </Box>
              </form>
            )}
          </Fragment>
        )}
      </Formik>
    );
  }
};

CreateForm.propTypes = {
  className: PropTypes.string,
};

export default CreateForm;
