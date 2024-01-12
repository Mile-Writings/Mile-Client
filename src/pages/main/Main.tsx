import styled from '@emotion/styled';

import Carousel from './components/Carousel';
import Summary from './components/Summary';

const Main = () => {
  return (
    <MainPageWrapper>
      <CarouselComponentLayout>
        <Summary />
        <Carousel />
        <Carousel />
        <Carousel />
      </CarouselComponentLayout>
    </MainPageWrapper>
  );
};

export default Main;

const MainPageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const CarouselComponentLayout = styled.div`
  padding-bottom: 10rem;
`;
