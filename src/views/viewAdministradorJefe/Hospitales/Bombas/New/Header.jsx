import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

const Header = ({ title = "Nueva bomba", className, onClick, ...rest }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={3}
      sx={{ position: "relative", ...rest?.sx }}
      className={className}
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <button
          onClick={onClick}
          aria-label="Close"
          type="button"
          style={{
            backgroundColor: "transparent",
            border: 0,
            position: "absolute",
            top: 0,
            right: 0,
            padding: 25,
            fontSize: 30,
            cursor: "pointer"
          }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Header;
