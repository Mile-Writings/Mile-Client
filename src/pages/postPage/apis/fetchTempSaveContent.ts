import { client } from '../../../utils/apis/axios';

export const fetchTempSaveContent = async (postId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get(`api/post/temporary/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
