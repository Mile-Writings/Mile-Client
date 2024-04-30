import { devClient } from '../../../utils/apis/axios';

interface PostCommentResponseType {
  status: number;
  message: string;
}

const fetchPostNestedComment = async (commentId: string, comment: string, isAnonymous: boolean) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await devClient.post<PostCommentResponseType>(
      `/api/comment/${commentId}`,
      {
        content: comment,
        isAnonymous: isAnonymous,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data, 'data');
    return response.data;
  } catch (err) {
    console.error();
  }
};

export default fetchPostNestedComment;
