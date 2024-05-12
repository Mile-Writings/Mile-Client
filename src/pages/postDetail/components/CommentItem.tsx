import styled from '@emotion/styled';
import { useState, useRef } from 'react';

import CommentInputBox from './CommentInputBox';

import { useDeleteComment, useDeleteNestedComment } from '../hooks/queries';

import {
  DetailCommentMeatBallIc,
  TextCommentProfileIc,
  NestCommentIc,
  ArrowTopLeftIc,
  GroupListProfileCloseIc,
} from '../../../assets/svgs';
import useClickOutside from '../../../hooks/useClickOutside';

interface CommentItem {
  name: string;
  moimName: string;
  content: string;
  isMyComment?: boolean;
  isMyReply?: boolean;
  isAnonymous: boolean;
  postId: string | undefined;
  commentId: string;
  isNested: boolean;
  type: 'nestedComment' | 'comment';
}

const CommentItem = ({
  name,
  moimName,
  content,
  isMyComment,
  isMyReply,
  postId,
  commentId,
  type,
  isAnonymous,
  isNested,
}: CommentItem) => {
  const { deleteComment } = useDeleteComment(commentId || '', postId || '');
  const { deleteNestedComment } = useDeleteNestedComment(commentId || '', postId || '');
  const [isClick, setIsClick] = useState(false);
  const [isNestedComment, setIsNestedComment] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);
  const [isBgClick, setIsBgClick] = useState(false);

  const handleDeleteBtn = () => {
    if (isClick) setIsBgClick(true);
    if (isBgClick) {
      setIsClick((prev) => !prev);
      setIsBgClick(false);
    }
  };

  const handleCommentBtn = () => {
    if (isNestedComment) setIsBgClick(true);
    if (isBgClick) {
      setIsNestedComment((prev) => !prev);
      setIsBgClick(false);
    }
  };

  useClickOutside(modalRef, handleDeleteBtn);
  useClickOutside(commentRef, handleCommentBtn);

  return (
    <>
      <CommentItemWrapper isComment={type === 'comment'}>
        {isAnonymous ? <GroupListProfileCloseIc /> : <TextCommentProfileIc />}
        <CommentItemContainer>
          <CommentInfoWrapper>
            <CommenterNameText $name={name}>{name}</CommenterNameText>
            <CommnertGroupNameText>{moimName}</CommnertGroupNameText>
          </CommentInfoWrapper>
          <CommentText>{content}</CommentText>
        </CommentItemContainer>
        <IconWrapper>
          {!isNested && (
            <NestCommentIcon
              onClick={() => {
                setIsNestedComment(true);
              }}
            >
              <NestCommentIc />
            </NestCommentIcon>
          )}
          {isMyComment && (
            <MeatBallWrapper onClick={() => setIsClick(true)}>
              <DetailCommentMeatBallIcon />
              {isClick && (
                <Modal
                  onClick={() => {
                    deleteComment();
                  }}
                  ref={modalRef}
                >
                  <ModalContainer>삭제</ModalContainer>
                </Modal>
              )}
            </MeatBallWrapper>
          )}
          {isMyReply && (
            <MeatBallWrapper onClick={() => setIsClick(true)}>
              <DetailCommentMeatBallIcon />
              {isClick && (
                <Modal
                  onClick={() => {
                    deleteNestedComment();
                  }}
                  ref={modalRef}
                >
                  <ModalContainer>삭제</ModalContainer>
                </Modal>
              )}
            </MeatBallWrapper>
          )}
        </IconWrapper>
      </CommentItemWrapper>
      {isNestedComment && (
        <NestedCommentWrapper ref={commentRef}>
          <ArrowTopLeftIc />
          <CommentInputBox
            postId={postId}
            commentId={commentId}
            isMainComment={false}
            setIsNestedComment={setIsNestedComment}
          />
        </NestedCommentWrapper>
      )}
    </>
  );
};

export default CommentItem;

const NestedCommentWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-left: 1.2rem;
  padding: 1.2rem 0;
`;

const IconWrapper = styled.div`
  display: flex;
`;

const NestCommentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;

  cursor: pointer;
`;

const CommentItemWrapper = styled.div<{ isComment: boolean }>`
  display: flex;
  gap: 1.2rem;
  width: ${({ isComment }) => (isComment ? '76.8rem' : '72rem')};
  height: auto;
  padding: 1.8rem 0;

  background-color: ${({ theme }) => theme.colors.white};
`;

const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 67rem;
  height: auto;
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
  top: 3.2rem;
  right: 0;

  display: flex;
  align-items: center;
  width: 10.6rem;
  height: 5.1rem;
  padding: 1rem;

  color: ${({ theme }) => theme.colors.gray90};
  text-align: left;

  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.button2};
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
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;

  border-radius: 4px;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }
`;
