import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MODAL } from '../constants/modal';
import { useDeleteMember, useFetchMemberInfo } from '../hooks/queries';

import { DefaultModal, DefaultModalBtn } from '../../../components/commons/modal/DefaultModal';

import Pagenation from '../../../components/commons/Pagenation';
import Responsive from '../../../components/commons/Responsive/Responsive';
import Spacing from '../../../components/commons/Spacing';
import useModal from '../../../hooks/useModal';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import MemberItem from './MemberItem';

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

  const { groupId } = useParams();

  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();

  const { memberData } = useFetchMemberInfo(groupId || '', pageCount);
  const { deleteMember } = useDeleteMember();

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
          {data?.writerNameList.map((member) => (
            <MemberItem
              key={member.writerNameId}
              {...member}
              setDeleteMemberId={setDeleteMemberId}
              handleShowModal={handleShowModal}
            />
          ))}
        </MemberListLayout>
      </MemberListTableWrapper>
      <Responsive only="desktop">
        <Spacing marginBottom="3.6" />
      </Responsive>
      <Responsive only="mobile">
        <Spacing marginBottom="1.6" />
      </Responsive>

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

      <DefaultModal
        isModalOpen={isModalOpen}
        onClickBg={handleCloseModal}
        content={MODAL.DELETE_MEMBER}
        sizeType="SMALL"
      >
        <DefaultModalBtn
          btnText={['예', '아니요']}
          onClickLeft={() => {
            deleteMember(deleteMemberId);
            handleCloseModal();
          }}
          onClickRight={() => {
            setDeleteMemberId(-1);
            handleCloseModal();
          }}
        />
      </DefaultModal>
    </>
  );
};

export default MemberManage;

const MemberListTableWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 78.1rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    min-width: 33.5rem;
  }
`;

const TableHeaderLayout = styled.div`
  display: flex;
  gap: 4rem;
  max-width: 78.1rem;
  padding: 1.4rem 1.8rem;

  color: ${({ theme }) => theme.colors.mainViolet};

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 0.8rem 0.8rem 0 0;
  ${({ theme }) => theme.fonts.button3};

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 0;
    width: 100%;
    min-width: 33.5rem;
    height: 4rem;
  }
`;

const InfoField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.editor};
  }

  &:first-of-type {
    justify-content: start;
    margin-right: 5.65rem;

    @media ${MOBILE_MEDIA_QUERY} {
      width: 3.4rem;
      margin-right: 0;
    }
  }

  &:nth-of-type(2) {
    margin-right: 8.3rem;

    @media ${MOBILE_MEDIA_QUERY} {
      min-width: 12.1rem;
      margin-right: 0.4rem;
    }
  }

  &:nth-of-type(3) {
    margin-right: 2rem;

    @media ${MOBILE_MEDIA_QUERY} {
      min-width: 4.9rem;
      margin-right: 1rem;
    }
  }

  &:nth-of-type(4) {
    margin-right: 27rem;

    @media ${MOBILE_MEDIA_QUERY} {
      min-width: 3.7rem;
      margin-right: 0.9rem;
    }
  }
`;

const MemberListLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
`;
