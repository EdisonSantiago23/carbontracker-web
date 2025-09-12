import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const SlashScreen = () => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        padding: 3,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 2000
      }}
    >
      <Box width={400}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default SlashScreen;
