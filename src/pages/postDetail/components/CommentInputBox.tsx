import styled from '@emotion/styled';
import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePostComment, usePostNestedComment } from '../hooks/queries';

import { CheckIc } from '../../../assets/svgs';

interface CommentPropTypes {
  postId: string | undefined;
  commentId?: string | undefined;
  isMainComment: boolean;
  setIsNestedComment?: Dispatch<SetStateAction<boolean>>;
  handleRecentCommentIndex: () => void;
}

const CommentInputBox = (props: CommentPropTypes) => {
  const { postId, commentId, isMainComment, setIsNestedComment, handleRecentCommentIndex } = props;
  const [isUnknownWriter, setIsUnknownWriter] = useState(false);
  const [comment, setComment] = useState('');
  const { postComment } = usePostComment(postId || '', isUnknownWriter);
  const { postNestedComment } = usePostNestedComment(
    commentId || '',
    postId || '',
    isUnknownWriter,
  );
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
    } else {
      if (comment.trim() !== '') {
        //commendId가 있으면 대댓글, 없으면 댓글
        commentId ? postNestedComment(comment) : postComment(comment); //댓글 등록
        handleRecentCommentIndex();
        setComment(''); // 댓글 등록 후 댓글 초기화
        setIsNestedComment && setIsNestedComment(false);
      }
    }
  };
  return (
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
  );
};
export default CommentInputBox;

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
  gap: 1.2rem;
  width: 100%;
`;
