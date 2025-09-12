import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Typography, useTheme, useMediaQuery } from "@mui/material";
import Page from "../../components/Common/Page";
import imagens from "../../assets/img/undraw_page_not_found_su7k.jpg";

const NotFoundView = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page
      title="404: Not found"
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 10,
        px: 3,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant={mobileDevice ? "h4" : "h1"}
          color="textPrimary"
        >
          404: La página que estás buscando no está aquí.
        </Typography>
        <Typography
          align="center"
          variant="subtitle2"
          color="textSecondary"
          sx={{ mt: 2 }}
        >
          O intentaste alguna ruta errónea o vino aquí por error. Sea lo que sea,
          intenta utilizar la navegación.
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
        >
          <Box
            component="img"
            src={imagens}
            alt="Under development"
            sx={{
              width: "100%",
              maxWidth: 560,
              maxHeight: 300,
              height: "auto",
            }}
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
    </Page>
  );
};

export default NotFoundView;
