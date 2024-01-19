import styled from '@emotion/styled';
import { useState } from 'react';

import { useDeleteComment } from '../hooks/queries';

import { DetailCommentMeatBallIc, TextCommentProfileIc } from '../../../assets/svgs';

interface CommentItem {
  // id?: number;  추후 사용될지 모름
  name: string;
  moimName: string;
  content: string;
  isMyComment: boolean;
  postId: string | undefined;
  commentId: string;
}

const CommentItem = ({ name, moimName, content, isMyComment, postId, commentId }: CommentItem) => {
  const { deleteComment } = useDeleteComment(commentId || '', postId || '');
  const [isClick, setIsClick] = useState(false);

  const handleBtnClick = () => {
    setIsClick((prev) => !prev);
  };
  return (
    <CommentItemWrapper>
      <TextCommentProfileIc />
      <CommentItemContainer>
        <CommentInfoWrapper>
          <CommenterNameText $name={name}>{name}</CommenterNameText>
          <CommnertGroupNameText>{moimName}</CommnertGroupNameText>
        </CommentInfoWrapper>
        <CommentText>{content}</CommentText>
      </CommentItemContainer>
      {isMyComment && (
        <MeatBallWrapper onClick={handleBtnClick}>
          <DetailCommentMeatBallIcon />
          {isClick && (
            <Modal onClick={deleteComment}>
              <ModalContainer>삭제</ModalContainer>
            </Modal>
          )}
        </MeatBallWrapper>
      )}
    </CommentItemWrapper>
  );
};

export default CommentItem;

const CommentItemWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  width: 100%;
  height: 8.4rem;
  margin-left: 1.2rem;
  padding: 1.8rem 0;

  background-color: ${({ theme }) => theme.colors.white};
`;

const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 67rem;
  height: 4.7rem;
`;

const CommentInfoWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: start;
`;

const CommenterNameText = styled.p<{ $name: string }>`
  color: ${({ theme }) => theme.colors.mainViolet};
  color: ${({ $name, theme }) =>
    $name == '글쓴이' ? theme.colors.mainViolet : theme.colors.black};
  ${({ theme }) => theme.fonts.body5};
`;

const CommnertGroupNameText = styled.p`
  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.body8};
`;

const CommentText = styled.p`
  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.body6};
`;

const Modal = styled.div`
  position: absolute;
  top: 4rem;
  right: 1rem;
  display: flex;
  align-items: center;
  width: 10.6rem;
  height: 5.1rem;
  padding: 1rem;

  color: ${({ theme }) => theme.colors.gray90};
  text-align: left;
  ${({ theme }) => theme.fonts.button2};

  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;
`;

const ModalContainer = styled.div`
  width: 100%;
  padding: 0.6rem 1rem;

  border-radius: 6px;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }
`;
const DetailCommentMeatBallIcon = styled(DetailCommentMeatBallIc)`
  cursor: pointer;
`;

const MeatBallWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 2.6rem;

  border-radius: 4px;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }
`;
