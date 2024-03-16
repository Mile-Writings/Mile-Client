import styled from '@emotion/styled';

import SideNavBar from './SideNavBar';

import { AuthorizationHeader, UnAuthorizationHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const Admin = () => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <AdminWrapper>
      {accessToken ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <Spacing marginBottom="7.2" />
      <AdminLayout>
        <SideNavBar />
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

const AdminContainer = styled.div`
  display: flex;
  width: 78.1rem;
`;
