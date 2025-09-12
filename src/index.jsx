import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SettingsProvider } from './contextapi/contexts/SettingsContext';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);

// Para habilitar cache / offline
serviceWorker.register();
