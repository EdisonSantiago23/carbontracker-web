import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Header = ({ className, onClick, ...rest }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={3}
      alignItems="center"
      position="relative"
      className={className}
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Nueva persona
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={onClick}
          aria-label="Close"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 2,
            fontSize: 30,
            backgroundColor: "transparent",
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Header;
