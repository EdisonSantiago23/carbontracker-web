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
      className={className}
      {...rest}
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Paciente
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={onClick}
          aria-label="Cerrar"
          sx={{
            backgroundColor: "transparent",
            fontSize: 30,
            "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
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
