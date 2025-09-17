import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import {
  Box, Grid,
  CircularProgress,
} from '@mui/material';

import {
  FormControlLabel,
  FormControl,
} from '@mui/material';

import { Checkbox, FormGroup } from '@mui/material';
import Iconify from '../../../components/iconify';

export default function Index(props) {
  const { menu, onChangeValue } = props;
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {

  }, []);



  const handleChanges = (event) => {
    onChangeValue(event)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    enqueueSnackbar("Rol creado correctamente", {
      variant: "success",
    });
  };

  return (
    <Fragment>
      {!loading ? <FormControl component="fieldset">
        <FormGroup>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={1}>
              <Iconify icon={menu.icon} sx={{ width: 25, height: 25 }} />
            </Grid>
            <Grid item xs={12} lg={10}>

            <FormControlLabel
              style={{ width: 560, }}
              control={
                <Checkbox
                  onChange={handleChanges}
                  name={menu.tag}
                  checked={menu.valor}
                />
              }
              label={menu.nombre}
            />
                        </Grid>

          </Grid>

        </FormGroup>
      </FormControl> : <Box display="flex" justifyContent="center" my={5}>
        <CircularProgress />
      </Box>}
    </Fragment>

  );
};

Index.propTypes = {
  onChangeValue: PropTypes.func,
  menu: PropTypes.any
};
Index.defaultProps = {
  onChangeValue: () => {
  },

  menu: [],
};
