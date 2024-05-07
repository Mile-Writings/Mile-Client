import styled from '@emotion/styled';

import CommentInputBox from './CommentInputBox';
import CommentItem from './CommentItem';

import { useGetCommentList } from '../hooks/queries';

import { ArrowTopLeftIc, EditorCatIc } from '../../../assets/svgs';
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
    isAnonymous: boolean;
    replies?: ReplyResponseTypes[] | undefined;
  }

  interface ReplyResponseTypes {
    replyId: string;
    name: string;
    moimName: string;
    content: string;
    isMyReply: boolean;
    isAnonymous: boolean;
  }

  return error?.message == '403' ? (
    <div />
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
          <>
            <CommentItem
              key={data.commentId}
              name={data.name}
              moimName={data.moimName}
              content={data.content}
              isMyComment={data.isMyComment}
              postId={postId}
              commentId={data.commentId}
              isAnonymous={data.isAnonymous}
              type="comment"
            />
            {data.replies &&
              data.replies.map((nestedData: ReplyResponseTypes) => (
                <NestedWrapper key={nestedData.replyId}>
                  <ArrowTopLeftIc />
                  <CommentItem
                    name={nestedData.name}
                    moimName={nestedData.moimName}
                    content={nestedData.content}
                    isMyReply={nestedData.isMyReply}
                    postId={postId}
                    commentId={nestedData.replyId}
                    isAnonymous={nestedData.isAnonymous}
                    type="nestedComment"
                  />
                </NestedWrapper>
              ))}
          </>
        ))
      )}
    </CommentWrapper>
  );
};

export default Comment;

const NestedWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  width: 76.8rem;
  padding-left: 1.2rem;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: content-box;
  width: 76.8rem;
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
