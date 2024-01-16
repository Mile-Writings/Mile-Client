import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchTopic } from '../apis/fetchEditorContent';
import { fetchPresignedUrl } from '../apis/fetchPresignedUrl';
import { fetchTempSaveFlag } from '../apis/fetchTempSaveFlag';
import { postContent, PostContentRequestTypes } from '../apis/postContent';

export const QUERY_KEY_POST = {
  postContent: 'postContent',
  getTopic: 'getTopic',
  getTempSaveFlag: 'getTempSaveFlag',
  getPresignedUrl: 'getPresignedUrl',
};

// 글 작성하기
export const usePostContent = ({
  groupId,
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
}: PostContentRequestTypes) => {
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST.postContent],
    mutationFn: () => postContent({ groupId, topicId, title, content, imageUrl, anonymous }),
    onSuccess: () => {
      console.log('post content success');
    },
  });
  return data;
};

// 에디터 상단 글감 조회
interface Topics {
  topicId: string | undefined;
  topicName: string | undefined;
}
interface GetTopicQueryResult {
  topics: Topics[] | undefined;
}

export const useGetTopic = (groupId: string): GetTopicQueryResult => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_POST.getTopic, groupId],
    queryFn: () => fetchTopic(groupId),
  });
  const topics = data && data.data.topics;

  return { topics };
};

// 임시저장 여부 확인 GET api
interface TempSaveFlagQueryResult {
  isTemporaryPostExist: boolean | undefined;
  postId: string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTempSaveFlag = (groupId: string): TempSaveFlagQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_POST.getTempSaveFlag, groupId],
    queryFn: () => fetchTempSaveFlag(groupId),
  });

  const isTemporaryPostExist = data && data.data.isTemporaryPostExist;
  const postId = data && data.data.postId;

  return { isTemporaryPostExist, postId, isLoading, isError, error };
};

// 이미지 저장 url GET api
interface PresignedUrlQueryResult {
  fileName: string | undefined;
  url: string | undefined;
}

export const usePresignedUrl = (): PresignedUrlQueryResult => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_POST.getPresignedUrl],
    queryFn: () => fetchPresignedUrl(),
  });

  const fileName = data && data.data.fileName;
  const url = data && data.data.url;

  return { fileName, url };
};
