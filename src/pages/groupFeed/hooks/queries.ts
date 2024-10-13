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

export const groupKey = {
  all: ['group'] as const,
  info: () => [...groupKey.all, 'info'] as const,
  detail: (groupId: string) => [...groupKey.info(), 'detail', groupId] as const,
  auth: (groupId: string) => [...groupKey.info(), 'auth', groupId] as const,
  isPublic: (groupId: string) => [...groupKey.info(), 'public', groupId] as const,
  topics: (groupId: string) => [...groupKey.all, 'topic', groupId] as const,
  topic: (groupId: string) => [...groupKey.topics(groupId), 'todayTopic'] as const,
  posts: (topicId: string, groupId: string) =>
    [...groupKey.topics(groupId), 'posts', topicId] as const,
  curiousPosts: (groupId: string) => [...groupKey.info(), 'curiousPosts', groupId] as const,
  curiousWriters: (groupId: string) => [...groupKey.info(), 'curiousWriter', groupId] as const,

  user: () => [...groupKey.all, 'user'] as const,
  userName: (groupId: string) => [...groupKey.user(), 'userName', groupId] as const,
  userInfo: (writerNameId: number | undefined) =>
    [...groupKey.user(), 'userInfo', writerNameId] as const,
  userGroups: () => [...groupKey.user(), 'groups'] as const,
};
export const useGroupFeedAuth = (groupId: string): GroupFeedAuthQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupKey.auth(groupId),
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
    queryKey: groupKey.isPublic(groupId),
    queryFn: () => fetchGroupPublicStatus(groupId),
    enabled: !!groupId,
  });

  const isPublic = data?.data?.isPublic;

  return { isPublic, isLoading, isError };
};

export const useGroupInfo = (groupId: string): GroupInfoQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupKey.detail(groupId),
    queryFn: () => fetchGroupInfo(groupId),
  });

  const groupInfoData = data?.data;

  return { groupInfoData, isLoading, isError, error };
};

export const useCuriousPost = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupKey.curiousPosts(groupId),
    queryFn: () => fetchCuriousPost(groupId),
  });

  const curiousPostData = data && data.data.postList;

  return { curiousPostData, isLoading, isError, error };
};

export const useTopicList = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupKey.topics(groupId),
    queryFn: () => fetchTopicList(groupId),
  });

  const groupFeedCategoryData = data && data.data.topicList;

  return { groupFeedCategoryData, isLoading, isError, error };
};

export const useCuriousWriters = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupKey.curiousWriters(groupId),
    queryFn: () => fetchCuriousWriters(groupId),
  });

  const curiousWriterData = data && data.data.popularWriters;

  return { curiousWriterData, isLoading, isError, error };
};

export const useArticleList = (topicId: string, groupId: string) => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: groupKey.posts(topicId, groupId),
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
    queryKey: groupKey.userGroups(),
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
    queryKey: groupKey.userName(groupId),
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
    queryKey: groupKey.userInfo(writerNameId),
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
        queryKey: groupKey.userInfo(writerNameId),
      });
    },
  });

  const editMutateWriterIntro = ({ description }: { description: string | undefined }) =>
    mutate({ description });

  return { editMutateWriterIntro, isError, error };
};
