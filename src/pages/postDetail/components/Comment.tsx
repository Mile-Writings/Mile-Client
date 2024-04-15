import styled from '@emotion/styled';
import { useState } from 'react';

import CommentInputBox from './CommentInputBox';
import CommentItem from './CommentItem';

import { useGetCommentList } from '../hooks/queries';

import { EditorCatIc, ArrowTopLeftIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface CommentPropTypes {
  postId: string | undefined;
}

const Comment = (props: CommentPropTypes) => {
  const { postId } = props;

  const { commentListData, error } = useGetCommentList(postId || '');
  const [recentCommentIndex, setRecentCommentIndex] = useState<number | null>(null);

  interface CommentListPropTypes {
    commentId: string;
    name: string;
    moimName: string;
    content: string;
    isMyComment: boolean;
    replies?: ReplyResponseTypes[] | undefined;
  }

  interface ReplyResponseTypes {
    replyId: string;
    name: string;
    moimName: string;
    content: string;
    isMyReply: boolean;
  }

  const handleRecentCommentIndex = () => {
    commentListData ? setRecentCommentIndex(commentListData.length) : setRecentCommentIndex(0);
    console.log(commentListData, '데이터');
    console.log(recentCommentIndex, 'index');

    // 3초 후에 보라색 하이라이트를 비활성화
    // setTimeout(() => {
    //   setRecentCommentIndex(null);
    // }, 3000);
  };

  return error?.message == '403' ? (
    <div></div>
  ) : (
    <CommentWrapper>
      <CommentInputBox
        postId={postId}
        isMainComment={true}
        handleRecentCommentIndex={handleRecentCommentIndex}
      />
      <Spacing marginBottom="2" />
      {commentListData?.length == 0 ? (
        <>
          <Spacing marginBottom="4" />
          <NoCommentText>아직 댓글이 없어요</NoCommentText>
          <EditorCatIc />
        </>
      ) : (
        commentListData?.map((data: CommentListPropTypes, commentIndex) => (
          <>
            <CommentItem
              key={data.commentId}
              name={data.name}
              moimName={data.moimName}
              content={data.content}
              isMyComment={data.isMyComment}
              postId={postId}
              commentId={data.commentId}
              type="comment"
              isHighlighted={recentCommentIndex === commentIndex}
            ></CommentItem>
            {data.replies &&
              data.replies.map((nestedData: ReplyResponseTypes, replyIndex) => (
                <NestedWrapper key={nestedData.replyId}>
                  <ArrowTopLeftIc />
                  <CommentItem
                    name={nestedData.name}
                    moimName={nestedData.moimName}
                    content={nestedData.content}
                    isMyReply={nestedData.isMyReply}
                    postId={postId}
                    commentId={nestedData.replyId}
                    type="nestedComment"
                    isHighlighted={
                      data &&
                      data.replies &&
                      data.replies.length > 0 &&
                      replyIndex === data.replies.length - 1
                    }
                  ></CommentItem>
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
