import { useQuery } from '@tanstack/react-query';

import { fetchTempSaveFlag, fetchTempSaveContent } from '../apis/fetchEditorContent';

export const QUERY_KEY_POST = {
  getTempSaveFlag: 'getTempSaveFlag',
  getTempSaveContent: 'getTempSaveContent',
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

// 임시저장 글 불러오기 GET api
interface TopicField {
  topicId: string;
  topicName: string;
  isSelected: boolean;
}

interface TempSaveContentResult {
  topicList: TopicField[] | undefined;
  title: string | undefined;
  content: string | undefined;
  imageUrl: string | undefined;
  anonymous: string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTempSaveContent = (postId: string): TempSaveContentResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_POST.getTempSaveContent, postId],
    queryFn: () => fetchTempSaveContent(postId),
  });

  const topicList = data && data.data.topicList;
  const title = data && data.data.title;
  const content = data && data.data.content;
  const imageUrl = data && data.data.imageUrl;
  const anonymous = data && data.data.anonymous;

  return { topicList, title, content, imageUrl, anonymous, isLoading, isError, error };
};
