import styled from '@emotion/styled';

import { AuthorizationHeader, UnAuthorizationHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const Admin = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <AdminWrapper>
      {accessToken ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <Spacing marginBottom="7.2" />
      <AdminLayout>
        <SideNavbar>
          <AdminMenu>
            <Title>관리자 페이지</Title>
            <Spacing marginBottom="1.6" />
            <MenuBox>
              <EachMenu>글감 설정</EachMenu>
              <EachMenu>멤버 관리</EachMenu>
              <EachMenu>모임 정보 수정</EachMenu>
            </MenuBox>
          </AdminMenu>
          <Spacing marginBottom="1.6" />
          <AdminInviteBtn>초대링크 복사하기</AdminInviteBtn>
        </SideNavbar>
        <AdminContainer></AdminContainer>
      </AdminLayout>
    </AdminWrapper>
  );
};

export default Admin;

const AdminWrapper = styled.div`
  width: 100%;
`;

const AdminLayout = styled.div`
  padding: 0 16.5rem;
`;

const SideNavbar = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.5rem;
  height: 29.4rem;
`;

const AdminContainer = styled.div`
  display: flex;
  width: 78.1rem;
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

const EachMenu = styled.div`
  padding: 1rem 1.6rem;

  ${({ theme }) => theme.fonts.subtitle3};
  color: ${({ theme }) => theme.colors.gray70};
`;
