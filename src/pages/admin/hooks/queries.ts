import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  postAdminTopic,
  fetchAdminTopic,
  postAdminTopicPropTypes,
  editAdminTopic,
  deleteAdminTopic,
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

interface editTopicPropType {
  topic: string;
  topicTag: string;
  topicDescription: string;
  topicId: string | undefined;
}

//[PUT] 관리자 페이지 글감 수정
export const useEditAdminTopic = (topicId: string | undefined) => {
  const { mutate, isError, error } = useMutation({
    mutationKey: ['adminTopic'],
    mutationFn: ({ topic, topicTag, topicDescription }: editTopicPropType) =>
      editAdminTopic({ topic, topicTag, topicDescription, topicId }),
  });

  const editMutateAdminTopic = ({ topic, topicTag, topicDescription }: editTopicPropType) =>
    mutate({ topic, topicTag, topicDescription, topicId });

  return { editMutateAdminTopic, isError, error };
};

//[DELETE] 관리자페이지 글감삭제
export const useDeleteAdminTopic = (topicId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ['adminTopic', topicId],
    mutationFn: () => deleteAdminTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminTopic', topicId],
      });
    },
  });

  const deleteMutateAdminTopic = () => {
    data.mutate();
  };
  return { deleteMutateAdminTopic };
};
