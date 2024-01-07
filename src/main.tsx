import React from 'react';

import { Global, ThemeProvider } from '@emotion/react';
import reset from 'emotion-reset';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { theme } from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={reset} />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
