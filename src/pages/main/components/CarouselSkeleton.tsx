import styled from '@emotion/styled/macro';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

interface skeletonPropTypes {
  width?: number;
  height?: number;
  circle?: boolean;
  rounded?: boolean;
  count?: number;
  unit?: string; // 단위
  animation?: boolean;
  color?: string;
  style?: React.CSSProperties;
}

const CarouselSkeleton = ({
  width,
  height,
  circle,
  rounded,
  count,
  unit,
  animation,
  color,
  style,
}: skeletonPropTypes) => {
  return (
    <SkeletonWrapper
      width={width}
      height={height}
      circle={circle}
      rounded={rounded}
      count={count}
      unit={unit}
      animation={animation}
      color={color}
      style={style}
    />
  );
};

export default CarouselSkeleton;

const SkeletonWrapper = styled.div``;
