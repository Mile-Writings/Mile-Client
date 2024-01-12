import styled from '@emotion/styled';

import Carousel from './components/Carousel';
import Introduction from './components/Introduction';
import Manual from './components/Manual';
import Ruler from './components/Ruler';
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
      <Ruler />
      <Introduction />
      <Manual />
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
