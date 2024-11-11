import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import ResponsiveProvider from './components/commons/Responsive/ResponsiveProvider';
import Loading from './pages/loading/Loading';
import router from './routers/Router';
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 20 * 1000,
      },
    },
  });
  return (
    <>
      <div style={{ fontSize: '16px' }}>
        <QueryClientProvider client={queryClient}>
          <ResponsiveProvider>
            <DesktopWrapper>
              <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
              </Suspense>
            </DesktopWrapper>
          </ResponsiveProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  scroll-behavior: smooth;
`;
