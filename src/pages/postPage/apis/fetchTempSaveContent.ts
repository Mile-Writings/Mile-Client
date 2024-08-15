import { authClient } from '../../../utils/apis/axios';

export const fetchTempSaveContent = async (postId: string) => {
  try {
    const response = await authClient.get(`api/post/temporary/${postId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
