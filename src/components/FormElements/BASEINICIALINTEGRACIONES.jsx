import React, { useState, Fragment } from 'react';
import { Box, Breadcrumbs, Container, Grid, Typography, Divider, Card, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';

const Proveedores = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentTab, setCurrentTab] = useState('Proveedores');

  const handleTabsChange = (value) => {
    setCurrentTab(value);
  };

  return (
    <Page sx={{ pt: 3, pb: 3 }}>
      <Container maxWidth="lg">
        <Fragment>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Typography variant="body1" color="textPrimary">
              Proveedores
            </Typography>
          </Breadcrumbs>
        </Fragment>

        <Box mt={3}>
          <Card>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box ml={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Button
                        onClick={() => handleTabsChange('Proveedores')}
                        fullWidth
                        size="large"
                        variant="contained"
                        sx={{
                          mt: 2,
                          mb: 2,
                          backgroundColor: currentTab === 'Proveedores' ? 'black' : 'white',
                          color: currentTab === 'Proveedores' ? 'white' : 'black',
                          '&:hover': {
                            backgroundColor: currentTab === 'Proveedores' ? 'black' : '#f0f0f0'
                          }
                        }}
                      >
                        Proveedores
                      </Button>
                    </Grid>

                    {/* Agregar más botones de Tabs aquí si lo necesitas */}
                  </Grid>
                </Box>

                <Divider />

                {/* Contenido de la pestaña */}
                {currentTab === 'Proveedores' && (
                  <Box p={3}>
                    {/* <MembresiasTotal /> */}
                    <Typography variant="body2">Contenido de Proveedores</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default Proveedores;
