import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';

import { useDeleteComment } from '../hooks/queries';

import {
  DetailCommentMeatBallIc,
  TextCommentProfileIc,
  NestCommentIc,
  ArrowTopLeftIc,
} from '../../../assets/svgs';

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
  const [isNestedComment, setIsNestedComment] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBtnClick = () => {
    setIsClick((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <CommentItemWrapper>
        <TextCommentProfileIc />
        <CommentItemContainer>
          <CommentInfoWrapper>
            <CommenterNameText $name={name}>{name}</CommenterNameText>
            <CommnertGroupNameText>{moimName}</CommnertGroupNameText>
          </CommentInfoWrapper>
          <CommentText>{content}</CommentText>
        </CommentItemContainer>
        <IconWrapper>
          <NestCommentIcon onClick={() => setIsNestedComment(!isNestedComment)}>
            <NestCommentIc />
          </NestCommentIcon>
          {isMyComment && (
            <MeatBallWrapper onClick={handleBtnClick}>
              <DetailCommentMeatBallIcon />
              {isClick && (
                <Modal onClick={deleteComment} ref={modalRef}>
                  <ModalContainer>삭제</ModalContainer>
                </Modal>
              )}
            </MeatBallWrapper>
          )}
        </IconWrapper>
      </CommentItemWrapper>
      {isNestedComment && (
        <div>
          {' '}
          <ArrowTopLeftIc />
        </div>
      )}
    </>
  );
};

export default CommentItem;

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

const CommentItemWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  width: 100%;
  height: auto;
  margin-left: 1.2rem;
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
