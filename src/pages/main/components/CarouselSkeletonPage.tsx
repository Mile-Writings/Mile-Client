import styled from '@emotion/styled';

import CarouselSkeleton from './CarouselSkeleton';
import GroupCarouselTitle from './GroupCarouselTitle';

const CarouselSkeletonPage = () => {
  return (
    <CarouselComponentWrapper>
      <GroupCarouselTitle />
      <CarouselSkeleton />
      <CarouselSkeleton />
      <CarouselSkeleton />
    </CarouselComponentWrapper>
  );
};

export default CarouselSkeletonPage;

const CarouselComponentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding-bottom: 10rem;
`;
