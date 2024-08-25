import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import checkAuthenticate from '../../../utils/checkAuthenticate';
import {
  fetchArticleList,
  fetchCuriousPost,
  fetchCuriousWriters,
  fetchEditIntro,
  fetchGroupFeedAuth,
  fetchGroupInfo,
  fetchGroupPublicStatus,
  fetchTodayTopic,
  fetchTopicList,
  fetchWriterInfo,
  fetchWriterNameOnly,
} from '../apis/fetchGroupFeed';
import { fetchHeaderGroup } from '../apis/fetchHeaderGroup';

interface GroupFeedAuthQueryResult {
  isMember: boolean | undefined;
  isOwner: boolean | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const QUERY_KEY_GROUPFEED = {
  getGroupFeedAuth: 'getGroupFeedAuth',
  getGroupFeedPublicStatus: 'getGroupFeedPublicStatus',
  getTodayWritingStyle: 'getTodayWritingStyle',
  getCuriousPost: 'getCuriousPost',
  getGroupFeedCategory: 'getGroupFeedCategory',
  getCuriousWriters: 'getCuriousWriters',
  getArticleList: 'getArticleList',
  fetchHeaderGroup: 'fetchHeaderGroup',
  getWriterNameOnly: 'getWriterNameOnly',
  getWriterInfo: 'getWriterInfo',
};

export const groupQueryKey = {
  all: ['group'],
  info: () => [...groupQueryKey.all, 'info'],
  detail: (groupId: string) => [...groupQueryKey.info(), groupId],
  auth: (groupId: string) => [...groupQueryKey.info(), 'auth', groupId],
  isPublic: (groupId: string) => [...groupQueryKey.info(), 'public', groupId],
  topics: (groupId: string) => [...groupQueryKey.all, 'topic', groupId],
  topic: (groupId: string) => [...groupQueryKey.topics(groupId), 'todayTopic'],
  posts: (topicId: string, groupId: string) => [...groupQueryKey.topics(groupId), 'posts', topicId],
  curiousPosts: (groupId: string) => [...groupQueryKey.info(), 'curiousPosts', groupId],
  curiousWriters: (groupId: string) => [...groupQueryKey.info(), 'curiousWriter', groupId],

  user: () => [...groupQueryKey.all, 'user'],
  userName: (groupId: string) => [...groupQueryKey.user(), 'userName', groupId],
  userInfo: (writerNameId: number | undefined) => [
    ...groupQueryKey.user(),
    'userInfo',
    writerNameId,
  ],
};

export const useGroupFeedAuth = (groupId: string): GroupFeedAuthQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupQueryKey.auth(groupId),
    queryFn: () => fetchGroupFeedAuth(groupId),
    enabled: !!checkAuthenticate(),
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

export const useGroupFeedPublicStatus = (groupId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: groupQueryKey.isPublic(groupId),
    queryFn: () => fetchGroupPublicStatus(groupId),
    enabled: !!groupId,
  });

  const isPublic = data?.data?.isPublic;

  return { isPublic, isLoading, isError };
};

export const useGroupInfo = (groupId: string): GroupInfoQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupQueryKey.detail(groupId),
    queryFn: () => fetchGroupInfo(groupId),
    staleTime: 30000,
    gcTime: 30000,
  });

  const groupInfoData = data?.data;

  return { groupInfoData, isLoading, isError, error };
};
//useTodayTopic
export const useTodayTopic = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupQueryKey.topic(groupId),
    queryFn: () => fetchTodayTopic(groupId),
  });

  const content = data && data.data.content;
  return { content, isLoading, isError, error };
};

export const useCuriousPost = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupQueryKey.curiousPosts(groupId),
    queryFn: () => fetchCuriousPost(groupId),
  });

  const curiousPostData = data && data.data.postList;

  return { curiousPostData, isLoading, isError, error };
};

export const useTopicList = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupQueryKey.topics(groupId),
    queryFn: () => fetchTopicList(groupId),
  });

  const groupFeedCategoryData = data && data.data.topicList;

  return { groupFeedCategoryData, isLoading, isError, error };
};

export const useCuriousWriters = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupQueryKey.curiousWriters(groupId),
    queryFn: () => fetchCuriousWriters(groupId),
  });

  const curiousWriterData = data && data.data.popularWriters;

  return { curiousWriterData, isLoading, isError, error };
};

export const useArticleList = (topicId: string, groupId: string) => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: groupQueryKey.posts(topicId, groupId),
      queryFn: ({ pageParam }) => fetchArticleList(topicId, pageParam),
      staleTime: 10000, //20초 캐시
      enabled: !!topicId,
      initialPageParam: '',
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.hasNext) {
          return lastPage?.data?.postList[lastPage?.data?.postList.length - 1]?.postId;
        }
        return undefined;
      }, //hasNext가 true일 경우, 다음 postId를 가져온다. false일경우 undefined.
    });

  const topicInfo = data?.pages[0]?.data.topicInfo;
  const postListData = data?.pages;

  return {
    data,
    topicInfo,
    postListData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  };
};

export const useFetchHeaderGroup = () => {
  const { data } = useQuery({
    queryKey: ['user', 'group'],
    queryFn: () => fetchHeaderGroup(),
    retry: 3,
  });
  return { data };
};

export const useFetchWriterNameOnly = (
  groupId: string,
  isMember: boolean | undefined,
  isOwner: boolean | undefined,
) => {
  const { data } = useQuery({
    queryKey: groupQueryKey.userName(groupId),
    queryFn: () => fetchWriterNameOnly(groupId),
    enabled: !!isMember || !!isOwner,
  });

  const writerName = data?.data.writerName;
  const writerNameId = data?.data.writerNameId;
  return { writerName, writerNameId };
};

//[GET] 필명 + 프로필 설명 GET
export const useFetchWriterInfo = (writerNameId: number | undefined) => {
  const { data } = useQuery({
    queryKey: groupQueryKey.userInfo(writerNameId),
    queryFn: () => fetchWriterInfo(writerNameId),
    enabled: writerNameId !== undefined,
  });

  const name = data?.data.name;
  const description = data?.data.description;

  return { name, description };
};

//[PATCH] 필명 소개글 수정
export const useEditWriterIntro = (writerNameId: number | undefined) => {
  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationKey: ['editWriterIntro', writerNameId],
    mutationFn: ({ description }: { description: string | undefined }) =>
      fetchEditIntro({ writerNameId, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupQueryKey.userInfo(writerNameId),
      });
    },
  });

  const editMutateWriterIntro = ({ description }: { description: string | undefined }) =>
    mutate({ description });

  return { editMutateWriterIntro, isError, error };
};
