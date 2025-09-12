import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Header = ({ className, onClick, ...rest }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={3}
      className={className}
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Nueva persona
        </Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={onClick} aria-label="close">
          <CloseIcon fontSize="large" />
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
