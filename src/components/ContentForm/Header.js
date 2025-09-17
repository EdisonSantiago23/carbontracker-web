import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from '@mui/material';
import {Iconify } from '@components';

const Header = (props) => {
  const {titulo,onClick} = props;
  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={3}>
      <Grid item>
        <Typography component={'span'} variant="h3" color="textPrimary">
          {titulo}
        </Typography>
      </Grid>
      <Grid item>
        <Iconify icon={'material-symbols:close'} tooltip={"Cerrar"} onClick={onClick} />
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  titulo: PropTypes.string,
};

export default Header;
