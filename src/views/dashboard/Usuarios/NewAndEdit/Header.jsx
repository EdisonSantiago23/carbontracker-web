import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, IconButton, Box } from "@mui/material";

const Header = ({ className, onClick, ...rest }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={3}
      className={className}
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Nuevo usuario
        </Typography>
      </Grid>

      <Grid item>
        <IconButton
          onClick={onClick}
          aria-label="Close"
          sx={{
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '25px',
            fontSize: 30,
          }}
        >
          <Box component="span" aria-hidden="true">
            &times;
          </Box>
        </IconButton>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default Header;
