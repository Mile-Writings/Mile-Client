import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import {
  fetchArticleList,
  fetchCuriousPost,
  fetchCuriousWriters,
  fetchEditIntro,
  fetchGroupFeedAuth,
  fetchGroupInfo,
  fetchTodayTopic,
  fetchTopicList,
  fetchWriterInfo,
  fetchWriterNameOnly,
} from '../apis/fetchGroupFeed';
import { fetchHeaderGroup } from '../apis/fetchHeaderGroup';

export const QUERY_KEY_GROUPFEED = {
  getGroupFeedAuth: 'getGroupFeedAuth',
  getTodayWritingStyle: 'getTodayWritingStyle',
  getCuriousPost: 'getCuriousPost',
  getGroupFeedCategory: 'getGroupFeedCategory',
  getCuriousWriters: 'getCuriousWriters',
  getArticleList: 'getArticleList',
  fetchHeaderGroup: 'fetchHeaderGroup',
  getWriterNameOnly: 'getWriterNameOnly',
  getWriterInfo: 'getWriterInfo',
};

interface GroupFeedAuthQueryResult {
  isMember: boolean | undefined;
  isOwner: boolean | undefined;
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

  const isMember = data && data?.data?.isMember;
  const isOwner = data && data?.data?.isOwner;

  return { isMember, isOwner, isLoading, isError, error };
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
  console.log(curiousPostData, 'data');

  return { curiousPostData, isLoading, isError, error };
};

export const useTopicList = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getGroupFeedCategory, groupId],
    queryFn: () => fetchTopicList(groupId),
  });

  const groupFeedCategoryData = data && data.data.topicList;

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

export const useArticleList = (topicId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getArticleList, topicId],
    queryFn: () => fetchArticleList(topicId),
    staleTime: 10000, //20초 캐시
    enabled: !!topicId,
  });

  const topicInfo = data && data.data.topicInfo;
  const postListData = data && data.data.postList;

  return { topicInfo, postListData, isLoading, isError, error };
};

export const useFetchHeaderGroup = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.fetchHeaderGroup],
    queryFn: () => fetchHeaderGroup(),
  });
  return { data };
};

export const useFetchWriterNameOnly = (groupId: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getWriterNameOnly],
    queryFn: () => fetchWriterNameOnly(groupId),
  });

  const writerName = data?.data.writerName;
  const writerNameId = data?.data.writerNameId;
  return { writerName, writerNameId };
};

//[GET] 필명 + 프로필 설명 GET
export const useFetchWriterInfo = (writerNameId: number | undefined) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getWriterInfo, writerNameId],
    queryFn: () => fetchWriterInfo(writerNameId),
    enabled: writerNameId !== undefined,
  });

  const name = data?.data.name;
  const description = data?.data.description;

  return { name, description };
};

//[PATCH] 필명 소개글 수정
export const useEditWriterIntro = (writerNameId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationKey: ['editWriterIntro'],
    mutationFn: ({ description }: { description: string }) =>
      fetchEditIntro({ writerNameId, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GROUPFEED.getWriterInfo, writerNameId],
      });
    },
  });

  const editMutateWriterIntro = ({ description }: { description: string }) =>
    mutate({ description });

  return { editMutateWriterIntro, isError, error };
};
