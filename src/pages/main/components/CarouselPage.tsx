import styled from '@emotion/styled';
import { Suspense, lazy } from 'react';

import GroupCarouselTitle from './GroupCarouselTitle';
import { SkeletonComponent } from './skeletons/length';

const CarouselPage = () => {
  const LazyCarousel = lazy(() => import('./Carousel'));

  return (
    <CarouselComponentWrapper>
      <GroupCarouselTitle />
      <Suspense fallback={<SkeletonComponent />}>
        <LazyCarousel />
      </Suspense>
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
