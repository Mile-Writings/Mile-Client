import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import checkAuthenticate from '../../../utils/checkAuthenticate';
import {
  fetchArticleList,
  fetchEditIntro,
  fetchGroupFeedAuth,
  fetchGroupInfo,
  fetchGroupPublicStatus,
  fetchTopicList,
  fetchWriterInfo,
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
  posts: (topicId: string, groupId: string) =>
    [...groupKey.topics(groupId), 'posts', topicId] as const,
  user: () => [...groupKey.all, 'user'] as const,
  userInfo: (groupId: string | undefined) => [...groupKey.user(), 'userInfo', groupId] as const,
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

export const useGroupFeedPublicStatus = (groupId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: groupKey.isPublic(groupId),
    queryFn: () => fetchGroupPublicStatus(groupId),
    enabled: !!groupId,
  });

  const isPublic = data?.data?.isPublic;

  return { isPublic, isLoading, isError };
};

export const useGroupInfo = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupKey.detail(groupId),
    queryFn: () => fetchGroupInfo(groupId),
  });

  const groupInfo = data?.data.groupInfo;
  const mostCuriousPost = data?.data.mostCuriousPost.postList;
  const mostCuriousWriter = data?.data.mostCuriousWriter.popularWriters;

  return { groupInfo, mostCuriousPost, mostCuriousWriter, isLoading, isError, error };
};

export const useTopicList = (groupId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: groupKey.topics(groupId),
    queryFn: () => fetchTopicList(groupId),
  });

  const groupFeedCategoryData = data && data.data.topicList;

  return { groupFeedCategoryData, isLoading, isError, error };
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

export const useFetchWriterInfo = (
  groupId: string,
  isMember: boolean | undefined,
  isOwner: boolean | undefined,
) => {
  const { data } = useQuery({
    queryKey: groupKey.userInfo(groupId),
    queryFn: () => fetchWriterInfo(groupId),
    enabled: !!isMember || !!isOwner,
  });
  console.log(data, 'data');
  const writerName = data?.data.writerName;
  const writerNameId = data?.data.writerNameId;
  const writerDescription = data?.data.description;
  return { writerName, writerNameId, writerDescription };
};

//[PATCH] 필명 소개글 수정
export const useEditWriterIntro = (writerNameId: number | undefined, groupId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationKey: ['editWriterIntro', writerNameId],
    mutationFn: ({ description }: { description: string | undefined }) =>
      fetchEditIntro({ writerNameId, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupKey.userInfo(groupId),
      });
    },
  });

  const editMutateWriterIntro = ({ description }: { description: string | undefined }) =>
    mutate({ description });

  return { editMutateWriterIntro, isError, error };
};
