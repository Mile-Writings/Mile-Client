import { client } from '../../../utils/apis/axios';

export const getRecommendTopic = async () => {
  try {
    const { data } = await client.get('/api/recommend/topic');
    return { data: data.data };
  } catch (error) {
    console.error(error);
  }
};
