import { groupPostTypes } from '../components/Carousel';

import { client } from '../../../utils/apis/axios';

export interface groupPropTypes {
  moimId: string;
  moimName: string;
  moimPosts: groupPostTypes[];
}

interface getGroupContentResponseTypes {
  status: number;
  message: string;
  data: {
    moim: groupPropTypes[];
  };
}

export const getGroupContent = async () => {
  try {
    const { data } = await client.get<getGroupContentResponseTypes>('/api/moim/best');
    console.log(data.data.moim);
    return data.data.moim;
  } catch (error) {
    console.error(error);
  }
};
