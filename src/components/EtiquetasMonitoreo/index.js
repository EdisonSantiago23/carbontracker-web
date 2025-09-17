import React from "react";
import { Typography } from '@mui/material';
export default function Index(props) {
  const { texto, color } = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: 100,
          height: 20,
          backgroundColor: color,
        }}
      />
      <Typography component={'span'} variant="h6" style={{color:color}}>
        {texto}
      </Typography>
    </div>
  );
}
