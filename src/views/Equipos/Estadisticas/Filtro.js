import { useState } from 'react';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import moment from "moment";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// ----------------------------------------------------------------------
import {
  Grid
} from '@mui/material';
export default function LoginForm({send}) {
  const [desde, setDesde] = useState(dayjs());
  const [hasta, setHasta] = useState(dayjs());


  const handleClick = () => {
    const info={
      desde: moment(new Date(desde)).format("YYYY-MM-DD"),
      hasta: moment(new Date(hasta)).format("YYYY-MM-DD")
    }
    send(info)


  };

  return (
    <>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Grid>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Desde"
                value={desde}
                format="YYYY-MM-DD"
                onChange={(newValue) => setDesde(newValue)}
              />
              <DatePicker
                label="Hasta"
                value={hasta}
                format="YYYY-MM-DD"

                onChange={(newValue) => setHasta(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

        </Grid>
        <Grid>

          <LoadingButton size="medium" type="submit" variant="contained" onClick={handleClick}>
            Buscar
          </LoadingButton>
        </Grid>
      </Grid>

    </>
  );
}
