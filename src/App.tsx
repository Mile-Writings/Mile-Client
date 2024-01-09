import styled from '@emotion/styled';

import Router from './Router';

const App = () => {
  return (
    <DesktopWrapper>
      <DesktopContainer>
        <Router />
      </DesktopContainer>
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
  width: 136.8rem;
`;
