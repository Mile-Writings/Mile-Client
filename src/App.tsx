import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './routers/Router';
import mileLinkImg from '../src/assets/images/mileLinkImg.png';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from './pages/loading/Loading';

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
      <head>
        <meta property="og:title" content="마일 | 글쓰기 모임 | 블로그" />
        <meta
          property="og:description"
          content="오직 글쓰기 모임을 위한 블로그, 마일에서 모임원들과 함께 글을 쓰며 여러분 만의 공간을 만들어보세요"
        />
        <meta property="og:image" content={mileLinkImg} />
        <meta property="og:url" content="https://www.milewriting.com/" />
        <meta property="og:type" content="website" />
      </head>
      <div style={{ fontSize: '16px' }}>
        <QueryClientProvider client={queryClient}>
          <DesktopWrapper>
            <Suspense fallback={<Loading />}>
              <RouterProvider router={router} />
            </Suspense>
          </DesktopWrapper>
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
