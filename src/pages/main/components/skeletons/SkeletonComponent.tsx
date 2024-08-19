import CarouselSkeleton from './CarouselSkeleton';

interface groupLengthPropTypes {
  groupLength?: number;
}

export const SkeletonComponent = ({ groupLength = 0 }: groupLengthPropTypes) => {
  return (
    <>
      {Array.from({ length: groupLength }).map((_, index) => (
        <CarouselSkeleton key={index} />
      ))}
    </>
  );
};
