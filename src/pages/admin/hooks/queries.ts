import { useMutation, useQuery } from '@tanstack/react-query';

import {
  postAdminTopic,
  fetchAdminTopic,
  postAdminTopicPropTypes,
  editAdminTopic,
} from '../apis/fetchAdminData';

export const useAdminTopic = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminTopi'],
    queryFn: () => fetchAdminTopic(),
  });

  const topicCount = data?.topicCount;
  const adminTopicData = data;
  console.log(data, topicCount);

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

export const useEditAdminTopic = () => {
  const { mutate, isError, error } = useMutation({
    mutationKey: ['adminTopic'],
    mutationFn: ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
      editAdminTopic({ topic, topicTag, topicDescription }),
  });

  const editMutateAdminTopic = ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
    mutate({ topic, topicTag, topicDescription });

  return { editMutateAdminTopic, isError, error };
};
