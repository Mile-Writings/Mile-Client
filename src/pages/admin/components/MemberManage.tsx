import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MODAL } from '../constants/modal';
import { useDeleteMember, useFetchMemberInfo } from '../hooks/queries';

import { adminProfileIc, MemberMaster } from '../../../assets/svgs';
import { NegativeModal } from '../../../components/commons/Modal';
import Pagenation from '../../../components/commons/Pagenation';
import Spacing from '../../../components/commons/Spacing';
import useModal from '../../../hooks/useModal';

interface MemberPropTypes {
  pageNumber: number;
  writerNameCount: number;
  writerNameList: {
    writerNameId: number;
    writerName: string;
    postCount: number;
    commentCount: number;
    isOwner: boolean;
  }[];
}

interface MemberManagePropTypes {
  data?: MemberPropTypes;
  setPageCount: Dispatch<SetStateAction<number>>;
  pageCount: number;
}

const MemberManage = ({ data, setPageCount, pageCount }: MemberManagePropTypes) => {
  const [activeChunk, setActiveChunk] = useState(1);
  const [deleteMemberId, setDeleteMemberId] = useState(-1);
  const navigate = useNavigate();

  const { groupId } = useParams();
  const { memberData, error } = useFetchMemberInfo(groupId || '', pageCount);
  const { deleteMember } = useDeleteMember();

  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();

  if (isAxiosError(error)) {
    switch (error.response?.data.status) {
      case 40303: // 조회 권한이 없을 때 (관리자가 아닐 때)
        alert('접근 권한이 없습니다.');
        navigate(-1);
        break;
      case 40400: // 요청한 토큰에 대한 유저가 존재하지 않을 때
        if (confirm('존재하지 않는 사용자입니다. 새로고침 하시겠습니까?')) {
          window.location.reload();
        }
        break;
      case 40403: // 해당 글모임이 존재하지 않을 때
        alert('존재하지 않는 글모임입니다.');
        navigate('/');
        break;
      default:
        alert('내용을 불러올 수 없어요. 잠시 후에 다시 시도해주세요.');
        navigate('/');
    }
  }

  const handleExpel = (writerNameId: number) => {
    setDeleteMemberId(writerNameId);
    handleShowModal();
  };

  return (
    <>
      <MemberListTableWrapper>
        <TableHeaderLayout>
          <InfoField>프로필</InfoField>
          <InfoField>필명</InfoField>
          <InfoField>게시물 수</InfoField>
          <InfoField>댓글 수</InfoField>
        </TableHeaderLayout>
        <Spacing marginBottom="0.4" />

        <MemberListLayout>
          {data?.writerNameList.map(
            ({ writerNameId, writerName, postCount, commentCount, isOwner }) => (
              <MemberItemContainer key={writerNameId}>
                <AdminProfileIcon />
                <Name>
                  {isOwner && <MemberMaster />}
                  {writerName}
                </Name>
                <PostNumber>{postCount}</PostNumber>
                <CommentNumber>{commentCount}</CommentNumber>
                {!isOwner && (
                  <ExpelBtn type="button" onClick={() => handleExpel(writerNameId)}>
                    삭제하기
                  </ExpelBtn>
                )}
              </MemberItemContainer>
            ),
          )}
        </MemberListLayout>
      </MemberListTableWrapper>
      <Spacing marginBottom="3.6" />

      {memberData && memberData.writerNameCount && (
        <Pagenation
          count={memberData.writerNameCount}
          allocatedCount={5}
          setActivePage={setPageCount}
          activePage={pageCount}
          activeChunk={activeChunk}
          setActiveChunk={setActiveChunk}
        />
      )}

      <NegativeModal
        modalContent={MODAL.DELETE_MEMBER}
        isModalOpen={isModalOpen}
        modalHandler={() => {
          deleteMember(deleteMemberId);
          handleCloseModal();
        }}
        closeModalHandler={() => {
          setDeleteMemberId(-1);
          handleCloseModal();
        }}
      />
    </>
  );
};

export default MemberManage;

const MemberListTableWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 78.1rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
`;

const TableHeaderLayout = styled.div`
  display: flex;
  padding: 1.4rem 1.8rem;

  color: ${({ theme }) => theme.colors.mainViolet};

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 0.8rem 0.8rem 0 0;
  ${({ theme }) => theme.fonts.button3};
`;

const InfoField = styled.div`
  display: flex;
  align-items: flex-start;

  &:first-of-type {
    margin-right: 8.45rem;
  }

  &:nth-of-type(2) {
    margin-right: 11.1rem;
  }

  &:nth-of-type(3) {
    margin-right: 6rem;
  }
`;

const MemberListLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
`;

const MemberItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray10};
`;

const AdminProfileIcon = styled(adminProfileIc)`
  margin-right: 4rem;
`;

const Name = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 11.1rem;
  margin-right: 6.8rem;

  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;

  ${({ theme }) => theme.fonts.body1};
`;

const PostNumber = styled.span`
  /* display: flex; */
  justify-content: center;
  width: 5.1rem;
  margin-right: 6rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  ${({ theme }) => theme.fonts.body1}
`;

const CommentNumber = styled.span`
  justify-content: center;
  width: 5.1rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  ${({ theme }) => theme.fonts.body1}
`;

const ExpelBtn = styled.button`
  margin-left: auto;
  padding: 0;

  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.body5};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    transition: all 0.3s ease-in-out;
  }
`;
