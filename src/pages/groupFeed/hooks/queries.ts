import { useQuery } from '@tanstack/react-query';

import {
  fetchCuriousPost,
  fetchCuriousWriters,
  fetchGroupFeedAuth,
  fetchGroupInfo,
  fetchTodayTopic,
  fetchTopicList,
} from '../apis/fetchGroupFeed';

export const QUERY_KEY_GROUPFEED = {
  getGroupFeedAuth: 'getGroupFeedAuth',
  getTodayWritingStyle: 'getTodayWritingStyle',
  getCuriousPost: 'getCuriousPost',
  getGroupFeedCategory: 'getGroupFeedCategory',
  getCuriousWriters: 'getCuriousWriters',
};

interface GroupFeedAuthQueryResult {
  isMember: boolean | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useGroupFeedAuth = (
  groupId: string,
  accessToken: string | null,
): GroupFeedAuthQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getGroupFeedAuth, groupId],
    queryFn: () => fetchGroupFeedAuth(groupId),
    enabled: !!accessToken,
  });

  const isMember = data && data.data.isMember;

  return { isMember, isLoading, isError, error };
};

interface GroupInfoQueryResult {
  groupInfoData?: {
    imageUrl: string;
    moimName: string;
    ownerName: string;
    startDate: string;
    writerCount: number;
    description: string | undefined;
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

  const groupInfoData = data?.data;

  return { groupInfoData, isLoading, isError, error };
};

export const useTodayWritingStyle = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getTodayWritingStyle, groupId],
    queryFn: () => fetchTodayTopic(groupId),
  });

  const content = data && data.data.content;
  return { content, isLoading, isError, error };
};

export const useCuriousPost = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getCuriousPost, groupId],
    queryFn: () => fetchCuriousPost(groupId),
  });

  const curiousPostData = data && data.data.postList;

  return { curiousPostData, isLoading, isError, error };
};

export const useTopicList = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getGroupFeedCategory, groupId],
    queryFn: () => fetchTopicList(groupId),
  });

  const groupFeedCategoryData = data && data.data.topicList;
  console.log(groupFeedCategoryData, 'feedCategory');

  return { groupFeedCategoryData, isLoading, isError, error };
};

export const useCuriousWriters = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getCuriousWriters, groupId],
    queryFn: () => fetchCuriousWriters(groupId),
  });

  const curiousWriterData = data && data.data.popularWriters;

  return { curiousWriterData, isLoading, isError, error };
};
