import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import { useGroupInfo } from '../groupFeed/hooks/queries';
import Loading from '../loading/Loading';
import RenderAdminContent from './components/RenderAdminContent';
import { useFetchInvitationLink } from './hooks/queries';

import { AdminHomeIc } from '../../assets/svgs';
import { AuthorizationHeader } from '../../components/commons/Header';
import Responsive from '../../components/commons/Responsive/Responsive';
import Spacing from '../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';
import { copyLink } from '../../utils/copyLink';
import DesktopNav from './components/navbar/DesktopNav';
import MobileNav from './components/navbar/MobileNav';
import useMenu from './hooks/useMenu';

const Admin = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { invitationCode } = useFetchInvitationLink(groupId);
  const { infoResponse, isLoading } = useGroupInfo(groupId || '');

  const { menu, handleMenuItem, isClicked } = useMenu();

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
    <Wrapper>
      {accessToken && <AuthorizationHeader />}
      <AdminWrapper>
        <Responsive only="desktop">
          <Spacing marginBottom="13.6" />
        </Responsive>
        <Responsive only="mobile">
          <Spacing marginBottom="8.8" />
          <GroupLayout>
            <NameBox>
              <MobileGroupName>{infoResponse?.moimName}</MobileGroupName>
              <PageName>관리자 페이지</PageName>
            </NameBox>
            <HomeBtn type="button" onClick={handleRoutingGroup}>
              <AdminHomeIc />
              Home
            </HomeBtn>
          </GroupLayout>
          <Spacing marginBottom="1.2" />
          <MobileNav handleMenuItem={handleMenuItem} isClicked={isClicked} />
          <Spacing marginBottom="2.8" />
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
              <DesktopNav handleMenuItem={handleMenuItem} isClicked={isClicked} />
              <Spacing marginBottom="1.6" />
              {invitationCode && (
                <AdminInviteBtn type="button" onClick={handleInviteBtnClick}>
                  초대링크 복사하기
                </AdminInviteBtn>
              )}
            </SideNavbar>
          </Responsive>
          <RenderAdminContent menu={menu} />
        </AdminLayout>
      </AdminWrapper>
    </Wrapper>
  );
};

export default Admin;

const Wrapper = styled.div`
  width: 100%;
`;

const AdminWrapper = styled.div`
  width: 100%;
  padding: 0 16.5rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    padding: 2rem;
  }
`;

const AdminLayout = styled.div`
  display: flex;
  gap: 6rem;
  justify-content: center;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-basis: 100%;
    width: 100%;
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle4};
  }
`;

const GroupName = styled.h3`
  ${({ theme }) => theme.fonts.title9};
  cursor: default;
`;

const MobileGroupName = styled.h3`
  ${({ theme }) => theme.fonts.mSubtitle4};
  white-space: nowrap;
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

const GroupLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageName = styled.h1`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.mTitle6};
  white-space: nowrap;
`;
