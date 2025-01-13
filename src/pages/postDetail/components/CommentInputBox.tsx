import styled from '@emotion/styled';
import { useState, FormEvent, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePostComment, usePostNestedComment } from '../hooks/queries';

import { CheckIc } from '../../../assets/svgs';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import Responsive from '../../../components/commons/Responsive/Responsive';

interface CommentPropTypes {
  postId: string | undefined;
  commentId?: string | undefined;
  isMainComment: boolean;
  setIsNestedComment?: Dispatch<SetStateAction<boolean>>;
}

const CommentInputBox = (props: CommentPropTypes) => {
  const { postId, commentId, isMainComment, setIsNestedComment } = props;
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
  const desktopTextareaRef = useRef<HTMLTextAreaElement>(null);
  const mobileTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
    } else {
      if (comment.trim() !== '') {
        //commendId가 있으면 대댓글, 없으면 댓글
        if (comment.length <= 255) {
          commentId ? postNestedComment(comment) : postComment(comment); //댓글 등록
          setComment(''); // 댓글 등록 후 댓글 초기화
          setIsNestedComment && setIsNestedComment(false);
        } else {
          alert('댓글은 최대 255자까지 이용하실 수 있습니다.');
        }
      }
    }
  };

  // 댓글 작성 높이 조정
  const adjustTextareaHeight = () => {
    const isDesktop = window.innerWidth > 850;

    if (isDesktop && desktopTextareaRef.current) {
      desktopTextareaRef.current.style.height = '2.3rem';
      const scrollHeight = desktopTextareaRef.current.scrollHeight;
      desktopTextareaRef.current.style.height = `${scrollHeight}px`;
    } else if (!isDesktop && mobileTextareaRef.current) {
      mobileTextareaRef.current.style.height = '3.7rem';
      const scrollHeight = mobileTextareaRef.current.scrollHeight;
      mobileTextareaRef.current.style.height = `${scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();

    window.addEventListener('resize', adjustTextareaHeight);

    return () => {
      window.removeEventListener('resize', adjustTextareaHeight);
    };
  }, [comment]);

  return (
    <CommentPostWrapper $isMainComment={isMainComment}>
      <CommentLayout isMainComment={isMainComment} isError={comment.length >= 1500}>
        <Responsive only="desktop">
          <DesktopCommentForm
            ref={desktopTextareaRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            isMainComment={isMainComment}
            placeholder="댓글을 남겨주세요."
            maxLength={1500}
          />
        </Responsive>
        <Responsive only="mobile" asChild>
          <MobileCommentForm
            ref={mobileTextareaRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            isMainComment={isMainComment}
            placeholder="댓글을 남겨주세요."
            maxLength={1500}
          />
        </Responsive>
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
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 2.3rem;
  ${({ theme }) => theme.fonts.body5};

  color: ${({ theme }) => theme.colors.gray70};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1};
  }
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

const CommentLayout = styled.div<{ isMainComment: boolean; isError: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  width: ${({ isMainComment }) => (isMainComment ? '69.9rem' : '65.1rem')};
  min-height: 4.3rem;
  padding: 1rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isError }) => (isError ? theme.colors.mileRed : theme.colors.gray30)};
  border-radius: 6px;

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1};
    width: ${({ isMainComment }) => (isMainComment ? '93%' : '90%')};
    min-height: 6rem;
  }
`;

const DesktopCommentForm = styled.textarea<{ isMainComment: boolean }>`
  width: ${({ isMainComment }) => (isMainComment ? '61.1rem' : '56.3rem')};
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: none;

  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray30};

    background-color: ${({ theme }) => theme.colors.gray5};
  }
  ${({ theme }) => theme.fonts.button2};
`;

const MobileCommentForm = styled.textarea<{ isMainComment: boolean }>`
  --scale: 0.875;
  width: 100%;

  /* width: calc(100% * var(--scale)); */
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  transform: scale(var(--scale));
  transform-origin: left top;
  border: none;

  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray30};

    background-color: ${({ theme }) => theme.colors.gray5};
  }

  ${({ theme }) => theme.fonts.body6};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1_1};
  }

`;

const CommentPostBtn = styled.button<{ $isComment: string }>`
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ $isComment, theme }) =>
    $isComment.trim() === '' ? theme.colors.gray70 : theme.colors.white};

  background-color: ${({ $isComment, theme }) =>
    $isComment.trim() === '' ? theme.colors.gray10 : theme.colors.mainViolet};
  border-radius: 8px;

  ${({ theme }) => theme.fonts.button3};

  :hover {
    color: ${({ $isComment, theme }) =>
      $isComment === '' ? theme.colors.gray70 : theme.colors.mainViolet};

    background-color: ${({ $isComment, theme }) =>
      $isComment === '' ? theme.colors.gray10 : theme.colors.mileViolet};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 4rem;
    height: 4.4rem;
    padding: 0;

    ${({ theme }) => theme.fonts.mBody1}
  }
`;

const CommentPostWrapper = styled.div<{ $isMainComment: boolean }>`
  display: flex;
  gap: 1.2rem;
  align-items: flex-end;
  width: ${({ $isMainComment }) => ($isMainComment ? '100%' : '95%')};
`;
