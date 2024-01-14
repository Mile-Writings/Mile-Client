import { moimPropTypes } from '../components/Carousel';

import { client } from '../../../utils/apis/axios';

export interface dataPropTypes {
  moim: moimPropTypes[];
}

export const getGroupContent = async () => {
  try {
    const { data } = await client.get<dataPropTypes>('/api/moim/best');
    return { data: data.moim };
  } catch (error) {
    console.error(error);
  }
};
