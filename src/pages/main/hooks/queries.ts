import { useQuery } from '@tanstack/react-query';

import { getGroupContent } from '../apis/getGroupContent';
import { getRecommendTopic } from '../apis/getRecommendTopic';

export const QUERY_KEY_MAIN = {
  getGroupContent: 'getGroupContent',
  getRecommendTopic: 'getRecommendTopic',
};

interface moimPropTypes {
  moimId: string;
  isLoading: boolean;
  isError: boolean;
}

export const useGetGroupContent = ({ moimId }: moimPropTypes) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MAIN.getGroupContent, moimId],
    queryFn: () => getGroupContent(),
  });

  return { data, isLoading, isError };
};

interface recommendPropsTypes {
  content: string;
}

export const useGetRecommendTopic = ({ content }: recommendPropsTypes) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_MAIN.getRecommendTopic, content],
    queryFn: () => getRecommendTopic(),
  });

  return data;
};
