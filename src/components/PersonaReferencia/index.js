import CardContent from '@mui/material/CardContent';
import PropTypes from "prop-types";

import { CardHeader, Card, Grid, TextField, InputAdornment, Typography } from '@mui/material';
import Iconify from '../../components/iconify';
export default function Index(props) {
  const { nombre,apellido,cedula,celular,parentezco} = props;


  return (
    <Grid paddingTop={2}>

    <Card  >
      <CardHeader
        component={Typography}
        title={"Contacto de emergencia"} />
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
            name="Cedula"
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
            name="Celular"
            value={celular}
            label="Celular"
            type={'text'}
            disabled={true}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Iconify icon={'material-symbols:settings-cell-rounded'} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <TextField
            name="Parentesco"
            value={parentezco}
            label="Parentesco"
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
        </Grid>

      </CardContent>

    </Card>
    </Grid>
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