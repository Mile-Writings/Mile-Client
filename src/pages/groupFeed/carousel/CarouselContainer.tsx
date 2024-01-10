import React from 'react';

import styled from '@emotion/styled';

interface CarouselPropTypes {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const CarouselContainer = (props: CarouselPropTypes) => {
  const { isActive, onClick, children } = props;
  return (
    <CarouselBox onClick={onClick} $isActive={isActive}>
      {children}
    </CarouselBox>
  );
};

export default CarouselContainer;

const CarouselBox = styled.button<{ $isActive: boolean }>`
  width: 12rem;
  height: 6.2rem;
  padding: 2rem 0;

  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.black : theme.colors.gray60)};
  text-align: center;

  border-bottom: 0.2rem solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.mainViolet : 'transparent')};

  ${({ theme }) => theme.fonts.title8};
`;
