import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { adminProfileIc, MemberMaster } from '../../../assets/svgs';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

interface MemberItemPropTypes {
  writerNameId: number;
  writerName: string;
  postCount: number;
  isOwner: boolean;
  commentCount: number;
  setDeleteMemberId: Dispatch<SetStateAction<number>>;
  handleShowModal: () => void;
}

const MemberItem = ({
  writerNameId,
  writerName,
  postCount,
  commentCount,
  isOwner,
  setDeleteMemberId,
  handleShowModal,
}: MemberItemPropTypes) => {
  const handleExpel = (writerNameId: number) => {
    setDeleteMemberId(writerNameId);
    handleShowModal();
  };

  return (
    <MemberItemWrapper key={writerNameId}>
      <AdminProfileIcon />
      <Name>
        {isOwner && <MemberMaster css={{ flexShrink: '0' }} />}
        {writerName}
      </Name>
      <PostNumber>{postCount}</PostNumber>
      <CommentNumber>{commentCount}</CommentNumber>
      <ExpelBtn type="button" onClick={() => handleExpel(writerNameId)} $isOwner={isOwner}>
        삭제하기
      </ExpelBtn>
    </MemberItemWrapper>
  );
};

export default MemberItem;

const MemberItemWrapper = styled.article`
  display: flex;
  gap: 4rem;
  align-items: center;
  width: 100%;
  padding: 1.6rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray10};

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-columns: 50fr 100fr 100fr 150fr auto;
    gap: 0;
    height: 5.6rem;
  }
`;

const AdminProfileIcon = styled(adminProfileIc)`
  flex-shrink: 0;
  min-width: 3.4rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 2.8rem;
    height: 2.8rem;
    margin-right: 1rem;
  }
`;

const Name = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  min-width: 12rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body1};
  white-space: nowrap;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
    min-width: 9.5rem;
    margin-right: 1.2rem;
    ${({ theme }) => theme.fonts.editor};
  }
`;

const PostNumber = styled.div`
  flex: 1.7;
  justify-content: start;
  min-width: 4.4rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  ${({ theme }) => theme.fonts.body1};

  @media ${MOBILE_MEDIA_QUERY} {
    flex: 0;
    min-width: 3.3rem;
    margin: 0 2rem 0 1.2rem;
    ${({ theme }) => theme.fonts.editor};
  }
`;

const CommentNumber = styled.div`
  display: flex;
  flex: 2;
  justify-content: start;
  min-width: 3.7rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  ${({ theme }) => theme.fonts.body1};

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: start;
    min-width: 3.3rem;
    padding-left: 1rem;

    ${({ theme }) => theme.fonts.editor};
  }
`;

const ExpelBtn = styled.button<{ $isOwner: boolean }>`
  display: flex;
  margin-left: auto;

  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.body5};
  white-space: nowrap;

  visibility: ${({ $isOwner }) => ($isOwner ? 'hidden' : 'visible')};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    transition: all 0.3s ease-in-out;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.editor};
  }
`;
