import { groupPropTypes } from '../types/groupContent';

import { client } from '../../../utils/apis/axios';

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
    console.log(data, 'data');
    return data.data.moim;
  } catch (error) {
    console.error(error);
  }
};

export default getGroupContentApi;
