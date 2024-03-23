import styled from '@emotion/styled';

const PageNumber = ({ children, isActive }: { children: number; isActive: boolean }) => {
  return <NumberLayout isActive={isActive}>{children}</NumberLayout>;
};

export default PageNumber;

const NumberLayout = styled.button<{ isActive: boolean }>`
  padding: 0 0.8rem;

  color: ${({ theme, isActive }) => (isActive ? theme.colors.mainViolet : theme.colors.gray70)};

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.backGroundGray : theme.colors.mileViolet};
  border-radius: 4px;

  ${({ theme, isActive }) => (isActive ? theme.fonts.subtitle3 : theme.fonts.body1)};
`;
