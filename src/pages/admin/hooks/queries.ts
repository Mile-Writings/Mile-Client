import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchAdminTopic } from '../apis/fetchAdminData';
import fetchDeleteMember from '../apis/fetchDeleteMember';
import fetchMemberInfo from '../apis/fetchMemberInfo';

export const QUERY_KEY_ADMIN = {
  useMemberInfo: 'fetchMemberInfo',
  useDeleteMember: 'deleteMember',
};

export const useAdminTopic = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminTopic'],
    queryFn: () => fetchAdminTopic(),
  });

  const topicCount = data && data.data.topicCount;
  const adminTopicData = data && data.data;

  return { topicCount, adminTopicData, isLoading, isError, error };
};

// 멤버 정보 조회 get api
export const useFetchMemberInfo = (groupId: string, page: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.useMemberInfo],
    queryFn: () => fetchMemberInfo(groupId || '', page),
  });
  const totalMember = data && data.data.writerNameCount;
  const memberData = data && data.data;

  return { memberData, totalMember, isLoading, page };
};

// 멤버 삭제 api
export const useDeleteMember = (writerNameId: number) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_ADMIN.useDeleteMember, writerNameId],
    mutationFn: () => fetchDeleteMember(writerNameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ADMIN.useDeleteMember, writerNameId] });
    },
  });
  const deleteMember = () => {
    data.mutate();
  };

  return { deleteMember };
};
