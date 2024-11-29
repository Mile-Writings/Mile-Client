import styled from '@emotion/styled';

const MobileNav = () => {
  return (
    <NavWrapper>
      <NavListLayout>
        <NavListItem>글감 설정</NavListItem>
        <NavListItem>멤버 관리</NavListItem>
        <NavListItem>모임 정보 수정</NavListItem>
      </NavListLayout>
    </NavWrapper>
  );
};

export default MobileNav;

const NavWrapper = styled.nav`
  display: flex;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
`;

const NavListLayout = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NavListItem = styled.li`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 1.1rem 2.8rem;

  white-space: nowrap;

  list-style-type: none;
  ${({ theme }) => theme.fonts.mSubtitle1};
  cursor: pointer;
`;
