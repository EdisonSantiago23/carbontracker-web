import React from "react";
import { createBrowserHistory } from "history";
import { SnackbarProvider } from "notistack";
import { Router, BrowserRouter } from "react-router-dom";
import routes, { renderRoutes } from "./routes";
import { AuthProvider } from "./contextapi/contexts/AuthContextProd";
import ThemeProvider from './theme';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/scroll-to-top';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from '../src/store';
import {ConfirmDialog} from '@components';


const App = () => {
    const persistor = persistStore(store);
    const history = createBrowserHistory();

    return (
        <ThemeProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <HelmetProvider>
                        <BrowserRouter>
                            <SnackbarProvider dense maxSnack={3} >
                                <Router history={history}>
                                    <AuthProvider>
                                        <ConfirmDialog />
                                        <ScrollToTop />
                                        {renderRoutes(routes)}
                                    </AuthProvider>
                                </Router>
                            </SnackbarProvider>
                        </BrowserRouter>
                    </HelmetProvider>
                </PersistGate>
            </Provider>
        </ThemeProvider>

    );
};

export default App;
