import styled from '@emotion/styled';

import Spacing from '../../components/commons/Spacing';

const RenderAdminContent = ({ admin }: { admin: string }) => {
  switch (admin) {
    case 'topic':
      return (
        <AdminContainer>
          <Title>글감 설정</Title>
          <Spacing marginBottom="1.2" />
          <SubTitle>{`개의 글감이 저장되어있어요`}</SubTitle>
          <Spacing marginBottom="3.6" />
        </AdminContainer>
      );

    case 'member':
      return (
        <AdminContainer>
          <Title>멤버 관리</Title>
          <Spacing marginBottom="1.2" />
          <SubTitle>{`명의 멤버가 함께하고 있어요`}</SubTitle>
          <Spacing marginBottom="3.6" />
        </AdminContainer>
      );

    case 'groupInfo':
      return (
        <AdminContainer>
          <Title>모임 정보 수정</Title>
          <Spacing marginBottom="1.2" />
          <SubTitle>{`글 모임 정보를 수정할 수 있습니다`}</SubTitle>
          <Spacing marginBottom="3.6" />
        </AdminContainer>
      );
  }
};

export default RenderAdminContent;

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.1rem;
`;

const Title = styled.div`
  ${({ theme }) => theme.fonts.title9};
  color: ${({ theme }) => theme.colors.mainViolet};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray70};
`;
