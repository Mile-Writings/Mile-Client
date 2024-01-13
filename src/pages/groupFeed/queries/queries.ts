import { useQuery } from '@tanstack/react-query';

import { fetchGroupFeedAuth } from '../apis/fetchGroupFeed';

interface GroupFeedAuthQueryResult {
  isMember: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null; //모르겟삼
}

export const GroupFeedAuthQuery = (moimId: string): GroupFeedAuthQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['groupFeed_Auth_moimId', moimId],
    queryFn: () => fetchGroupFeedAuth(moimId),
  });

  const isMember = data && data.data.isMember;

  return { isMember, isLoading, isError, error };
};
