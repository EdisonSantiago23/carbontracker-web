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
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { RolService, FuncionalidadService } from "@services";
import Accordion from "./../Accordion";
import AddShoppingCartIcon from "@material-ui/icons/Add";
import { Checkbox, FormGroup } from '@mui/material';

const CreateForm = ({ className, send, data }) => {
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const [funcionalidad, setFuncionalidad] = React.useState([]);
  const [funcionalidadSistema, setFuncionalidadSistema] = React.useState([]);
  const [funcionalidadPersonaSistema, setFuncionalidadPersonaSistema] = React.useState([]);

  const { enqueueSnackbar } = useSnackbar();


  React.useEffect(() => {
    setLoading(true);

    getFuncionalidades();

  }, [getFuncionalidades, data]);
  const getFuncionalidades = React.useCallback(() => {
    try {
      FuncionalidadService.getFuncionalidad(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setFuncionalidad(Items);

          },
        },
      );
      if (data) {
        funcionEditar();

      } else {
        setLoading(false);

      }
    } catch (e) { }
  }, []);
  const funcionObtenerFuncionalidades = (res) => {
    const auxSn = funcionalidadSistema;
    auxSn.push(res)
    setFuncionalidadSistema(auxSn)

  }
  const funcionEditar = () => {
    const nuevaVariacion = [];
    for (const [key, value] of Object.entries(data.data())) {
      let datosTras = {
        'nombre': key,
        'valor': value,
      }
      nuevaVariacion.push(datosTras)
    }
    setFuncionalidadPersonaSistema(nuevaVariacion)
    setLoading(false);
  }

  const handleChanges = (event) => {
    setLoading2(true)
    const funcionLLegada = funcionalidadSistema;
    const objIndex2 = funcionLLegada.find((x) => x.tag == event.target.name);
    const objIndex = funcionLLegada.findIndex((x) => x.tag == event.target.name);
    funcionLLegada[objIndex].valor = !objIndex2?.valor;
    setTimeout(() => {
      setLoading2(false)
      setFuncionalidadSistema(funcionLLegada)

    }, 500);

  };
  const agregar = (values, stateDats) => {
    try {
      RolService.newRol(values, stateDats).then(() => {
        setLoading(false);

        enqueueSnackbar("Roll creado correctamente", {
          variant: "success",
        });
        send();
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const update = (values, stateDats) => {
    RolService.updateRol(values, stateDats, data.id).then((rss) => {
      setLoading(false);
      enqueueSnackbar("Rol  actualizada correctamente", {
        variant: "success",
      });
      send();
    });
  };
  return (
    <Formik
      initialValues={{
        Nombre: data?.data().Nombre || "",
        Tag: data?.data().Tag || "",

      }}
      validationSchema={Yup.object().shape({
        Nombre: Yup.string()
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
        Tag: Yup.string()
          .required("¡Se requiere rellenar eleste campo!")
          .test("", "Campo Tag se encuentra vacio", function vnombre(
            Tag
          ) {
            if (typeof Tag === "undefined") {
              return false;
            } else {
              Tag = Tag.trim();
              if (Tag == "") {
                return false;
              } else {
                return true;
              }
            }
          }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const objetosRoles = funcionalidadSistema.reduce(function (map, obj) {
          map[obj.tag] = obj.valor;
          return map;
        }, {});
        setLoading(true);
        if (data) {
          update(values, objetosRoles);
        } else {
          agregar(values, objetosRoles);
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
                    error={errors.Nombre && touched.Nombre}
                    helperText={
                      errors.Nombre && touched.Nombre && errors.Nombre
                    }
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre del rol"
                    variant="outlined"
                    value={values.Nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={errors.Tag && touched.Tag}
                    helperText={
                      errors.Tag && touched.Tag && errors.Tag
                    }
                    label="Tag"
                    name="Tag"
                    placeholder="Tag"
                    variant="outlined"
                    value={values.Tag}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                </Grid>
                <FormControl component="fieldset">
                  <Accordion
                    items={funcionalidad}
                    funcionalidadSistema={funcionalidadPersonaSistema}
                    onChangeValue={handleChanges}
                    onChangeItem={(res) => funcionObtenerFuncionalidades(res)}
                  />
                  {/* {!loading2 &&<FormGroup>
                    {funcionalidadSistema.map((row, index) => {
                      return <FormControlLabel
                        control={
                          <Checkbox
                            name={row.tag}
                            checked={row.valor}
                            key={index}
                          />
                        }
                        label={row.nombre}
                      />
                    })}


                  </FormGroup>}  */}
                </FormControl>
              </Grid>
              <Box mt={2}>
                <Button
                  color="primary"
                  disabled={loading}
                  size="large"
                  type="submit"
                  fullWidth
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
};

CreateForm.propTypes = {
  className: PropTypes.string,
};

export default CreateForm;
