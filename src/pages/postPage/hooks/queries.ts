import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import createPostContent from '../apis/createPostContent';
import createTempSaveContent from '../apis/createTempSaveContent';
import editPutContent from '../apis/editPutContent';
import { fetchTopic } from '../apis/fetchEditorContent';
import { fetchPresignedUrl } from '../apis/fetchPresignedUrl';
import { fetchTempSaveContent } from '../apis/fetchTempSaveContent';
import { fetchTempSaveFlag } from '../apis/fetchTempSaveFlag';

import { QUERY_KEY_POST_DETAIL } from '../../postDetail/hooks/queries';

export const QUERY_KEY_POST = {
  postContent: 'postContent',
  getTopic: 'getTopic',
  getTempSaveFlag: 'getTempSaveFlag',
  getPresignedUrl: 'getPresignedUrl',
  putEditContent: 'putEditContent',
  postSaveTempContent: 'postSaveTempContent',
  getTempSaveContent: 'getTempSaveContent',
};

// 글 최초 저장
interface postContentType {
  groupId: string;
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
}

export const usePostContent = ({
  groupId,
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
}: postContentType) => {
  const navigate = useNavigate();
  const { mutate, data } = useMutation({
    mutationKey: [
      QUERY_KEY_POST.postContent,
      {
        groupId,
        topicId,
        title,
        content,
        imageUrl,
        anonymous,
      },
    ],
    mutationFn: () => createPostContent({ groupId, topicId, title, content, imageUrl, anonymous }),
    onSuccess: (postData) => {
      navigate(`/detail/${groupId}/${postData}`);
    },
  });

  return { mutate, data };
};
// 에디터 상단 글감 조회
// response 타입 리펙토링 ...........
// interface Topics {
//   topicId: string | undefined;
//   topicName: string | undefined;
// }
// interface GetTopicQueryResult {
//   topics: Topics[] | undefined;
// }

export const useGetTopic = (groupId: string) => {
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

// 글 수정하기 Put
interface putEditContentType {
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
  postId: string;
}

export const usePutEditContent = ({
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
  postId,
}: putEditContentType) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [
      QUERY_KEY_POST.putEditContent,
      {
        topicId,
        title,
        content,
        imageUrl,
        anonymous,
        postId,
      },
    ],
    mutationFn: () => editPutContent({ topicId, title, content, imageUrl, anonymous, postId }),
    onSuccess: () => {
      console.log({ topicId, title, content, imageUrl, anonymous });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.getPostDetail, postId] });
    },
  });
  return data;
};

// 임시저장 POST
interface postTempSaveType {
  groupId: string;
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
}

export const usePostTempSaveContent = ({
  groupId,
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
}: postTempSaveType) => {
  const data = useMutation({
    mutationKey: [
      QUERY_KEY_POST.postSaveTempContent,
      {
        groupId,
        topicId,
        title,
        content,
        imageUrl,
        anonymous,
      },
    ],
    mutationFn: () =>
      createTempSaveContent({ groupId, topicId, title, content, imageUrl, anonymous }),
    onSuccess: () => {
      console.log({ groupId, topicId, title, content, imageUrl, anonymous });
    },
  });
  return data;
};

// 임시저장 불러오기 GET
export const useGetTempSaveContent = (postId: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_POST.getTempSaveContent, postId],
    queryFn: () => fetchTempSaveContent(postId),
  });

  const topicList = data && data.data.topicList;
  const title = data && data.data.title;
  const content = data && data.data.content;
  const imageUrl = data && data.data.imageUrl;
  const anonymous = data && data.data.anonymous;

  return { topicList, title, content, imageUrl, anonymous };
};
