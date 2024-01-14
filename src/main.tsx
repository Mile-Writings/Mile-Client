import { Global, ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import globalStyle from './styles/GlobalStyle.tsx';
import { theme } from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyle} />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
);
