import React from "react";
import { Box, LinearProgress } from "@mui/material";

const LoadingScreen = () => {
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
        p: 3,
      }}
    >
      <Box width={400}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
