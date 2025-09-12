import React, { Fragment } from 'react';
import { Box, Container, Grid, Typography, Paper, Button, Card, Alert } from '@mui/material';

const Adquirir = () => {
  return (
    <Box sx={{ pt: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Adquirir Membresía
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                Esta sección está en desarrollo.
              </Alert>

              <Button variant="contained" color="primary">
                Adquirir Ahora
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Adquirir;
