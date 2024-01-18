import styled from '@emotion/styled';

import Carousel from './Carousel';
import GroupCarouselTitle from './GroupCarouselTitle';

const CarouselPage = () => {
  return (
    <CarouselComponentWrapper>
      <GroupCarouselTitle />
      <Carousel />
    </CarouselComponentWrapper>
  );
};

export default CarouselPage;

const CarouselComponentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding-bottom: 10rem;
`;
