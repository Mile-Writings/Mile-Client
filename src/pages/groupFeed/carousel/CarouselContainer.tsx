import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

interface CarouselPropTypes {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
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
  width: 100%;
  height: 6.2rem;
  padding: 2rem 0;

  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.black : theme.colors.gray60)};
  text-align: center;

  border-bottom: 0.2rem solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.mainViolet : 'transparent')};

  ${({ theme }) => theme.fonts.title8};

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 13.5rem;
    height: 4.4rem;
    padding: 1.4rem 0;
    ${({ theme }) => theme.fonts.mButton1};
  }
`;
