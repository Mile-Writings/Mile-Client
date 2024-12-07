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
      <AdminProfileIcon style={{ flexShrink: 0 }} />
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
    </MemberItemWrapper>
  );
};

export default MemberItem;

const MemberItemWrapper = styled.article`
  display: flex;
  align-items: center;
  padding: 1.6rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray10};
`;

const AdminProfileIcon = styled(adminProfileIc)`
  margin-right: 4rem;
`;

const Name = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.3rem;
  margin-right: 6.8rem;

  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;

  ${({ theme }) => theme.fonts.body1};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 12.1rem;

    ${({ theme }) => theme.fonts.editor}
  }
`;

const PostNumber = styled.p`
  justify-content: center;
  width: 5.1rem;
  margin-right: 6rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  ${({ theme }) => theme.fonts.body1}

  @media ${MOBILE_MEDIA_QUERY} {
    width: 4.9rem;

    ${({ theme }) => theme.fonts.editor}
  }
`;

const CommentNumber = styled.p`
  justify-content: center;
  width: 5.1rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  ${({ theme }) => theme.fonts.body1}

  @media ${MOBILE_MEDIA_QUERY} {
    width: 3.7rem;

    ${({ theme }) => theme.fonts.editor}
  }
`;

const ExpelBtn = styled.button`
  margin-left: auto;
  padding: 0;

  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.body5};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    transition: all 0.3s ease-in-out;
  }
`;
