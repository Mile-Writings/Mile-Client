import styled from '@emotion/styled';

import CommentInputBox from './CommentInputBox';
import CommentItem from './CommentItem';

import { useGetCommentList } from '../hooks/queries';

import { EditorCatIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface CommentPropTypes {
  postId: string | undefined;
}

const Comment = (props: CommentPropTypes) => {
  const { postId } = props;

  const { commentListData, error } = useGetCommentList(postId || '');

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
      <CommentInputBox postId={postId} isMainComment={true} />
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
