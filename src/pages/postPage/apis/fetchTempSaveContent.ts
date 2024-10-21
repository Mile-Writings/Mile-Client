import { authClient } from '../../../utils/apis/axios';

export const fetchTempSaveContent = async (postId: string) => {
  try {
    const response = await authClient.get(`api/post/temporary/${postId}`);
    return response.data;

    return;
  } catch (err) {
    console.log(err);
  }
};
