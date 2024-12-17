import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { DefaultModal, DefaultModalBtn } from '../../../components/commons/modal/DefaultModal';
import useModal from '../../../hooks/useModal';

import { MODAL } from '../constants/modal';
import { useDeleteAdminTopic } from '../hooks/queries';

import { DeleteIc, EditIc } from '../../../assets/svgs';
import InputModal from '../../../components/commons/inputModal/InputModal';
import Responsive from '../../../components/commons/Responsive/Responsive';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

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

  // modal 열고닫음
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();

  const { deleteMutateAdminTopic } = useDeleteAdminTopic(topicId, groupId, pageNum);

  return (
    <>
      <TopicWrapper>
        <TopicData>
          <Topic>
            <TopicTitle>{topicName}</TopicTitle>
            <TopicDate>{createdAt}</TopicDate>
          </Topic>
          <TopicTag>{topicTag}</TopicTag>
          <Responsive only="desktop">
            <TopicDescription>{topicDescription}</TopicDescription>
          </Responsive>
          <TopicAction>
            <EditIcon
              onClick={() => {
                setShowEditModal(true);
              }}
            />

            {/* <DeleteIcon onClick={() => setShowDeleteModal(true)} /> */}
            <DeleteIcon onClick={() => handleShowModal()} />
          </TopicAction>
        </TopicData>

        {showEditModal && (
          <>
            <ModalOverlay onClick={() => setShowEditModal(false)} />
            <InputModal
              topicStored={topicName}
              topicTagStored={topicTag}
              topicDescriptionStored={topicDescription}
              topicId={topicId}
              pageNum={pageNum}
              setShowModal={setShowEditModal}
            />
          </>
        )}
      </TopicWrapper>
      <DefaultModal
        isModalOpen={isModalOpen}
        onClickBg={handleCloseModal}
        sizeType="MEDIUM"
        content={MODAL.DELETE_TOPIC}
        modalImg="POST"
      >
        <DefaultModalBtn
          btnText={['예', '아니요']}
          onClickLeft={deleteMutateAdminTopic}
          onClickRight={handleCloseModal}
        />
      </DefaultModal>
    </>
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
  width: 100%;
  height: 8.4rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 7.3rem;
  }
`;

const TopicData = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  width: 100%;
  height: 5.2rem;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 0;
    width: 100%;
  }
`;

const Topic = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  gap: 0.4rem;
  min-width: 20.9rem;
  padding: 0.6rem 0;

  @media ${MOBILE_MEDIA_QUERY} {
    flex: 0.3;
    width: 100%;
    min-width: 13rem;
  }
`;

const TopicTitle = styled.p`
  overflow: hidden;

  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ theme }) => theme.fonts.body1}

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle2};
  }
`;

const TopicDate = styled.p`
  color: ${({ theme }) => theme.colors.gray60};
  ${({ theme }) => theme.fonts.body6};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1};
  }
`;

const TopicTag = styled.p`
  flex-shrink: 1;
  min-width: 7rem;
  padding: 0.6rem 0;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;

  ${({ theme }) => theme.fonts.body1}

  @media ${MOBILE_MEDIA_QUERY} {
    flex-grow: 0.22;
    flex-shrink: 1;
    justify-content: center;

    ${({ theme }) => theme.fonts.mSubtitle2};
  }
`;

const TopicDescription = styled.p`
  display: -webkit-box;
  width: 100%;
  min-width: 3rem;
  max-width: 29rem;
  padding-top: 0.2rem;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  color: ${({ theme }) => theme.colors.gray100};
  text-overflow: ellipsis;

  ${({ theme }) => theme.fonts.body8}
`;

const TopicAction = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-left: auto;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-shrink: 0.6;
    justify-content: end;
  }
`;
