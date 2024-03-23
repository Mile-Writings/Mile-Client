import styled from '@emotion/styled';

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
`;
