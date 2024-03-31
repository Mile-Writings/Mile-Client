import { useMutation, useQuery } from '@tanstack/react-query';

import { postAdminTopic, fetchAdminTopic } from '../apis/fetchAdminData';

export const useAdminTopic = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminTopic'],
    queryFn: () => fetchAdminTopic(),
  });

  const topicCount = data && data.data.topicCount;
  const adminTopicData = data && data.data;

  return { topicCount, adminTopicData, isLoading, isError, error };
};

export const usePostAdminTopic = () => {
  const { mutate, isError, error } = useMutation({
    mutationKey: ['adminTopic'],
    mutationFn: () => postAdminTopic(),
  });

  const post1AdminTopic = () => mutate();

  return { post1AdminTopic, isError, error };
};
