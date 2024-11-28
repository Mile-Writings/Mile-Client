import styled from '@emotion/styled';
import { useState } from 'react';
import Spacing from '../../../../components/commons/Spacing';

const DesktopNav = () => {
  const [admin, setAdmin] = useState<'topic' | 'member' | 'groupInfo'>('topic');

  return (
    <AdminMenu>
      <Title>관리자 페이지</Title>
      <Spacing marginBottom="1.6" />
      <MenuList>
        <Menu
          onClick={() => {
            setAdmin('topic');
          }}
          isActive={admin === 'topic'}
        >
          글감 설정
        </Menu>
        <Menu onClick={() => setAdmin('member')} isActive={admin === 'member'}>
          멤버 관리
        </Menu>
        <Menu onClick={() => setAdmin('groupInfo')} isActive={admin === 'groupInfo'}>
          모임 정보 수정
        </Menu>
      </MenuList>
    </AdminMenu>
  );
};

export default DesktopNav;

const AdminMenu = styled.div`
  width: 100%;
  height: 23.8rem;
  padding: 2.4rem;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.title9};
  color: ${({ theme }) => theme.colors.mainViolet};
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Menu = styled.div<{ isActive: boolean }>`
  padding: 1rem 1.6rem;

  ${({ theme }) => theme.fonts.subtitle3};

  color: ${({ isActive, theme }) => (isActive ? theme.colors.black : theme.colors.gray70)};

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.backGroundGray : theme.colors.white};
  cursor: pointer;
  border-radius: 8px;
`;
