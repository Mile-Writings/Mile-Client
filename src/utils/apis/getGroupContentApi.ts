import { client } from './axios';

import { groupPropTypes } from '../../pages/main/types/groupContent';

interface getGroupContentResponseTypes {
  status: number;
  message: string;
  data: {
    moim: groupPropTypes[];
  };
}

const getGroupContentApi = async () => {
  try {
    const { data } = await client.get<getGroupContentResponseTypes>('/api/moim/best');
    return data.data.moim;
  } catch (error) {
    console.error(error);
  }
};

export default getGroupContentApi;
