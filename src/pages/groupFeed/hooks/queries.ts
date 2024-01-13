import { useQuery } from '@tanstack/react-query';

import { fetchGroupFeedAuth, fetchGroupInfo } from '../apis/fetchGroupFeed';

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

interface GroupInfoQueryResult {
  groupInfoData: {
    imageUrl: string;
    moimName: string;
    ownerName: string;
    startDate: string;
    writerCount: number;
    description: string;
  };
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useGroupInfo = (groupId: string): GroupInfoQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['groupFeed_Info_moimId', groupId],
    queryFn: () => fetchGroupInfo(groupId),
  });

  const groupInfoData = data && data.data;

  return groupInfoData;
};
