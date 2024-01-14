import { moimPostTypes } from '../components/Carousel';

import { client } from '../../../utils/apis/axios';

interface groupPropTypes {
  moimId: number;
  moimName: string;
  moimPosts: moimPostTypes[];
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
    return data.data.moim;
  } catch (error) {
    console.error(error);
  }
};
