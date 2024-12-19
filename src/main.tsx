import { Global, ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import globalStyle from './styles/GlobalStyle.ts';
import { theme } from './styles/theme.ts';

// async function enableMocking() {
//   // eslint-disable-next-line no-undef
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser.ts');
//   return worker.start();
// }

// enableMocking().then(() => {

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <>
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </>,
  );
} else {
  root.render(
    <>
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </>,
  );
}

// });
