import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import checkAuthenticate from '../../../utils/checkAuthenticate';
import {
  fetchArticleList,
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

interface GroupFeedAuthQueryResult {
  isMember: boolean | undefined;
  isOwner: boolean | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useGroupFeedAuth = (groupId: string): GroupFeedAuthQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getGroupFeedAuth, groupId],
    queryFn: () => fetchGroupFeedAuth(groupId),
    enabled: !!checkAuthenticate(),
  });
  const isMember = data && data?.data?.isMember;
  const isOwner = data && data?.data?.isOwner;

  return { isMember, isOwner, isLoading, isError, error };
};

export const useGroupFeedPublicStatus = (groupId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getGroupFeedPublicStatus, groupId],
    queryFn: () => fetchGroupPublicStatus(groupId),
    enabled: !!groupId,
  });

  const isPublic = data?.data?.isPublic;

  return { isPublic, isLoading, isError };
};

export const useGroupInfo = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['groupFeed_Info_moimId', groupId],
    queryFn: () => fetchGroupInfo(groupId),
  });

  const infoResponse = data?.data.infoResponse;
  const mostCuriousPost = data?.data.mostCuriousPost;
  const mostCuriousWriter = data?.data.mostCuriousWriter;

  return { infoResponse, mostCuriousPost, mostCuriousWriter, isLoading, isError, error };
};

export const useTodayWritingStyle = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getTodayWritingStyle, groupId],
    queryFn: () => fetchTodayTopic(groupId),
  });

  const content = data && data.data.content;
  return { content, isLoading, isError, error };
};

export const useTopicList = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_GROUPFEED.getGroupFeedCategory, groupId],
    queryFn: () => fetchTopicList(groupId),
  });

  const groupFeedCategoryData = data && data.data.topicList;

  return { groupFeedCategoryData, isLoading, isError, error };
};

export const useArticleList = (topicId: string) => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY_GROUPFEED.getArticleList, topicId],
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
    queryKey: [QUERY_KEY_GROUPFEED.fetchHeaderGroup],
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
    queryKey: [QUERY_KEY_GROUPFEED.getWriterNameOnly, groupId],
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
    queryKey: [QUERY_KEY_GROUPFEED.getWriterInfo, writerNameId],
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
        queryKey: [QUERY_KEY_GROUPFEED.getWriterInfo, writerNameId],
      });
    },
  });

  const editMutateWriterIntro = ({ description }: { description: string | undefined }) =>
    mutate({ description });

  return { editMutateWriterIntro, isError, error };
};
