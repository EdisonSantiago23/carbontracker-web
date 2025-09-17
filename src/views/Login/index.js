import React, { useState } from "react";
import { Avatar, Link, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { StyledRoot, StyledContent, StyledSection } from "src/styles";
import FormLogin from "./FormLogin/FormLogin"
import ResetClave from "./FormLogin/ResetClave"
import { Stack, Container, InputAdornment, TextField, Checkbox } from '@mui/material';
import FondoImg from "../../assets/img/S727x484.jpg";
import LogoGrande from '../../components/LogoGrande';

const LoginView = () => {
  const [renderer, setRenderer] = useState(true);
  function changeForm() {
    setRenderer(!renderer);
  }
  function renderLogin() {
    return (
      <Stack spacing={3}>
      
           <LogoGrande
           
          />
        <Stack spacing={3}>
          <FormLogin />
        </Stack>
        <Box mt={2}></Box>
        <Grid item xs>
          <Link href="#" variant="body2" onClick={changeForm}>
            ¿Olvidaste tu contraseña?
          </Link>
        </Grid>
      </Stack>)
  }
  function renderReset() {
    return (
      <Grid item xs>

        <Avatar >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={'span'} variant="h5">
          {" "}
          Recuperar Contraseña
        </Typography>
        <Grid container>
          <Grid item xs>
            <ResetClave />

            <Link href="#" variant="body2" onClick={changeForm}>
              Regresar
            </Link>
          </Grid>
        </Grid>
      </Grid>
    )


  }
  function componentRenderer() {
    return (
      <StyledRoot >
        <StyledSection>
          <img src={FondoImg} alt="login" />
        </StyledSection>
        <Container maxWidth="sm">
          <StyledContent>
            {renderer ? renderLogin() : renderReset()}
          </StyledContent>

        </Container>
      </StyledRoot>
    );
  }

  return componentRenderer();
};
export default LoginView;
