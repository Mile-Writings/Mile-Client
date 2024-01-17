import styled from '@emotion/styled';
import { useState, FormEvent } from 'react';

import CommentItem from './CommentItem';

import { usePostComment, useGetCommentList } from '../hooks/queries';

interface CommentPropTypes {
  postId: string | undefined;
}

const Comment = (props: CommentPropTypes) => {
  const { postId } = props;
  const [comment, setComment] = useState('');
  const { commentListData } = useGetCommentList(postId || '');
  const { postComment } = usePostComment(postId || '');

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      postComment(comment); //댓글 등록
      setComment(''); // 댓글 등록 후 댓글 초기화
    }
  };

  interface CommentListPropTypes {
    commentId: string;
    name: string;
    moimName: string;
    content: string;
    isMyComment: boolean;
  }

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
      {commentListData?.map((data: CommentListPropTypes) => (
        <CommentItem
          key={data.commentId}
          name={data.name}
          moimName={data.moimName}
          content={data.content}
          isMyComment={data.isMyComment}
          postId={postId}
          commentId={data.commentId}
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
