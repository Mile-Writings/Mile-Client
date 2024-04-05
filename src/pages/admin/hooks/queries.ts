import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import fetchDeleteMember from '../apis/fetchDeleteMember';
import fetchMemberInfo from '../apis/getMemberInfo';

export const QUERY_KEY_ADMIN = {
  useMemberInfo: 'fetchMemberInfo',
  useDeleteMember: 'deleteMember',
};

// 멤버 정보 조회 get api
export const useFetchMemberInfo = (moimId: string) => {
  const [searchParams] = useSearchParams();
  const params = parseInt(searchParams.get('page') || '');
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.useMemberInfo],
    queryFn: () => fetchMemberInfo(moimId, params),
  });
  const totalMember = data?.writerNameCount;

  return { data, totalMember, isLoading, params };
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
