import { useQuery } from '@tanstack/react-query';

import getGroupContentApi from '../apis/getGroupContentApi';
import { getRecommendTopic } from '../apis/getRecommendTopic';

export const QUERY_KEY_MAIN = {
  getGroupContent: 'getGroupContent',
  getRecommendTopic: 'getRecommendTopic',
};

export const useGetGroupContent = (moimId: string) => {
  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY_MAIN.getGroupContent, moimId],
    queryFn: () => getGroupContentApi(),
  });

  const groupLength = data?.length;

  return { data, isFetching, isLoading, groupLength, error };
};

export const useGetRecommendTopic = () => {
  const { data, error } = useQuery({
    queryKey: [QUERY_KEY_MAIN.getRecommendTopic],
    queryFn: () => getRecommendTopic(),
  });

  return { data, error };
};
