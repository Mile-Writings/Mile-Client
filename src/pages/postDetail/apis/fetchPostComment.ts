import { client } from '../../../utils/apis/axios';

interface PostCommentResponseType {
  status: number;
  message: string;
  data: null;
}

interface unAuthorizationError extends Error {
  response?: {
    data: object;
    message: string;
    status: number;
  };
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
    const unAuthorizationError = err as unAuthorizationError;
    console.log(unAuthorizationError.response?.status); // 401
  }
};

export default fetchPostComment;
