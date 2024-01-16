import { useMutation } from '@tanstack/react-query';

import { postContent, PostContentRequestTypes } from '../apis/postContent';

export const QUERY_KEY_POST = {
  postContent: 'postContent',
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
