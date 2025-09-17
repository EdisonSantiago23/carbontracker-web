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
import { RolService, FuncionalidadService, MenuService } from "@services";
import Accordion from "./../Accordion";
import ServiceMenu from "./../ServiceMenu";

import AddShoppingCartIcon from "@material-ui/icons/Add";

const CreateForm = ({ className, send, data }) => {

  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [funcionalidad, setFuncionalidad] = React.useState([]);
  const [menu, setMenu] = React.useState([]);

  const [funcionalidadSistema, setFuncionalidadSistema] = React.useState([]);
  const [funcionalidadPersonaSistema, setFuncionalidadPersonaSistema] = React.useState([]);
  const [menuSistema, setMenuSistema] = React.useState([]);
  const [menuSistemaSelect, setMenuSistemaSelect] = React.useState([]);


  const { enqueueSnackbar } = useSnackbar();


  React.useEffect(() => {
    setLoading(true);

    getFuncionalidades();
    getMenu();
  }, [getFuncionalidades, data, getMenu]);
  const getFuncionalidades = React.useCallback(() => {
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
  }, [data, funcionEditar]);
  const getMenu = React.useCallback(() => {
    MenuService.getMenu(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          const auxSn = [];
          if (data) {
            const MenuIng=data.data().Menu;
            Items.forEach(element => {
              const result =MenuIng !=undefined ? MenuIng.find((x) => x.id == element.id):false;

              let auxDat = {
                "nombre": element.data().Title,
                "icon": element.data().Icon,
                "tag": element.id,
                "valor": result ? true : false

              }
              auxSn.push(auxDat)
            });
          } else {
            Items.forEach(element => {
              const result = menuSistemaSelect.find((x) => x.nombre == element.data().Tag);
              let auxDat = {
                "nombre": element.data().Title,
                "icon": element.data().Icon,
                "tag": element.id,
                "valor": result ? result.valor : false

              }
              auxSn.push(auxDat)
            });
          }
          setMenu(auxSn);
          setMenuSistema(Items);

        },
      },
    );

  }, [data, menuSistemaSelect]);

  const funcionObtenerFuncionalidades = (res) => {
    const auxSn = funcionalidadSistema;
    auxSn.push(res)
    setFuncionalidadSistema(auxSn)

  }
  const funcionEditar = React.useCallback(() => {
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
  }, [data]);


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
  const handleChangesMenu = (event) => {
    const funcionLLegada = menu;


    const objIndex2 = funcionLLegada.find((x) => x.tag == event.target.name);
    const objIndex = funcionLLegada.findIndex((x) => x.tag == event.target.name);
    funcionLLegada[objIndex].valor = !objIndex2?.valor;

    setTimeout(() => {
      setLoading2(false)
      setMenu(funcionLLegada)

    }, 500);
  };
  const agregar = (values, stateDats, auxSn) => {
    try {
      RolService.newRol(values, stateDats, auxSn).then(() => {
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

  const update = (values, stateDats, auxSn) => {
    RolService.updateRol(values, stateDats, auxSn, data.id).then((rss) => {
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
        let resultado = menu.filter((x) => x.valor === true);
        const auxSn = []
        resultado.forEach(element => {
          const result = menuSistema.find((x) => x.id == element.tag);
          const info = result.data();
          info.id = result.id;
          auxSn.push(info)
        });

        setLoading(true);
        if (data) {
          update(values, objetosRoles, auxSn);
        } else {
          agregar(values, objetosRoles, auxSn);
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
                <Grid item xs={12} lg={6}>

                  <Accordion
                    items={funcionalidad}
                    funcionalidadSistema={funcionalidadPersonaSistema}
                    onChangeValue={handleChanges}
                    onChangeItem={(res) => funcionObtenerFuncionalidades(res)}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>

                  <ServiceMenu
                    items={menu}
                    onChangeValue={handleChangesMenu}
                  />
                </Grid>
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
