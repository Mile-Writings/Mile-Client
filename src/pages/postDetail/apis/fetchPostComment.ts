import { client } from '../../../utils/apis/axios';

interface PostCommentResponseType {
  status: number;
  message: string;
  data: null;
}

const fetchPostComment = async (postId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await client.post<PostCommentResponseType>(`/api/post/${postId}/comment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPostComment;
