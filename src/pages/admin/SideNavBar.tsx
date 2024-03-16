import styled from '@emotion/styled';
import React, { useState } from 'react';

import Spacing from '../../components/commons/Spacing';

const SideNavBar = () => {
  const [admin, setAdmin] = useState('topic');
  return (
    <SideNavbar>
      <AdminMenu>
        <Title>관리자 페이지</Title>
        <Spacing marginBottom="1.6" />
        <MenuBox>
          <EachMenu onClick={() => setAdmin('topic')} isActive={admin === 'topic'}>
            글감 설정
          </EachMenu>
          <EachMenu onClick={() => setAdmin('member')} isActive={admin === 'member'}>
            멤버 관리
          </EachMenu>
          <EachMenu onClick={() => setAdmin('groupInfo')} isActive={admin === 'groupInfo'}>
            모임 정보 수정
          </EachMenu>
        </MenuBox>
      </AdminMenu>
      <Spacing marginBottom="1.6" />
      <AdminInviteBtn>초대링크 복사하기</AdminInviteBtn>
    </SideNavbar>
  );
};

export default SideNavBar;

const SideNavbar = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.5rem;
  height: 29.4rem;
`;

const AdminMenu = styled.div`
  width: 100%;
  height: 23.8rem;
  padding: 2.4rem;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const AdminInviteBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 19.5rem;
  height: 4rem;

  ${({ theme }) => theme.fonts.button3};
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 8px;
`;

const Title = styled.div`
  ${({ theme }) => theme.fonts.title9};
  color: ${({ theme }) => theme.colors.mainViolet};
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const EachMenu = styled.div<{ isActive: boolean }>`
  padding: 1rem 1.6rem;

  ${({ theme }) => theme.fonts.subtitle3};
  color: ${({ theme }) => theme.colors.gray70};

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.backGroundGray : theme.colors.white};
  border-radius: 8px;
  cursor: pointer;
`;
