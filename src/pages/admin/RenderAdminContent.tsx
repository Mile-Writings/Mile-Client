import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AddEditTopicModal from './AddEditTopicModal';
import MemberManage from './components/MemberManage';
import EditGroupInfo from './EditGroupInfo';
import { useAdminTopic, useFetchMemberInfo, useDeleteGroup } from './hooks/queries';
import TopicAdmin from './TopicAdmin';

import Error from '../error/Error';
import Loading from '../loading/Loading';

import { MakeGroupAdminIc } from '../../assets/svgs';
import DefaultModal from '../../components/commons/modal/DefaultModal';
import DefaultModalBtn from '../../components/commons/modal/DefaultModalBtn';
import Spacing from '../../components/commons/Spacing';
import useModal from '../../hooks/useModal';

const RenderAdminContent = ({ admin }: { admin: 'topic' | 'member' | 'groupInfo' }) => {
  const { groupId } = useParams();
  const [page, setPage] = useState(1);
  const { memberData, totalMember } = useFetchMemberInfo(groupId || '', page);
  const [pageNum, setPageNum] = useState(1);
  const { topicCount, adminTopicData } = useAdminTopic(groupId, pageNum);

  // input 모달 열고 닫기
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // 공통 모달 열고 닫기
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();

  const { mutate: deleteGroup, isPending, isError } = useDeleteGroup(groupId || '');

  if (isError) {
    return <Error />;
  }
  if (isPending) {
    return <Loading />;
  }

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
              <AddEditTopicModal pageNum={pageNum} setShowModal={setShowModal} />
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
          <SubTitleWrapper>
            <SubTitle>{`글 모임 정보를 수정할 수 있습니다`}</SubTitle>
            <DeleteGroupBtn onClick={handleShowModal}>삭제하기</DeleteGroupBtn>
          </SubTitleWrapper>

          <Spacing marginBottom="3.6" />
          <EditGroupInfo />

          {/* 모임 삭제 모달 */}
          <DefaultModal
            isModalOpen={isModalOpen}
            handleClickBg={handleCloseModal}
            content={`글모임 삭제 시 모임 내 모든 데이터가 삭제되며 \n다시 복구할 수 없습니다. 그래도 계속하시겠습니까?`}
            type="LARGE"
          >
            <DefaultModalBtn isLeft={true} text="예" onClickBtn={deleteGroup} />
            <DefaultModalBtn isLeft={false} text="아니오" onClickBtn={handleCloseModal} />
          </DefaultModal>
        </AdminContainer>
      );
  }
};

export default RenderAdminContent;

const DeleteGroupBtn = styled.button`
  padding: 0.5rem;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.button3};
`;
const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
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

  /* width: 78.1rem; */
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
