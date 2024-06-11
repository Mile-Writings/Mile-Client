import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDeleteMember, useFetchMemberInfo } from '../hooks/queries';

import { adminEmptyMemberIc as AdminEmptyMemberIcon, adminProfileIc } from '../../../assets/svgs';
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
  const { groupId } = useParams();
  const { memberData } = useFetchMemberInfo(groupId || '', pageCount);
  const { deleteMember } = useDeleteMember();
  const [activeChunk, setActiveChunk] = useState(1);

  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();
  const [deleteMemberId, setDeleteMemberId] = useState(-1);

  return (
    <>
      <MemberTableWrapper>
        <TableHeaderLayout>
          <Header>프로필</Header>
          <Header>필명</Header>
          <Header>게시물 수</Header>
          <Header>댓글 수</Header>
        </TableHeaderLayout>
        <Spacing marginBottom="0.4" />
        <MemberLayout>
          {data?.writerNameCount !== 0 ? (
            data?.writerNameList.map(
              ({ writerNameId, writerName, postCount, commentCount, isOwner }) => (
                <MemberItemContainer key={writerNameId}>
                  <AdminProfileIcon />
                  <Name>{writerName}</Name>
                  <PostNumber>{postCount}</PostNumber>
                  <CommentNumber>{commentCount}</CommentNumber>
                  {!isOwner ? (
                    <ExpelBtn
                      onClick={() => {
                        setDeleteMemberId(writerNameId);
                        handleShowModal();
                      }}
                    >
                      삭제하기
                    </ExpelBtn>
                  ) : (
                    <Owner>글 모임 장</Owner>
                  )}
                </MemberItemContainer>
              ),
            )
          ) : (
            <EmptyContainer>
              <EmptyMemberText>아직 멤버가 없습니다.</EmptyMemberText>
              <Spacing marginBottom="3" />
              <AdminEmptyMemberIcon />
            </EmptyContainer>
          )}
        </MemberLayout>
      </MemberTableWrapper>
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
        modalContent={
          '삭제 시, 해당 멤버와 해당 멤버가 작성한\n글과 댓글도 모두 삭제됩니다. 계속 하시겠습니까?'
        }
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

const MemberTableWrapper = styled.section`
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

const Header = styled.p`
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

const MemberLayout = styled.section`
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

const Name = styled.pre`
  width: 11.1rem;
  margin-right: 6.8rem;

  color: ${({ theme }) => theme.colors.black};
  text-align: center;

  ${({ theme }) => theme.fonts.body1};
`;

const PostNumber = styled.pre`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 5.1rem;
  margin-right: 6rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body1}
`;

const CommentNumber = styled.pre`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 5.1rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body1}
`;

const ExpelBtn = styled.button`
  margin-left: auto;

  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.body5};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};
  }
`;

const Owner = styled.span`
  margin-left: auto;

  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.body5};
  cursor: default;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 78.1rem;
  height: 36.8rem;
  padding: 0.4rem 1.8rem;
`;

const EmptyMemberText = styled.div`
  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.title8};
`;
