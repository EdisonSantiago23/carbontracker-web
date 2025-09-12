import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Typography } from "@mui/material";

const Header = ({ className, onClick, ...rest }) => {
  return (
    <Grid
      className={clsx(className)}
      container
      justifyContent="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Nuevo Hospital
        </Typography>
      </Grid>
      <Grid item>
        <button
          onClick={onClick}
          aria-label="Close"
          type="button"
          style={{
            backgroundColor: 'transparent',
            border: 0,
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '25px',
            fontSize: 30,
            cursor: 'pointer'
          }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Header;
