import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  close: {
    backgroundColor: 'transparent',
    border: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '25px',
    fontSize: 30
  }
}));

const Header = ({
  className,
  onClick,
  ...rest
}) => {
  const classes = useStyles();
  return <Grid className={clsx(classes.root, className)} container justify="space-between" spacing={3} {...rest}>
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Habitación
        </Typography>
      </Grid>
      <Grid item>
        <button onClick={onClick} aria-label="Close" class={classes.close} type="button">
          <span aria-hidden="true">&times;</span>
        </button>
      </Grid>
    </Grid>;
};

Header.propTypes = {
  className: PropTypes.string
};
export default Header;