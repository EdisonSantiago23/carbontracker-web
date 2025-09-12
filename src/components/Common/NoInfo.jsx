import React from "react";
import NoData from "./NoData";
import { Box, Typography } from "@mui/material";

const NoInfo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <NoData />
      <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
        No se encontraron datos
      </Typography>
    </Box>
  );
};

export default NoInfo;
