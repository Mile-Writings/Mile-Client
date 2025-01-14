import styled from '@emotion/styled';

import CommentInputBox from './CommentInputBox';
import CommentItem from './CommentItem';

import { useGetCommentList } from '../hooks/queries';

import { ArrowTopLeftIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import noCommentImg from '/src/assets/images/noCommentImage.png';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

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
          <img src={noCommentImg} alt="댓글없음 이미지" />
        </>
      ) : (
        commentListData?.map((data: CommentListPropTypes) => (
          <CommentListWrapper key={data.commentId}>
            <CommentItem
              name={data.name}
              moimName={data.moimName}
              content={data.content}
              isMyComment={data.isMyComment}
              postId={postId}
              commentId={data.commentId}
              isAnonymous={data.isAnonymous}
              isNested={false}
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
                    isNested={true}
                    type="nestedComment"
                  />
                </NestedWrapper>
              ))}
          </CommentListWrapper>
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    padding: 1.6rem;
  }
`;

const NoCommentText = styled.p`
  margin-bottom: 3rem;

  color: ${({ theme }) => theme.colors.gray50};

  ${({ theme }) => theme.fonts.title8};
`;

const CommentListWrapper = styled.div`
  width: 100%;
`;
