import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { enableES5 } from 'immer';
import * as serviceWorker from '../src/serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '../src/store';
import { SettingsProvider } from '../src/contextapi/contexts/SettingsContext';
import App from '../src/App';
enableES5();
const persistor = persistStore(store);
ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </PersistGate>
  </Provider>, document.getElementById('root'));
serviceWorker.register();