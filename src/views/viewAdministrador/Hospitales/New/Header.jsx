import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Box } from "@mui/material";

const Header = ({ title, onClick }) => {
  return (
    <Grid container justifyContent="space-between" spacing={3}>
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Box
          component="button"
          onClick={onClick}
          aria-label="Close"
          sx={{
            backgroundColor: "transparent",
            border: 0,
            position: "absolute",
            top: 0,
            right: 0,
            padding: "25px",
            fontSize: 30,
            cursor: "pointer"
          }}
        >
          &times;
        </Box>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Header;
