import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getRecommendTopic } from '../apis/getRecommendTopic';

import getGroupContentApi from '../../../utils/apis/getGroupContentApi';

export const QUERY_KEY_MAIN = {
  getGroupContent: 'getGroupContent',
  getRecommendTopic: 'getRecommendTopic',
};

export const useGetGroupContent = (moimId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY_MAIN.getGroupContent, moimId],
    queryFn: () => getGroupContentApi(),
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
