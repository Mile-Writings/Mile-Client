import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from './Router';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <DesktopWrapper>
      <QueryClientProvider client={queryClient}>
        <DesktopContainer>
          <Router />
        </DesktopContainer>
      </QueryClientProvider>
    </DesktopWrapper>
  );
};

export default App;

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 136.6rem;
`;
