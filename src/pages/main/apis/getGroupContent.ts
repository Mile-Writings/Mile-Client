import { dataPropTypes } from '../types/moimPost';

import { client } from '../../../utils/apis/axios';

export const getGroupContent = async () => {
  try {
    const { data } = await client.get<dataPropTypes>('/api/moim/best');
    return { data: data.data };
  } catch (error) {
    console.error(error);
  }
};
