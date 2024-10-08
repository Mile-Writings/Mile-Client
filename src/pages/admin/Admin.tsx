import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RenderAdminContent from './components/RenderAdminContent';
import { useFetchInvitationLink } from './hooks/queries';

import { useGroupInfo } from '../groupFeed/hooks/queries';

import { AdminHomeIc } from '../../assets/svgs';
import { AuthorizationHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';
import { copyLink } from '../../utils/copyLink';

const Admin = () => {
  const accessToken = localStorage.getItem('accessToken');

  const [admin, setAdmin] = useState<'topic' | 'member' | 'groupInfo'>('topic');
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { invitationCode } = useFetchInvitationLink(groupId);
  const { infoResponse } = useGroupInfo(groupId || '');

  const handleCopyLink = (invitationCode: string) => {
    copyLink(import.meta.env.VITE_INVITE_URL + `group/${invitationCode}/groupInvite`);
  };

  const handleRoutingGroup = () => {
    navigate(`/group/${groupId}`);
  };

  const handleInviteBtnClick = () => {
    handleCopyLink(invitationCode?.invitationCode || '');
  };

  return (
    <AdminWrapper>
      {accessToken && <AuthorizationHeader />}
      <Spacing marginBottom="13.6" />
      <AdminLayout>
        <SideNavbar>
          <AdminGroupInfo>
            <HomeBtn type="button" onClick={handleRoutingGroup}>
              <AdminHomeIc />
              Home
            </HomeBtn>
            <GroupName>{infoResponse?.moimName}</GroupName>
          </AdminGroupInfo>
          <Spacing marginBottom="2.4" />
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
          <Spacing marginBottom="1.6" />
          {invitationCode && (
            <AdminInviteBtn type="button" onClick={handleInviteBtnClick}>
              초대링크 복사하기
            </AdminInviteBtn>
          )}
        </SideNavbar>
        <RenderAdminContent admin={admin} />
      </AdminLayout>
    </AdminWrapper>
  );
};

export default Admin;

const AdminWrapper = styled.div`
  width: 100%;
`;

const AdminLayout = styled.div`
  display: flex;
  gap: 6rem;
  justify-content: center;
  padding: 0 16.5rem;
`;

const SideNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  width: 19.5rem;
`;

const AdminGroupInfo = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HomeBtn = styled.button`
  display: flex;
  gap: 0.6rem;
  align-items: flex-end;
  padding: 0;

  color: ${({ theme }) => theme.colors.gray60};
  ${({ theme }) => theme.fonts.body1};
`;

const GroupName = styled.h3`
  ${({ theme }) => theme.fonts.title9};
  cursor: default;
`;

const AdminMenu = styled.div`
  width: 100%;
  height: 23.8rem;
  padding: 2.4rem;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const AdminInviteBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 19.5rem;
  height: 4rem;

  ${({ theme }) => theme.fonts.button3};
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};

    transition: all 0.2s ease-in-out;
  }
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
