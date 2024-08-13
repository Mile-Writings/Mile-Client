import { isAxiosError } from 'axios';

import { authClient } from '../../../utils/apis/axios';

interface GetCuriousInfoResponseTypes {
  status: string;
  message: string;
  data: {
    isCurious: boolean;
    curiousCount: number;
  };
}

const fetchCuriousInfo = async (postId: string) => {
  try {
    const { data } = await authClient.get<GetCuriousInfoResponseTypes>(
      `/api/post/${postId}/info/curious`,
    );
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      if (err.response.status === 403) {
        throw new Error(err.response.data.status);
      }
    }
    console.log(err);
  }
};

export default fetchCuriousInfo;
