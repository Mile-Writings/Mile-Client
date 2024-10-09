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
  const { data } = await client.get<getGroupContentResponseTypes>('/api/moim/best');
  return data.data.moim;
};

export default getGroupContentApi;
