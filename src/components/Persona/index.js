import CardContent from '@mui/material/CardContent';
import { CardHeader, Card, Grid, TextField, InputAdornment, Typography } from '@mui/material';
import PropTypes from "prop-types";
import Iconify from '../../components/iconify';

export default function Index(props) {
  const { nombre, apellido, cedula, FechaNacimiento, seguro } = props;


  return (

    <Card  >
      <CardHeader
        component={Typography}
        title={"Datos de pacientes"} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <TextField
              name="Nombre"
              value={nombre}
              label="Nombre"
              type={'text'}
              disabled={true}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon={'ic:outline-people'} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              name="Apellido"
              value={apellido}
              label="Apellido"
              type={'text'}
              disabled={true}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon={'ic:twotone-people-alt'} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              name="Cédula"
              value={cedula}
              label="Cédula"
              type={'text'}
              disabled={true}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon={'mdi:id-card-outline'} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              name="Fecha de nacimiento"
              value={FechaNacimiento}
              label="Fecha de nacimiento"
              type={'text'}
              disabled={true}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon={'clarity:date-outline-badged'} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              name="¿Tiene seguro?"
              value={seguro ? "Si" : "No"}
              label="¿Tiene seguro?"
              type={'text'}
              disabled={true}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon={'mdi:encryption-secure'} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

      </CardContent>

    </Card>
  );
}
Index.propTypes = {
  labelText: PropTypes.string,
  opciones: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  variant: PropTypes.oneOf(['filled', 'standard']),
  onChangeValue: PropTypes.func,
  cargando: PropTypes.bool,
};
Index.defaultProps = {
  opciones: [],
  valor: null,
  cargando: true,
  variant: 'filled',
  labelText: '',
  onChangeValue: () => {

  },
};