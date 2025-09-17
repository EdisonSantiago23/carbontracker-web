import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Typography } from '@mui/material';


const Header = ({ className,onClick, ...rest }) => {


  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Typography component={'span'} variant="h6" color="textPrimary">
          Por favor describa el daño que posee el equipo
        </Typography>
      </Grid>
      <Grid item>
        <button
          onClick={onClick}
          aria-label="Close"
          type="button"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
