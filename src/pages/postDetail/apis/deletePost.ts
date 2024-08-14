import { authClient } from '../../../utils/apis/axios';

interface DeletePostResponseType {
  status: number;
  message: string;
}
const deletePost = async (postId: string) => {
  try {
    const data = await authClient.delete<DeletePostResponseType>(`/api/post/${postId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;
