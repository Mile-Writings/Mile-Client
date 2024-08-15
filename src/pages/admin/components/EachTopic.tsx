import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AddEditTopicModal from './AddEditTopicModal';

import { MODAL } from '../constants/modal';
import { useDeleteAdminTopic } from '../hooks/queries';

import { DeleteIc, EditIc } from '../../../assets/svgs';
import { NegativeModal } from '../../../components/commons/Modal';

interface AdminTopicPropTypes {
  topicId: string;
  topicName: string;
  topicTag: string;
  topicDescription: string;
  createdAt: string;
}

interface eachTopicPropTypes {
  data: AdminTopicPropTypes;
  pageNum: number;
}

const EachTopic = ({ data, pageNum }: eachTopicPropTypes) => {
  const { topicName, topicTag, topicDescription, createdAt, topicId } = data;
  const { groupId } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteMutateAdminTopic } = useDeleteAdminTopic(topicId, groupId, pageNum);

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
        <EditIcon
          onClick={() => {
            setShowEditModal(true);
          }}
        />
        <DeleteIcon onClick={() => setShowDeleteModal(true)} />
      </TopicAction>
      {showEditModal && (
        <>
          <ModalOverlay onClick={() => setShowEditModal(false)} />
          <AddEditTopicModal
            topicStored={topicName}
            topicTagStored={topicTag}
            topicDescriptionStored={topicDescription}
            topicId={topicId}
            pageNum={pageNum}
            setShowModal={setShowEditModal}
          />
        </>
      )}

      <NegativeModal
        modalContent={MODAL.DELETE_TOPIC}
        isModalOpen={showDeleteModal}
        modalHandler={() => {
          deleteMutateAdminTopic();
          setShowDeleteModal(false);
        }}
        closeModalHandler={() => setShowDeleteModal(false)}
      />
    </TopicWrapper>
  );
};

export default EachTopic;

const EditIcon = styled(EditIc)`
  cursor: pointer;
`;

const DeleteIcon = styled(DeleteIc)`
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;

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
