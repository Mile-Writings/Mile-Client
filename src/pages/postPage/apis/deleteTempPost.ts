import { client } from '../../../utils/apis/axios';

interface DeleteTempPostType {
  status: number;
  message: string;
}

export const deleteTempPost = async (postId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const data = await client.delete<DeleteTempPostType>(`/api/post/temporary/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
