import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import fetchDeleteMember from '../apis/fetchDeleteMember';
import getMemberInfo from '../apis/getMemberInfo';

export const QUERY_KEY_ADMIN = {
  useMemberInfo: 'getMemberInfo',
  useDeleteMember: 'deleteMember',
};

// 멤버 정보 조회 get api
export const useGetMemberInfo = (moimId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.useMemberInfo],
    queryFn: () => getMemberInfo(moimId),
  });
  const totalMember = data?.writerNameCount;

  return { data, totalMember, isLoading };
};

// 멤버 삭제 api
export const useDeleteMember = (writerNameId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_ADMIN.useDeleteMember],
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
