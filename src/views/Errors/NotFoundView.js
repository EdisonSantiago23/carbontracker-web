import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from '@mui/material';
import imagens from "../../assets/img/undraw_page_not_found_su7k.jpg";
import { styled} from '@mui/system';


const useStyles = styled('div')((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    paddingTop: 80,
    paddingBottom: 80,
  },
  image: {
    maxWidth: "100%",
    width: 560,
    maxHeight: 300,
    height: "auto",
  },
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
      <Container maxWidth="lg">
        <Typography component={'span'}
          align="center"
          variant={ "h1"}
          color="textPrimary"
        >
          404: La página que estás buscando no está aquí.
        </Typography>
        <Typography component={'span'} align="center" variant="subtitle2" color="textSecondary">
          O intentaste alguna ruta erronea o vino aquí por error. Sea lo que
          sea, intente utilizar la navegación.
        </Typography>
        <Box mt={6} display="flex" justifyContent="center">
          <img
            alt="Under development"
            src={imagens}
          />
        </Box>
        <Box mt={6} display="flex" justifyContent="center">
          <Button
            color="secondary"
            component={RouterLink}
            to="/"
            variant="outlined"
          >
            Home
          </Button>
        </Box>
      </Container>
  );
};

export default NotFoundView;
