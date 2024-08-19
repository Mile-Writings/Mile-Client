import { authClient } from '../../../utils/apis/axios';

interface DeleteTempPostType {
  status: number;
  message: string;
}

export const deleteTempPost = async (postId: string) => {
  try {
    const data = await authClient.delete<DeleteTempPostType>(`/api/post/temporary/${postId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
