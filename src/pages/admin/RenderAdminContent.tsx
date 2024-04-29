import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AddEditTopicModal from './AddEditTopicModal';
import { useAdminTopic } from './hooks/queries';
import TopicAdmin from './TopicAdmin';

import { MakeGroupAdminIc } from '../../assets/svgs';
import Spacing from '../../components/commons/Spacing';

const RenderAdminContent = ({ admin }: { admin: 'topic' | 'member' | 'groupInfo' }) => {
  const { groupId } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const { topicCount, adminTopicData } = useAdminTopic(groupId, pageNum);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
            <MakeGroupAdminIc style={{ cursor: 'pointer' }} onClick={openModal} />
          </AdminLayout>
          <Spacing marginBottom="3.6" />
          {showModal && (
            <>
              <ModalOverlay onClick={closeModal} />
              <AddEditTopicModal />
            </>
          )}
          <TopicAdmin data={adminTopicData} setPageNum={setPageNum} pageNum={pageNum} />
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4; /* 모달보다 더 위에 위치 */
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 50%); /* 반투명한 배경색 */
`;

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
