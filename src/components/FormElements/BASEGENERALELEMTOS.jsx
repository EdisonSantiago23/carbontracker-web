import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Link, Typography, Divider, Tabs, Tab } from '@mui/material';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'src/store';

const Membresias = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Page title="Membresías">
        <Container maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="h4" gutterBottom>
                  Gestión de Membresías
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Aquí puedes agregar los Tabs, contenido o componentes */}
                <Tabs value={0} aria-label="Membresías Tabs">
                  <Tab label="Activas" />
                  <Tab label="Pendientes" />
                  <Tab label="Expiradas" />
                </Tabs>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Page>
    </Fragment>
  );
};

export default Membresias;
