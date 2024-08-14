import { client } from '../../../utils/apis/axios';

interface DeletePostResponseType {
  status: number;
  message: string;
}
const deletePost = async (postId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const data = await client.delete<DeletePostResponseType>(`/api/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;
