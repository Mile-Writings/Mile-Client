import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  editAdminTopic,
  fetchAdminTopic,
  postAdminTopic,
  postAdminTopicPropTypes,
} from '../apis/fetchAdminData';
import fetchDeleteMember from '../apis/fetchDeleteMember';
import { fetchInvitationLink } from '../apis/fetchInvitationLink';
import fetchMemberInfo from '../apis/fetchMemberInfo';

export const QUERY_KEY_ADMIN = {
  useMemberInfo: 'fetchMemberInfo',
};

export const QUERY_KEY_ADMIN = {
  fetchInvitationLink: 'fetchInvitationLink',
};

export const useAdminTopic = (groupId: string | undefined, pageNum: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminTopic', groupId, pageNum],
    queryFn: () => fetchAdminTopic(groupId, pageNum),
  });

  const topicCount = data && data.data.topicCount;
  const adminTopicData = data && data.data;

  return { topicCount, adminTopicData, isLoading, isError, error };
};

// 멤버 정보 조회 get api
export const useFetchMemberInfo = (groupId: string, page: number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.useMemberInfo, page],
    queryFn: () => fetchMemberInfo(groupId || '', page),
  });
  const totalMember = data?.data.writerNameCount;
  const memberData = data?.data;
  const memberListData = data?.data.writerNameList;
  const pageNumber = data?.data.pageNumber;

  return { memberData, memberListData, totalMember, pageNumber, isLoading, page };
};

// 멤버 삭제 api
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_ADMIN.useMemberInfo],
    mutationFn: (writerNameId: number) => fetchDeleteMember(writerNameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ADMIN.useMemberInfo] });
    },
  });
  const deleteMember = (writerNameId: number) => {
    data.mutate(writerNameId);
  };

  return { deleteMember };
};

export const useFetchInvitationLink = (groupId: string | undefined) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.fetchInvitationLink],
    queryFn: () => fetchInvitationLink(groupId || ''),
  });
  const invitationCode = data?.data;

  return { invitationCode };
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
