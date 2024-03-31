import { useMutation, useQuery } from '@tanstack/react-query';

import { postAdminTopic, fetchAdminTopic, postAdminTopicPropTypes } from '../apis/fetchAdminData';

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
    mutationFn: ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
      postAdminTopic({ topic, topicTag, topicDescription }),
  });

  const post1AdminTopic = ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
    mutate({ topic, topicTag, topicDescription });

  return { post1AdminTopic, isError, error };
};
