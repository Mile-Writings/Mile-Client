import { useQuery } from '@tanstack/react-query';

import { fetchGroupFeedAuth } from '../apis/fetchGroupFeed';

interface GroupFeedAuthQueryResult {
  isMember: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useGroupFeedAuth = (groupId: string): GroupFeedAuthQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['groupFeed_Auth_moimId', groupId],
    queryFn: () => fetchGroupFeedAuth(groupId),
  });

  const isMember = data && data.data.isMember;

  return { isMember, isLoading, isError, error };
};
