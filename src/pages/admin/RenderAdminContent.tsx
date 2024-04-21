import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MemberManage from './components/MemberManage';
import { useAdminTopic, useFetchMemberInfo } from './hooks/queries';
import TopicAdmin from './TopicAdmin';

import { MakeGroupAdminIc } from '../../assets/svgs';
import Spacing from '../../components/commons/Spacing';

const RenderAdminContent = ({ admin }: { admin: 'topic' | 'member' | 'groupInfo' }) => {
  const { topicCount, adminTopicData } = useAdminTopic();
  const { groupId } = useParams();
  const [page, setPage] = useState(1);
  const { memberData, totalMember } = useFetchMemberInfo(groupId || '', page);
  switch (admin) {
    case 'topic':
      return (
        <AdminContainer>
          <AdminLayout>
            <div>
              <Title>글감 설정</Title>
              <Spacing marginBottom="1.2" />
              <SubTitle>{`${topicCount}개의 글감이 저장되어있어요`}</SubTitle>
            </div>
            <MakeGroupAdminIc style={{ cursor: 'pointer' }} />
          </AdminLayout>
          <Spacing marginBottom="3.6" />
          <TopicAdmin data={adminTopicData} setPageNum={setPage} pageNum={page} />
        </AdminContainer>
      );

    case 'member':
      return (
        <AdminContainer>
          <Title>멤버 관리</Title>
          <Spacing marginBottom="1.2" />
          <SubTitle>{`${totalMember}명의 멤버가 함께하고 있어요`}</SubTitle>
          <Spacing marginBottom="3.6" />
          <MemberManage data={memberData} setPageCount={setPage} pageCount={page} />
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

const Title = styled.h1`
  ${({ theme }) => theme.fonts.title3};
  color: ${({ theme }) => theme.colors.black};
`;

const SubTitle = styled.h2`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray70};
`;

const AdminLayout = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
