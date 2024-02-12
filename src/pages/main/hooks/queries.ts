import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getGroupContent } from '../apis/getGroupContent';
import { getRecommendTopic } from '../apis/getRecommendTopic';

export const QUERY_KEY_MAIN = {
  getGroupContent: 'getGroupContent',
  getRecommendTopic: 'getRecommendTopic',
};

export const useGetGroupContent = (moimId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY_MAIN.getGroupContent, moimId],
    queryFn: () => getGroupContent(),
  });

  return { data };
};

export const useGetRecommendTopic = (content: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_MAIN.getRecommendTopic, content],
    queryFn: () => getRecommendTopic(),
  });

  return data;
};
