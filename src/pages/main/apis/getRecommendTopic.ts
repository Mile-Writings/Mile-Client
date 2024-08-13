import { client } from '../../../utils/apis/axios';

export const getRecommendTopic = async () => {
  const { data } = await client.get('/api/recommend/topic');
  return { data: data.data };
};
