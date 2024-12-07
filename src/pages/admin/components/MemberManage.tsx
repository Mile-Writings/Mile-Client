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
  width: 100%;
  padding: 1.4rem 1.8rem;

  color: ${({ theme }) => theme.colors.mainViolet};

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 0.8rem 0.8rem 0 0;
  ${({ theme }) => theme.fonts.button3};

  @media ${MOBILE_MEDIA_QUERY} {
    height: 4rem;
    padding: 1rem;
  }
`;

const InfoField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;

  &:first-of-type {
    flex: 0;
    justify-content: start;

    @media ${MOBILE_MEDIA_QUERY} {
      flex: 0;
      justify-content: start;
      min-width: 3.4rem;
    }
  }

  &:nth-of-type(2) {
    flex: 1.7;

    @media ${MOBILE_MEDIA_QUERY} {
      flex: 1.7;
      min-width: 12rem;
    }
  }

  &:nth-of-type(3) {
    flex: 1;
    justify-content: center;

    @media ${MOBILE_MEDIA_QUERY} {
      flex: 1;
      justify-content: center;
      margin-right: 1rem;
    }
  }

  &:nth-of-type(4) {
    flex: 2;
    justify-content: start;

    @media ${MOBILE_MEDIA_QUERY} {
      flex: 2;
      justify-content: start;
      min-width: 5rem;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.editor};
  }
`;

const MemberListLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 1.2rem;
  }
`;
