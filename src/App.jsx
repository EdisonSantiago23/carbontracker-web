import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import GlobalStyles from "./components/Common/GlobalStyles.jsx";
import ScrollReset from "./components/Common/ScrollReset";
import routes, { renderRoutes } from "./routes";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import useSettings from "./contextapi/hooks/useSettings";
import { AuthProvider } from "./contextapi/contexts/AuthContextProd";

const App = () => {
  const { settings } = useSettings();

  const theme = createTheme({
    direction: settings.direction,
    typography: {
      fontSize: settings.responsiveFontSizes ? 14 : 12
    },
    palette: settings.theme
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider dense maxSnack={3}>
          <BrowserRouter>
            <AuthProvider>
              <GlobalStyles />
              <ScrollReset />
              {renderRoutes(routes)}
            </AuthProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;