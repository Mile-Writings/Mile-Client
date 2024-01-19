import styled from '@emotion/styled';

import CarouselSkeleton from './CarouselSkeleton';

const CarouselSkeletonPage = () => {
  return (
    <CarouselComponentWrapper>
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
