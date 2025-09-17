import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { CircularProgress, Backdrop } from '@mui/material';



export default function Index() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(true);

  }, []);

  return (
    <Backdrop
    open={true}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}

    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

