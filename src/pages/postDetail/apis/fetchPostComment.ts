import { isAxiosError } from 'axios';

import { client } from '../../../utils/apis/axios';

interface PostCommentResponseType {
  status: number;
  message: string;
  data: null;
}

const fetchPostComment = async (postId: string, comment: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await client.post<PostCommentResponseType>(
      `/api/post/${postId}/comment`,
      {
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      if (err.response.status === 401) console.log('실행됨');
    }
  }
};

export default fetchPostComment;
