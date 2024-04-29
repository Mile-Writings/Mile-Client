import { isAxiosError } from 'axios';

import { devClient } from '../../../utils/apis/axios';

//for pr

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
    const token = localStorage.getItem('accessToken');

    const response = await devClient.get<GetCommentListResponseTypes>(
      `/api/post/${postId}/comment`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data, 'data');
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
