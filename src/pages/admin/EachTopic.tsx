import styled from '@emotion/styled';
import { useState } from 'react';

import AddEditTopicModal from './AddEditTopicModal';

import { EditIc, DeleteIc } from '../../assets/svgs';
import { NegativeModal } from '../../components/commons/Modal';

interface AdminTopicPropTypes {
  topicId: string;
  topicName: string;
  topicTag: string;
  topicDescription: string;
  createdAt: string;
}

const EachTopic = ({ data }: { data: AdminTopicPropTypes }) => {
  const { topicName, topicTag, topicDescription, createdAt, topicId } = data;
  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <TopicWrapper>
      <TopicData>
        <Topic>
          <TopicTitle>{topicName}</TopicTitle>
          <TopicDate>{createdAt}</TopicDate>
        </Topic>
        <TopicTag>{topicTag}</TopicTag>
        <TopicDescription>{topicDescription}</TopicDescription>
      </TopicData>
      <TopicAction>
        <EditIc
          onClick={() => {
            console.log(topicId, 'api요청에서 필요함');
            setShowEditModal(true);
          }}
        />
        <DeleteIc onClick={() => setShowDeleteModal(true)} />
      </TopicAction>
      {showEditModal && (
        <ModalOverlay onClick={() => setShowEditModal(false)}>
          <AddEditTopicModal
            topicStored={topicName}
            topicTagStored={topicTag}
            topicDescriptionStored={topicDescription}
          />
        </ModalOverlay>
      )}

      <NegativeModal
        modalContent="삭제 시, 해당 글감으로 작성된 글도 함께 삭제되며,
        삭제된 글감은 복구할 수 없습니다.
        계속 하시겠습니까?"
        isModalOpen={showDeleteModal}
        modalHandler={() => console.log('삭제api실행')}
        closeModalHandler={() => setShowDeleteModal(false)}
      />
    </TopicWrapper>
  );
};

export default EachTopic;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 60%);
`;

const TopicWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  width: 74.5rem;
  height: 8.4rem;
`;

const TopicData = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  width: 64.9rem;
  height: 5.2rem;
`;

const Topic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 20.8rem;
  padding: 0.6rem 0;
`;

const TopicTitle = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body1};
`;

const TopicDate = styled.p`
  color: ${({ theme }) => theme.colors.gray60};
  ${({ theme }) => theme.fonts.body6};
`;

const TopicTag = styled.p`
  width: 7rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body1};
  text-align: center;
`;

const TopicDescription = styled.p`
  display: -webkit-box;
  width: 29rem;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.body8};
`;

const TopicAction = styled.div`
  display: flex;
  gap: 0.8rem;
`;
