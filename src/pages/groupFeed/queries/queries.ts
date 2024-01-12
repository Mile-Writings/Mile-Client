import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchGroupFeedAuth } from '../apis/fetchGroupFeed';

interface GroupFeedAuthQueryResult {
  isMember: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null; //모르겟삼
}

export const GroupFeedAuthQuery = (): GroupFeedAuthQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['groupFeed_Auth_moimId'],
    queryFn: fetchGroupFeedAuth,
  });
  const [isMember, setIsMember] = useState<boolean>(false);
  if (!isLoading && !isError) {
    setIsMember(data.isMember);
  }

  return { isMember, isLoading, isError, error };
};
