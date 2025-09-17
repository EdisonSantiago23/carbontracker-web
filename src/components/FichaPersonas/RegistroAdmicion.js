import React, { Fragment } from "react";
import { Stack, Autocomplete } from "@mui/material";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, CircularProgress, Grid, TextField, Typography, Checkbox } from '@mui/material';
import AddShoppingCartIcon from "@material-ui/icons/Add";
import useAuth from "../../contextapi/hooks/useAuth";


export default function RegistroAdmicion({ className, send, data, tieneCama }) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {

  }, []);


  return (
    <Formik
      initialValues={{
        ApellidoPaterno: data?.data().ApellidoPaterno || "",
        ApellidoMaterno: data?.data().ApellidoMaterno || "",
        PrimerNombre: data?.data().PrimerNombre || "",
        SegundoNombre: data?.data().SegundoNombre || "",


        DireccionResidencia: data?.data().DireccionResidencia || "",
        Barrio: data?.data().Barrio || "",
        Parroquia: data?.data().Parroquia || "",
        Canton: data?.data().Canton || "",
        Provincia: data?.data().Provincia || "",
        ZonaUR: data?.data().ZonaUR || "",
        Telefono: data?.data().Telefono || "",

        FechaNacimiento: data?.data().FechaNacimiento || "",
        LugarNacimiento: data?.data().LugarNacimiento || "",
        Nacionalidad: data?.data().Nacionalidad || "",
        GrupoCultural: data?.data().GrupoCultural || "",
        EdadAnos: data?.data().EdadAnos || "",
        Genero: data?.data().Genero || "",
        EstadoCivil: data?.data().EstadoCivil || "",
        Instruccion: data?.data().Instruccion || "",
        Ocupacion: data?.data().Ocupacion || "",
        Cedula: data?.data().Cedula || "",
        EmpresaTrabajo: data?.data().Cedula || "",
        TipoSeguro: data?.data().TipoSeguro || "",
        Referido: data?.data().Referido || "",

        

        NombreContacto: data?.data().NombreContacto || "",
        ApellidoContacto: data?.data().ApellidoContacto || "",
        CedulaContacto: data?.data().CedulaContacto || "",
        CelularContacto: data?.data().CelularContacto || "",
        ParentezcoContacto: data?.data().ParentezcoContacto || "",
      }}
      validationSchema={Yup.object().shape({
    
        FechaNacimiento: Yup.string()
          .required("¡Se requiere rellenar este campo!"),
   
  
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        // agregar(values);
        console.error("values",values)

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
                {/* datos personales */}

                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.ApellidoPaterno && touched.ApellidoPaterno}
                    helperText={errors.ApellidoPaterno && touched.Apellido && errors.ApellidoPaterno}
                    label="Apellido Paterno"
                    name="ApellidoPaterno"
                    placeholder="Apellido Paterno"
                    variant="outlined"
                    fullWidth
                    value={values.ApellidoPaterno}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.ApellidoMaterno && touched.ApellidoMaterno}
                    helperText={
                      errors.ApellidoMaterno && touched.ApellidoMaterno && errors.ApellidoMaterno
                    }
                    label="Apellido Materno"
                    name="ApellidoMaterno"
                    placeholder="Apellido Materno"
                    variant="outlined"
                    fullWidth
                    value={values.ApellidoMaterno}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.PrimerNombre && touched.PrimerNombre}
                    helperText={errors.PrimerNombre && touched.PrimerNombre && errors.PrimerNombre}
                    label="Primer Nombre"
                    name="PrimerNombre"
                    placeholder="Primer Nombre"
                    variant="outlined"
                    fullWidth
                    value={values.PrimerNombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.SegundoNombre && touched.SegundoNombre}
                    helperText={errors.SegundoNombre && touched.SegundoNombre && errors.SegundoNombre}
                    label="Segundo Nombre"
                    name="SegundoNombre"
                    placeholder="Segundo Nombre"
                    variant="outlined"
                    fullWidth
                    value={values.SegundoNombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Cedula && touched.Cedula}
                    label="Número de Cedula"
                    name="Cedula"
                    placeholder="Número de Cedula del residente"
                    variant="outlined"
                    fullWidth
                    value={values.Cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.Cedula && touched.Cedula && errors.Cedula
                    }
                  />
                </Grid>
                {/* direccion */}
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.DireccionResidencia && touched.DireccionResidencia}
                    label="Direccion Residencia Habitual"
                    name="DireccionResidencia"
                    placeholder="Direccion Residencia Habitual"
                    variant="outlined"
                    fullWidth
                    value={values.DireccionResidencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.DireccionResidencia && touched.DireccionResidencia && errors.DireccionResidencia}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Barrio && touched.Barrio}
                    label="Barrio"
                    name="Barrio"
                    placeholder="Barrio"
                    variant="outlined"
                    fullWidth
                    value={values.Barrio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Barrio && touched.Barrio && errors.Barrio} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Parroquia && touched.Parroquia}
                    label="Parroquia"
                    name="Parroquia"
                    placeholder="Parroquia"
                    variant="outlined"
                    fullWidth
                    value={values.Parroquia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Parroquia && touched.Parroquia && errors.Parroquia} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Canton && touched.Canton}
                    label="Canton"
                    name="Canton"
                    placeholder="Canton"
                    variant="outlined"
                    fullWidth
                    value={values.Canton}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Canton && touched.Canton && errors.Canton} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Provincia && touched.Provincia}
                    label="Provincia"
                    name="Provincia"
                    placeholder="Provincia"
                    variant="outlined"
                    fullWidth
                    value={values.Provincia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Provincia && touched.Provincia && errors.Provincia} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.ZonaUR && touched.ZonaUR}
                    label="ZonaUR"
                    name="ZonaUR"
                    placeholder="ZonaUR"
                    variant="outlined"
                    fullWidth
                    value={values.ZonaUR}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.ZonaUR && touched.ZonaUR && errors.ZonaUR} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Telefono && touched.Telefono}
                    label="Teléfono"
                    name="Telefono"
                    placeholder="Teléfono"
                    variant="outlined"
                    fullWidth
                    value={values.Telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Telefono && touched.Telefono && errors.Telefono} />
                </Grid>
                {/* fechanaci */}

                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.FechaNacimiento && touched.FechaNacimiento}
                    label="FechaNacimiento"
                    name="FechaNacimiento"
                    placeholder="FechaNacimiento"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true, required: true }}
                    value={values.FechaNacimiento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.FechaNacimiento && touched.FechaNacimiento && errors.FechaNacimiento}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.LugarNacimiento && touched.LugarNacimiento}
                    label="Lugar Nacimiento"
                    name="LugarNacimiento"
                    placeholder="Lugar Nacimiento"
                    variant="outlined"
                    fullWidth
                    value={values.LugarNacimiento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.LugarNacimiento && touched.LugarNacimiento && errors.LugarNacimiento} />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Nacionalidad && touched.Nacionalidad}
                    label="Nacionalidad"
                    name="Nacionalidad"
                    placeholder="Nacionalidad"
                    variant="outlined"
                    fullWidth
                    value={values.Nacionalidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Nacionalidad && touched.Nacionalidad && errors.Nacionalidad} />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.GrupoCultural && touched.GrupoCultural}
                    label="Grupo Cultural"
                    name="GrupoCultural"
                    placeholder="GrupoCultural"
                    variant="outlined"
                    fullWidth
                    value={values.GrupoCultural}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.GrupoCultural && touched.GrupoCultural && errors.GrupoCultural} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.EdadAnos && touched.EdadAnos}
                    label="Edad en años"
                    name="EdadAnos"
                    placeholder="Edad en años"
                    variant="outlined"
                    fullWidth
                    value={values.EdadAnos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.EdadAnos && touched.EdadAnos && errors.EdadAnos} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.EdadAnos && touched.EdadAnos}
                    label="Edad en años"
                    name="EdadAnos"
                    placeholder="Edad en años"
                    variant="outlined"
                    fullWidth
                    value={values.EdadAnos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.EdadAnos && touched.EdadAnos && errors.EdadAnos} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Genero && touched.Genero}
                    label="Genero"
                    name="Genero"
                    placeholder="Genero"
                    variant="outlined"
                    fullWidth
                    value={values.Genero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Genero && touched.Genero && errors.Genero} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.EstadoCivil && touched.EstadoCivil}
                    label="Estado Civil"
                    name="EstadoCivil"
                    placeholder="Estado Civil"
                    variant="outlined"
                    fullWidth
                    value={values.EstadoCivil}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.EstadoCivil && touched.EstadoCivil && errors.EstadoCivil} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Instruccion && touched.Instruccion}
                    label="Instrucción"
                    name="Instruccion"
                    placeholder="Instrucción"
                    variant="outlined"
                    fullWidth
                    value={values.Instruccion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Instruccion && touched.Instruccion && errors.Instruccion} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Ocupacion && touched.Ocupacion}
                    label="Ocupación"
                    name="Ocupacion"
                    placeholder="Ocupación"
                    variant="outlined"
                    fullWidth
                    value={values.Ocupacion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Ocupacion && touched.Ocupacion && errors.Ocupacion} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.EmpresaTrabajo && touched.EmpresaTrabajo}
                    label="Empresa donde trabaja"
                    name="EmpresaTrabajo"
                    placeholder="Empresa donde trabaja"
                    variant="outlined"
                    fullWidth
                    value={values.EmpresaTrabajo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.EmpresaTrabajo && touched.EmpresaTrabajo && errors.EmpresaTrabajo} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.TipoSeguro && touched.TipoSeguro}
                    label="Tipo de seguro"
                    name="TipoSeguro"
                    placeholder="Tipo de seguro"
                    variant="outlined"
                    fullWidth
                    value={values.TipoSeguro}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.TipoSeguro && touched.TipoSeguro && errors.TipoSeguro} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    error={errors.Referido && touched.Referido}
                    label="Referido"
                    name="Referido"
                    placeholder="Referido"
                    variant="outlined"
                    fullWidth
                    value={values.Referido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.Referido && touched.Referido && errors.Referido} />
                </Grid>
                
                
              </Grid>
              <Box mt={2} >
                <Button
                  color="primary"
                  disabled={loading}
                  type="submit"
                  variant="contained">
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

RegistroAdmicion.propTypes = {
  className: PropTypes.string,
};

