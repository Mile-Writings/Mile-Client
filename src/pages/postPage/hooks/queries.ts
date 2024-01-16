import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchTopic } from '../apis/fetchEditorContent';
import { postContent, PostContentRequestTypes } from '../apis/postContent';

export const QUERY_KEY_POST = {
  postContent: 'postContent',
  getTopic: 'getTopic',
};

// 글 작성하기
export const usePostContent = ({
  moimId,
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
}: PostContentRequestTypes) => {
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST.postContent],
    mutationFn: () => postContent({ moimId, topicId, title, content, imageUrl, anonymous }),
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
