import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CommentItem from './CommentItem';

import { useGetCommentList, usePostComment } from '../hooks/queries';

import { EditorCatIc, CheckIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface CommentPropTypes {
  postId: string | undefined;
  isMainComment: boolean;
}

const Comment = (props: CommentPropTypes) => {
  const { postId, isMainComment } = props;
  const [comment, setComment] = useState('');
  const { commentListData, error } = useGetCommentList(postId || '');
  const { postComment } = usePostComment(postId || '');
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [isUnknownWriter, setIsUnknownWriter] = useState(false);
  // const [isMainComment, setIsMainComment] = useState(true);

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
    } else {
      if (comment.trim() !== '') {
        postComment(comment); //댓글 등록
        setComment(''); // 댓글 등록 후 댓글 초기화
      }
    }
  };

  interface CommentListPropTypes {
    commentId: string;
    name: string;
    moimName: string;
    content: string;
    isMyComment: boolean;
  }

  return error?.message == '403' ? (
    <div></div>
  ) : (
    <CommentWrapper>
      <CommentPostWrapper>
        <CommentLayout isMainComment={isMainComment}>
          <CommentForm
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            isMainComment={isMainComment}
            placeholder="댓글을 남겨주세요."
          />
          <CheckboxLayout>
            <Checkbox
              isUnknownWriter={isUnknownWriter}
              onClick={() => setIsUnknownWriter(!isUnknownWriter)}
            >
              {isUnknownWriter && <CheckIc />}
            </Checkbox>
            익명
          </CheckboxLayout>
        </CommentLayout>

        <CommentPostBtn $isComment={comment} onClick={handleCommentSubmit}>
          등록
        </CommentPostBtn>
      </CommentPostWrapper>
      <Spacing marginBottom="2" />
      {commentListData?.length == 0 ? (
        <>
          <Spacing marginBottom="4" />
          <NoCommentText>아직 댓글이 없어요</NoCommentText>
          <EditorCatIc />
        </>
      ) : (
        commentListData?.map((data: CommentListPropTypes) => (
          <CommentItem
            key={data.commentId}
            name={data.name}
            moimName={data.moimName}
            content={data.content}
            isMyComment={data.isMyComment}
            postId={postId}
            commentId={data.commentId}
          ></CommentItem>
        ))
      )}
    </CommentWrapper>
  );
};

export default Comment;

const CheckboxLayout = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  width: 5rem;
  ${({ theme }) => theme.fonts.body5};

  color: ${({ theme }) => theme.colors.gray70};
`;

const Checkbox = styled.button<{ isUnknownWriter: boolean }>`
  display: flex;
  align-items: center;
  width: 1.6rem;
  height: 1.6rem;
  padding: 0;

  background-color: ${({ theme, isUnknownWriter }) =>
    isUnknownWriter ? theme.colors.mainViolet : theme.colors.gray5};
  border: 1px solid
    ${({ theme, isUnknownWriter }) =>
      isUnknownWriter ? theme.colors.mainViolet : theme.colors.gray30};
  border-radius: 2px;
`;

const CommentLayout = styled.div<{ isMainComment: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: ${({ isMainComment }) => (isMainComment ? '69.9rem' : '65.1rem')};
  height: 4rem;
  padding: 1rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  border-radius: 6px;
`;

const CommentForm = styled.input<{ isMainComment: boolean }>`
  width: ${({ isMainComment }) => (isMainComment ? '62.1rem' : '57.3rem')};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray30};
  }
  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: none;

  ${({ theme }) => theme.fonts.button2};
`;

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

const CommentPostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const NoCommentText = styled.p`
  margin-bottom: 3rem;

  color: ${({ theme }) => theme.colors.gray50};

  ${({ theme }) => theme.fonts.title8};
`;
