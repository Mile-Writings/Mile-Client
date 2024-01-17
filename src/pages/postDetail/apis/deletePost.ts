import { client } from '../../../utils/apis/axios';

interface DeletePostResponseType {
  status: number;
  message: string;
}
const deletePost = (postId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const data = client.delete<DeletePostResponseType>(`/api/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;
