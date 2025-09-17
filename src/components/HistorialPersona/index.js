import CardContent from '@mui/material/CardContent';
import PropTypes from "prop-types";
import HistorialPersonaTratamiento from "../HistorialPersonaTratamiento";


import { CardHeader, Card, Grid, TextField, InputAdornment, Typography } from '@mui/material';
import Iconify from '../../components/iconify';


export default function Index(props) {
  const { IdHistorial, IdPaciente, area, habitacion, cama, diagnostico, detalleSalida, equipo, fechaIngreso, fechaSalida } = props;

  return (
    <Grid paddingTop={2}>

      <Card  >
        <CardHeader
          component={Typography}
          title={"Historial"} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={4} lg={4}>
              <TextField
                name="Area"
                value={area}
                label="Area"
                type={'text'}
                disabled={true}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon={'material-symbols:house'} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={4} lg={4}>

              <TextField
                name="Habitacion"
                value={habitacion}
                label="Habitacion"
                type={'text'}
                disabled={true}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon={'material-symbols:auto-meeting-room'} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={4} lg={4}>
              <TextField
                name="Cama"
                value={cama}
                label="Cama"
                type={'text'}
                disabled={true}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon={'material-symbols:bed'} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={4} lg={4}>
                <TextField
                  name="Equipo"
                  value={equipo.Codigo}
                  label="Equipo"
                  type={'text'}
                  disabled={true}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon={'material-symbols:monitor-heart-outline-sharp'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4} lg={4}>
                <TextField
                  name="Modelo"
                  value={equipo.Modelo}
                  label="Modelo"
                  type={'text'}
                  disabled={true}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon={'material-symbols:monitor-heart-outline-sharp'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={4} lg={4}>
                <TextField
                  name="Diagnostico"
                  value={diagnostico}
                  label="Diagnostico"
                  type={'text'}
                  disabled={true}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon={'icon-park-twotone:doc-detail'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4} lg={4}>
                <TextField
                  name="Fecha de ingreso"
                  value={fechaIngreso}
                  label="Fecha de ingreso"
                  type={'text'}
                  disabled={true}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon={'mdi:sort-date-ascending'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4} lg={4}>
                <TextField
                  name="Fecha de salida"
                  value={fechaSalida}
                  label="Fecha de salida"
                  type={'text'}
                  disabled={true}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon={'mdi:sort-date-descending'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4} lg={4}>
                <TextField
                  name="Detalle de salida"
                  value={detalleSalida}
                  label="Detalle de salida"
                  type={'text'}
                  disabled={true}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon={'tabler:list-details'} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
          </Grid>
        </CardContent>
        <CardHeader
          component={Typography}
          title={"Dosis aplicada"} />

        <HistorialPersonaTratamiento
          IdHistorial={IdHistorial}
          IdPaciente={IdPaciente}
        />
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