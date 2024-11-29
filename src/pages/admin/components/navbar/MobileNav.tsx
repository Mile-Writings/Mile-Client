import styled from '@emotion/styled';
import theme from '../../../../styles/theme';
import { Menu } from '../../types/menu';

interface MobileNavPropTypes {
  isClicked: Record<Menu, boolean>;
  handleMenuItem: (menu: Menu) => void;
}

const MobileNav = ({ isClicked, handleMenuItem }: MobileNavPropTypes) => {
  return (
    <NavWrapper>
      <NavListLayout>
        <NavListItem
          onClick={() => handleMenuItem('글감 설정')}
          $isClicked={isClicked['글감 설정']}
        >
          글감 설정
        </NavListItem>
        <NavListItem
          onClick={() => handleMenuItem('멤버 관리')}
          $isClicked={isClicked['멤버 관리']}
        >
          멤버 관리
        </NavListItem>
        <NavListItem
          onClick={() => handleMenuItem('모임 정보 수정')}
          $isClicked={isClicked['모임 정보 수정']}
        >
          모임 정보 수정
        </NavListItem>
      </NavListLayout>
    </NavWrapper>
  );
};

export default MobileNav;

const NavWrapper = styled.nav`
  display: flex;
  width: 100%;
  padding: 0.2rem 0.48rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
`;

const NavListLayout = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NavListItem = styled.li<{ $isClicked: boolean }>`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 1.1rem 2.8rem;

  white-space: nowrap;

  list-style-type: none;
  ${({ $isClicked }) => ($isClicked ? theme.fonts.mButton1 : theme.fonts.mSubtitle2)};
  background-color: ${({ $isClicked }) => ($isClicked ? theme.colors.gray10 : theme.colors.white)};
  cursor: pointer;
  border-radius: 0.8rem;
`;
