import React from 'react';

import CarouselSkeleton from './CarouselSkeleton';

interface dataLengthPropsTypes {
  dataLength: number;
}

const SkeletonComponent: React.FC<dataLengthPropsTypes> = ({ dataLength }) => {
  return (
    <>
      {Array.from({ length: dataLength }).map((_, index) => (
        <CarouselSkeleton key={index} />
      ))}
    </>
  );
};

export default SkeletonComponent;
