import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from './Router';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DesktopWrapper>
        <Router />
      </DesktopWrapper>
    </QueryClientProvider>
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
