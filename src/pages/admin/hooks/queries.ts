import { useMutation, useQuery } from '@tanstack/react-query';

import {
  postAdminTopic,
  fetchAdminTopic,
  postAdminTopicPropTypes,
  editAdminTopic,
} from '../apis/fetchAdminData';

export const useAdminTopic = (groupId: string | undefined, pageNum: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminTopic', groupId, pageNum],
    queryFn: () => fetchAdminTopic(groupId, pageNum),
  });

  const topicCount = data && data.data.topicCount;
  const adminTopicData = data && data.data;

  return { topicCount, adminTopicData, isLoading, isError, error };
};

//[POST] 관리자페이지 글감 생성
export const usePostAdminTopic = (groupId: string | undefined) => {
  const { mutate, isError, error } = useMutation({
    mutationKey: ['adminTopic'],
    mutationFn: ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
      postAdminTopic({ topic, topicTag, topicDescription, groupId }),
  });

  const postMutateAdminTopic = ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
    mutate({ topic, topicTag, topicDescription, groupId });

  return { postMutateAdminTopic, isError, error };
};

export const useEditAdminTopic = (groupId: string | undefined) => {
  const { mutate, isError, error } = useMutation({
    mutationKey: ['adminTopic'],
    mutationFn: ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
      editAdminTopic({ topic, topicTag, topicDescription, groupId }),
  });

  const editMutateAdminTopic = ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
    mutate({ topic, topicTag, topicDescription, groupId });

  return { editMutateAdminTopic, isError, error };
};
