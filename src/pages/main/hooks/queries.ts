import { useQuery } from '@tanstack/react-query';

import { getGroupContent } from '../apis/getGroupContent';

export const QUERY_KEY_MAIN = {
  getGroupContent: 'getGroupContent',
  getRecommendTopic: 'getRecommendTopic',
};

interface moimPropTypes {
  moimId: string;
}

export const useGetGroupContent = ({ moimId }: moimPropTypes) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_MAIN.getGroupContent, moimId],
    queryFn: () => getGroupContent(),
  });

  return data;
};
