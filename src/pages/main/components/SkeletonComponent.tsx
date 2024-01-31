import CarouselSkeleton from './CarouselSkeleton';

interface dataLengthPropsTypes {
  groupLength: number;
}

const SkeletonComponent = ({ groupLength }: dataLengthPropsTypes) => {
  return (
    <>{...Array({ length: groupLength }).map((_, index) => <CarouselSkeleton key={index} />)}</>
  );
};

export default SkeletonComponent;
