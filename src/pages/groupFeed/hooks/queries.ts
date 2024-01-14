import { useQuery } from '@tanstack/react-query';

import { fetchGroupFeedAuth, fetchTodayWritingStyle } from '../apis/fetchGroupFeed';

export const QUERY_KEY_GROUPFEED = {
  getGroupFeedAuth: 'getGroupFeedAuth',
  getTodayWritingStyle: 'getTodayWritingStyle',
};

interface GroupFeedAuthQueryResult {
  isMember: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useGroupFeedAuth = (groupId: string): GroupFeedAuthQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getGroupFeedAuth, groupId],
    queryFn: () => fetchGroupFeedAuth(groupId),
  });

  const isMember = data && data.data.isMember;

  return { isMember, isLoading, isError, error };
};

interface WritingStyleQueryResult {
  content: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTodayWritingStyle = (groupId: string): WritingStyleQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getTodayWritingStyle, groupId],
    queryFn: () => fetchTodayWritingStyle(groupId),
  });

  const content = data && data.data.content;

  return { content, isLoading, isError, error };
};
