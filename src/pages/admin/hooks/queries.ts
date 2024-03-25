import { useQuery } from '@tanstack/react-query';

import getMemberInfo from '../apis/getMemberInfo';

export const QUERY_KEY_ADMIN = {
  useMemberInfo: 'getMemberInfo',
};

export const useGetMemberInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.useMemberInfo],
    queryFn: () => getMemberInfo(),
  });
  const totalMember = data?.writerNameCount;

  return { data, totalMember, isLoading };
};
