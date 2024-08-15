import { isAxiosError } from 'axios';

import { authClient } from '../../../utils/apis/axios';

interface GetCommentListResponseTypes {
  status: string;
  message: string;
  data: {
    comments: {
      commentId: string;
      name: string;
      moimName: string;
      content: string;
      isMyComment: boolean;
      isAnonymous: boolean;
      replies: ReplyResponseTypes[];
    }[];
  };
}

interface ReplyResponseTypes {
  replyId: string;
  name: string;
  moimName: string;
  content: string;
  isMyReply: boolean;
  isAnonymous: boolean;
}

const fetchCommentList = async (postId: string) => {
  try {
    const response = await authClient.get<GetCommentListResponseTypes>(
      `/api/post/${postId}/comment`,
    );
    return response.data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      if (err.response.status === 403) {
        throw new Error(err.response.data.status);
      }
    }
  }
};

export default fetchCommentList;
