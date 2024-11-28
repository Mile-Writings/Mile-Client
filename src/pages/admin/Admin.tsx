import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGroupInfo } from '../groupFeed/hooks/queries';
import Loading from '../loading/Loading';
import RenderAdminContent from './components/RenderAdminContent';
import { useFetchInvitationLink } from './hooks/queries';

import { AdminHomeIc } from '../../assets/svgs';
import { AuthorizationHeader } from '../../components/commons/Header';
import Responsive from '../../components/commons/Responsive/Responsive';
import Spacing from '../../components/commons/Spacing';
import { copyLink } from '../../utils/copyLink';
import DesktopNav from './components/navbar/DesktopNav';
import MobileNav from './components/navbar/MobileNav';

const Admin = () => {
  const accessToken = localStorage.getItem('accessToken');

  const [admin, setAdmin] = useState<'topic' | 'member' | 'groupInfo'>('topic');
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { invitationCode } = useFetchInvitationLink(groupId);
  const { infoResponse, isLoading } = useGroupInfo(groupId || '');

  const handleCopyLink = (invitationCode: string) => {
    copyLink(import.meta.env.VITE_INVITE_URL + `group/${invitationCode}/groupInvite`);
  };

  const handleRoutingGroup = () => {
    navigate(`/group/${groupId}`);
  };

  const handleInviteBtnClick = () => {
    handleCopyLink(invitationCode?.invitationCode || '');
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {accessToken && <AuthorizationHeader />}
      <AdminWrapper>
        <Spacing marginBottom="13.6" />
        <Responsive only="mobile">
          <MobileNav />
        </Responsive>
        <AdminLayout>
          <Responsive only="desktop">
            <SideNavbar>
              <AdminGroupInfo>
                <HomeBtn type="button" onClick={handleRoutingGroup}>
                  <AdminHomeIc />
                  Home
                </HomeBtn>
                <GroupName>{infoResponse?.moimName}</GroupName>
              </AdminGroupInfo>
              <Spacing marginBottom="2.4" />
              <DesktopNav />
              <Spacing marginBottom="1.6" />
              {invitationCode && (
                <AdminInviteBtn type="button" onClick={handleInviteBtnClick}>
                  초대링크 복사하기
                </AdminInviteBtn>
              )}
            </SideNavbar>
          </Responsive>
          <RenderAdminContent admin={admin} />
        </AdminLayout>
      </AdminWrapper>
    </>
  );
};

export default Admin;

const AdminWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
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
