import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from '@mui/material';
import { moment } from "../../config";

export default function Index(){
  const [tiempo, setTiempo] = useState(capitalize(moment().format("LLLL:ss a")));

  useEffect(() => {
    const idIntervalo = setInterval(() => {
      setTiempo(capitalize(moment().format("LLLL:ss a")));
    }, 1000);
    return () => clearInterval(idIntervalo);
  }, []);
  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }
  return (
    <Grid item>
      <Typography component={'span'}  variant="h5" >
        {tiempo}
      </Typography>
    </Grid>
  );
};

