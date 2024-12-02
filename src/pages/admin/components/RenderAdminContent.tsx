import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EditGroupInfo from './EditGroupInfo';
import MemberManage from './MemberManage';
import TopicAdmin from './TopicAdmin';

import { MODAL } from '../constants/modal';
import { useAdminTopic, useDeleteGroup, useFetchMemberInfo } from '../hooks/queries';

import { useNavigate } from 'react-router-dom';
import { MakeGroupAdminIc } from '../../../assets/svgs';
import InputModal from '../../../components/commons/inputModal/InputModal';
import { DefaultModal, DefaultModalBtn } from '../../../components/commons/modal/DefaultModal';
import Responsive from '../../../components/commons/Responsive/Responsive';
import Spacing from '../../../components/commons/Spacing';
import { ADMIN } from '../../../constants/modal';
import useBlockPageExit from '../../../hooks/useBlockPageExit';
import useModal from '../../../hooks/useModal';
import Loading from '../../loading/Loading';
import { Menu } from '../types/menu';

interface RenderAdminContentPropTypes {
  menu: Menu;
}

const RenderAdminContent = ({ menu }: RenderAdminContentPropTypes) => {
  const { groupId } = useParams();
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const { memberData, totalMember } = useFetchMemberInfo(groupId || '', page);
  const {
    topicCount,
    adminTopicData,
    isError: isAdminTopicError,
  } = useAdminTopic(groupId, pageNum);

  // input 모달 열고 닫기
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const navigate = useNavigate();

  // 공통 모달 열고 닫기
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();

  // 페이지 이탈 감지
  const { isPageExitModalOpen, handleClosePageExitModal, handleExitPage, setIgnoreBlocker } =
    useBlockPageExit();

  // groupInfo일 때만 페이지 이탈 감지 활성화
  useEffect(() => {
    menu === '모임 정보 수정' ? setIgnoreBlocker(false) : setIgnoreBlocker(true);
  }, [menu]);

  const { mutate: deleteGroup, isPending, isError } = useDeleteGroup(groupId || '');

  const handleDeleteGroup = () => {
    deleteGroup();
    setIgnoreBlocker(true);
  };

  if (isError || isAdminTopicError) {
    navigate('/error');
  }
  if (isPending) {
    return <Loading />;
  }

  switch (menu) {
    case '글감 설정':
      return (
        <AdminContainer>
          <AdminLayout>
            <div>
              <Responsive only="desktop">
                <Title>글감 설정</Title>
                <Spacing marginBottom="1.2" />
              </Responsive>
              <SubTitle>{`${topicCount}개의 글감이 저장되어있어요`}</SubTitle>
            </div>
            <Responsive only="desktop">
              <MakeGroupAdminIc style={{ cursor: 'pointer' }} onClick={openModal} />
            </Responsive>
            <Responsive only="mobile">
              <MakeGroupAdminIc
                width={32}
                height={32}
                style={{ cursor: 'pointer' }}
                onClick={openModal}
              />
            </Responsive>
          </AdminLayout>
          <Responsive only="desktop">
            <Spacing marginBottom="3.6" />
          </Responsive>
          <Responsive only="mobile">
            <Spacing marginBottom="1.2" />
          </Responsive>
          {showModal && (
            <>
              <ModalOverlay onClick={closeModal} />
              <InputModal
                pageNum={pageNum}
                setShowModal={setShowModal}
                topicPlaceholder={ADMIN.PLACEHOLER.TOPIC}
                tagPlaceholder={ADMIN.PLACEHOLER.TAG}
                descPlaceholder={ADMIN.PLACEHOLER.DESC}
              />
            </>
          )}
          <TopicAdmin data={adminTopicData} setPageNum={setPageNum} pageNum={pageNum} />
        </AdminContainer>
      );

    case '멤버 관리':
      return (
        <AdminContainer>
          <Title>멤버 관리</Title>
          <Spacing marginBottom="1.2" />
          <SubTitle>{`${totalMember}명의 멤버가 함께하고 있어요`}</SubTitle>
          <Spacing marginBottom="3.6" />
          <MemberManage data={memberData} setPageCount={setPage} pageCount={page} />
        </AdminContainer>
      );

    case '모임 정보 수정':
      return (
        <>
          <AdminContainer>
            <Title>모임 정보 수정</Title>
            <Spacing marginBottom="1.2" />
            <SubTitleWrapper>
              <SubTitle>{`글 모임 정보를 수정할 수 있습니다`}</SubTitle>
              <DeleteGroupBtn onClick={handleShowModal}>삭제하기</DeleteGroupBtn>
            </SubTitleWrapper>

            <Spacing marginBottom="3.6" />
            <EditGroupInfo />
          </AdminContainer>

          {/* 모임 삭제 모달 */}
          <DefaultModal
            isModalOpen={isModalOpen}
            onClickBg={handleCloseModal}
            content={MODAL.DELETE_GROUP}
            sizeType="LARGE"
          >
            <DefaultModalBtn
              btnText={['예', '아니요']}
              onClickLeft={handleDeleteGroup}
              onClickRight={handleCloseModal}
            />
          </DefaultModal>

          {/* 페이지 이탈 모달 */}
          <DefaultModal
            isModalOpen={isPageExitModalOpen}
            onClickBg={handleClosePageExitModal}
            content={MODAL.PAGE_EXIT_WARN}
          >
            <DefaultModalBtn
              btnText={['예', '아니요']}
              onClickLeft={handleExitPage}
              onClickRight={handleClosePageExitModal}
            />
          </DefaultModal>
        </>
      );
  }
};

export default RenderAdminContent;

const DeleteGroupBtn = styled.button`
  padding: 0.5rem;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.button3};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};
  }
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
  width: 100%;
  padding-right: 16.5rem;
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
