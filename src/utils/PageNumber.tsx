import styled from '@emotion/styled';
import { MOBILE_MEDIA_QUERY } from '../styles/mediaQuery';

const PageNumber = ({
  children,
  isActive,
  onClick,
}: {
  children: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <NumberLayout isActive={isActive} onClick={onClick}>
      {children}
    </NumberLayout>
  );
};

export default PageNumber;

const NumberLayout = styled.button<{ isActive: boolean }>`
  padding: 0 0.8rem;

  color: ${({ theme, isActive }) => (isActive ? theme.colors.mainViolet : theme.colors.gray70)};

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.mileViolet : theme.colors.backGroundGray};
  border-radius: 4px;

  ${({ theme, isActive }) => (isActive ? theme.fonts.subtitle3 : theme.fonts.body1)};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0.6rem 1.2rem;
    ${({ theme }) => theme.fonts.mSubtitle4};
  }
`;
