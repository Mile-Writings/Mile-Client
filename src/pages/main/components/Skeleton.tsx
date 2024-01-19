import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';

interface skeletonPropTypes {
  width: number;
  height?: number;
  circle?: boolean;
  rounded: boolean;
  count?: number;
  unit: string; // 단위
  animation?: boolean;
  color: string;
  style?: React.CSSProperties;
}

const Skeleton = ({
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
  const content = useMemo(() => [...Array({ length: count })].map(() => '-').join(''), [count]);
  return (
    <Base
      style={style}
      rounded={rounded}
      circle={circle}
      width={width}
      height={height}
      animation={animation}
      unit={unit}
      color={color}
    >
      <Content>{content}</Content>
    </Base>
  );
};

export default Skeleton;

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.5s ease-in-out infinite;
`;

const Base = styled.div<skeletonPropTypes>`
  ${({ color }) => color && `background: ${color}`};
  ${({ rounded }) => rounded && `border-radius: 8px`};
  ${({ circle }) => circle && `border-radius: 50%`};
  ${({ width, height }) => (width || height) && 'display: block'};
  ${({ animation }) => animation && pulseAnimation};
  width: ${({ width, unit }) => width && unit && `${width}${unit}`};
  height: ${({ height, unit }) => height && unit && `${height}${unit}`};
`;

const Content = styled.span`
  opacity: 0;
`;
