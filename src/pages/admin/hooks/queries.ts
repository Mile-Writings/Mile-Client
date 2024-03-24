import { useQuery } from '@tanstack/react-query';

import { fetchAdminTopic } from '../apis/fetchAdminData';

export const useAdminTopic = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminTopic'],
    queryFn: () => fetchAdminTopic(),
  });

  console.log(data, 'datas');

  const topicCount = data && data?.topicCount;
  console.log(topicCount, 'count');

  const adminTopicData = data && data[0];
  console.log(adminTopicData, 'adim');

  return { topicCount, adminTopicData, isLoading, isError, error };
};
