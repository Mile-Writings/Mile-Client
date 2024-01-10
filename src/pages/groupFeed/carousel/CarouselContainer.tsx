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

  color: ${({ theme }) => theme.colors.gray60};
  text-align: center;

  ${({ theme }) => theme.fonts.title8};

  :focus {
    color: ${({ theme }) => theme.colors.black};

    border-bottom: 0.2rem solid ${({ theme }) => theme.colors.mainViolet};
  }
`;
