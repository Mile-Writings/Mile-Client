import CarouselSkeleton from '../CarouselSkeleton';

import { useFetchDataLength } from '../../hooks/useFetchDataLength';

export const SkeletonComponent = () => {
  const groupLength = useFetchDataLength();

  return (
    <>{...Array({ length: groupLength }).map((_, index) => <CarouselSkeleton key={index} />)}</>
  );
};
