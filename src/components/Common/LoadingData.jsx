import React, { useEffect } from 'react';
import { LinearProgress, Box } from '@mui/material';
import NProgress from 'nprogress';

const LoadingData = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 4, // equivalente a theme.spacing(4)
      }}
    >
      <LinearProgress sx={{ width: '100%' }} />
    </Box>
  );
};

export default LoadingData;
