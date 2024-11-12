import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import createPostContent from '../apis/createPostContent';
import createTempSaveContent from '../apis/createTempSaveContent';
import { deleteTempPost } from '../apis/deleteTempPost';
import editPutContent from '../apis/editPutContent';
import { fetchPresignedUrl } from '../apis/fetchPresignedUrl';
import { fetchTempSaveContent } from '../apis/fetchTempSaveContent';
import { fetchTempSaveFlag } from '../apis/fetchTempSaveFlag';
import { fetchTopic } from '../apis/fetchTopic';
import saveTempSavecontent from '../apis/saveTempSaveContent';
import { fetchEditPostContent } from '../apis/fetchEditPostContent';

import { isAxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { LONG_COMMENT_ERROR, NO_COMMENT_ERROR } from '../../../constants/commentErrorMessage';
import { QUERY_KEY_POST_DETAIL } from '../../postDetail/hooks/queries';
export const QUERY_KEY_POST = {
  postContent: 'postContent',
  getTopic: 'getTopic',
  getTempSaveFlag: 'getTempSaveFlag',
  getPresignedUrl: 'getPresignedUrl',
  getEditPostContent: 'getEditPostContent',
  putEditContent: 'putEditContent',
  postSaveTempContent: 'postSaveTempContent',
  getTempSaveContent: 'getTempSaveContent',
  putSaveTempContent: 'putSaveTempContent',
  deleteTempPost: 'deleteTempPost',
};

// 글 최초 저장
interface postContentType {
  groupId: string;
  topicId: string;
  title: string;
  content: string;
  anonymous: boolean;
  // eslint-disable-next-line no-unused-vars
  modalOpen: () => void;
  setPostContentId: Dispatch<SetStateAction<string>>;
}

export const usePostContent = ({
  groupId,
  topicId,
  title,
  content,
  anonymous,
  modalOpen,
  setPostContentId,
}: postContentType) => {
  const { mutate, data: postContentId } = useMutation({
    mutationKey: [
      QUERY_KEY_POST.postContent,
      {
        groupId,
        topicId,
        title,
        content,
        anonymous,
      },
    ],
    mutationFn: (imageUrl: string) =>
      createPostContent({
        groupId,
        topicId,
        title,
        content,
        imageUrl,
        anonymous,
      }),
    onSuccess: (data) => {
      if (data) {
        setPostContentId(data);
        modalOpen();
      } else {
        throw new Error('Data를 받아오지 못했습니다.');
      }
    },
  });

  return { mutate, postContentId };
};

export const useGetTopic = (groupId: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_POST.getTopic, groupId],
    queryFn: () => fetchTopic(groupId),
  });
  const topics = data && data?.data?.topics;
  return { topics };
};

// 임시저장 여부 확인 GET api
interface TempSaveFlagQueryResult {
  isTemporaryPostExist: boolean | undefined;
  tempPostId: string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTempSaveFlag = (groupId: string, isPostView: boolean): TempSaveFlagQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_POST.getTempSaveFlag, groupId, isPostView],
    queryFn: () => fetchTempSaveFlag(groupId),
    enabled: !!isPostView,
  });

  const isTemporaryPostExist = data && data?.data?.isTemporaryPostExist;
  const tempPostId = data && data?.data?.postId;

  return { isTemporaryPostExist, tempPostId, isLoading, isError, error };
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
    staleTime: 6000,
    gcTime: 6000,
  });

  const fileName = data && data?.data?.fileName;
  const url = data && data?.data?.url;
  return { fileName, url };
};

// 글 수정시 글 조회 GET
export const useGetEditPostContent = (postId: string, isEditView: boolean) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_POST.getEditPostContent, postId, isEditView],
    queryFn: () => fetchEditPostContent(postId),
    enabled: !!isEditView,
  });

  const editPostTopicList = data && data?.data?.topicList;
  const editPostTitle = data && data?.data?.title;
  const editPostContent = data && data?.data?.content;
  const editPostImageUrl = data && data?.data?.imageUrl;
  const editPostAnonymous = data && data?.data?.anonymous;

  return { editPostTopicList, editPostTitle, editPostContent, editPostImageUrl, editPostAnonymous };
};

// 글 수정하기 Put
interface putEditContentType {
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
  postId: string;
  contentWithoutTag: string;
  setPostErrorMessage: (errorMessage: string) => void;
}

export const usePutEditContent = ({
  topicId,
  title,
  content,
  anonymous,
  postId,
  contentWithoutTag,
  setPostErrorMessage,
}: putEditContentType) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [
      QUERY_KEY_POST.putEditContent,
      {
        topicId,
        title,
        content,
        anonymous,
        postId,
        contentWithoutTag,
        setPostErrorMessage,
      },
    ],
    mutationFn: (imageUrl: string) =>
      editPutContent({
        topicId,
        title,
        content,
        imageUrl,
        anonymous,
        postId,
        contentWithoutTag,
        setPostErrorMessage,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.getPostDetail, postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST.getEditPostContent, postId] });
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
  anonymous: boolean;
  isPostView: boolean;
}

export const usePostTempSaveContent = ({
  groupId,
  topicId,
  title,
  content,
  anonymous,
  isPostView,
}: postTempSaveType) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const data = useMutation({
    mutationKey: [
      QUERY_KEY_POST.postSaveTempContent,
      {
        groupId,
        topicId,
        title,
        content,

        anonymous,
        isPostView,
      },
    ],
    mutationFn: (imageUrl: string) =>
      createTempSaveContent({ groupId, topicId, title, content, imageUrl, anonymous }),
    onSuccess: () => {
      navigate(`/group/${groupId}`);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POST.getTempSaveFlag, groupId, isPostView],
      });
    },
  });
  return data;
};

// 임시저장 불러오기 GET
export const useGetTempSaveContent = (postId: string, isTempClicked: boolean) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_POST.getTempSaveContent, postId],
    queryFn: () => fetchTempSaveContent(postId),
    enabled: !!isTempClicked && postId !== 'MA==',
  });

  const tempTopicList = data && data?.data?.topicList;
  const tempTitle = data && data?.data?.title;
  const tempContent = data && data?.data?.content;
  const tempImageUrl = data && data?.data?.imageUrl;
  const tempAnonymous = data && data?.data?.anonymous;

  return { tempTopicList, tempTitle, tempContent, tempImageUrl, tempAnonymous };
};

// 임시저장 저장하기
interface putTempSaveContentType {
  topicId: string;
  title: string;
  content: string;
  anonymous: boolean;
  postId: string;
  groupId: string;
}

export const usePutTempSaveContent = ({
  topicId,
  title,
  content,
  anonymous,
  postId,
  groupId,
}: putTempSaveContentType) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [
      QUERY_KEY_POST.putSaveTempContent,
      {
        topicId,
        title,
        content,
        anonymous,
      },
    ],
    mutationFn: (imageUrl: string) =>
      saveTempSavecontent({ topicId, title, content, imageUrl, anonymous, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.getPostDetail, postId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST.getTempSaveFlag, groupId] });
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        const errorCode = err.response?.data.status;
        if (errorCode === 40005) {
          alert(NO_COMMENT_ERROR);
        } else if (errorCode === 40006) {
          alert(LONG_COMMENT_ERROR);
        } else {
          console.error();
        }
      }
    },
  });
  return data;
};

// 임시저장 삭제하기
export const useDeleteTempPost = (postId: string, groupId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST.deleteTempPost, postId, groupId],
    mutationFn: () => deleteTempPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST.getTempSaveFlag, groupId] });
    },
  });
  return data;
};
