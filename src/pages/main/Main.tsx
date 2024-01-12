import styled from '@emotion/styled';

import Carousel from './components/Carousel';
import Summary from './components/Summary';

const Main = () => {
  return (
    <MainPageWrapper>
      <Summary />
      <Carousel />
      <Carousel />
      <Carousel />
    </MainPageWrapper>
  );
};

export default Main;

const MainPageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;
