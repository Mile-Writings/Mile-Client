import styled from '@emotion/styled';
import { ChangeEvent, useState, MouseEvent, FormEvent, useEffect } from 'react';

import CommentItem from './CommentItem';

import { commentData } from '../constants/commentData';
import { usePostComment } from '../hooks/queries';

interface CommentPropTypes {
  postId: string | undefined;
}

const Comment = (props: CommentPropTypes) => {
  const { postId } = props;
  const [comment, setComment] = useState('');
  const { mutate: postComment } = usePostComment(postId || '', comment);

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      postComment(postId || '', comment); //댓글 등록
      setComment(''); // 댓글 등록 후 댓글 초기화
    }
  };

  return (
    <CommentWrapper>
      <CommentPostWrapper>
        <CommentForm
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 남겨주세요."
        />

        <CommentPostBtn $isComment={comment} onClick={handleCommentSubmit}>
          등록
        </CommentPostBtn>
      </CommentPostWrapper>
      {commentData.map((data) => (
        <CommentItem
          key={data.commentId}
          id={data.commentId}
          name={data.name}
          moimName={data.moimName}
          content={data.content}
          isMyComment={data.isMyComment}
        ></CommentItem>
      ))}
    </CommentWrapper>
  );
};

export default Comment;

const CommentPostBtn = styled.button<{ $isComment: string }>`
  padding: 1rem 1.6rem;

  color: ${({ $isComment, theme }) =>
    $isComment === '' ? theme.colors.gray70 : theme.colors.white};

  background-color: ${({ $isComment, theme }) =>
    $isComment === '' ? theme.colors.gray10 : theme.colors.mainViolet};
  border-radius: 8px;

  ${({ theme }) => theme.fonts.button3};

  :hover {
    color: ${({ $isComment, theme }) =>
      $isComment === '' ? theme.colors.gray70 : theme.colors.mainViolet};

    background-color: ${({ $isComment, theme }) =>
      $isComment === '' ? theme.colors.gray10 : theme.colors.mileViolet};
  }
`;
const CommentForm = styled.input`
  width: 69.6rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray30};
  }
  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  border-radius: 6px;
  ${({ theme }) => theme.fonts.button2};
`;
const CommentPostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;
