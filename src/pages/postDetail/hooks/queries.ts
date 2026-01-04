//한 파일에서 사용하는 쿼리키를 모아두고 쿼리를 선언해주세요
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { isAxiosError } from 'axios';
import { LONG_COMMENT_ERROR, NO_COMMENT_ERROR } from '../../../constants/commentErrorMessage';
import { ERROR_MESSAGE } from '../../../constants/errorText';
import checkPostAuth from '../apis/checkPostAuth';
import createPostCurious from '../apis/createPostCurious';
import deleteCurious from '../apis/deleteCurious';
import deletePost from '../apis/deletePost';
import fetchCommentList from '../apis/fetchCommentList';
import fetchCuriousInfo from '../apis/fetchCuriousInfo';
import fetchDeleteComment from '../apis/fetchDeleteComment';
import fetchDeleteNestedComment from '../apis/fetchDeleteNestedComment';
import fetchPostComment from '../apis/fetchPostComment';
import fetchPostDetail from '../apis/fetchPostDetail';
import fetchPostNestedComment from '../apis/fetchPostNestedComment';

import { groupKey } from '../../groupFeed/hooks/queries';
//쿼리키를 이렇게 두는 이유는 겹치지 않기위해 + 객체로 생성하여 자동완성 하기 위해
export const QUERY_KEY_POST_DETAIL = {
  getPostDetail: 'getPostDetail',
  postCurious: 'postCurious',
  deleteCurious: 'deleteCurious',
  deletePost: 'deletePost',
  postComment: 'postComment',
  getCommentList: 'getCommentList',
  deleteComment: 'deleteComment',
  getAuthorization: 'getAuthorization',
  curious: 'curious',
  postNestedComment: 'postNestedComment',
};

export interface postCuriousProps {
  status: number;
  message: string;
  data: {
    isCurious: boolean;
    curiousCount: number;
  };
}

// 글정보 조회 get api
export const useGetPostDetail = (postId: string) => {
  const data = useQuery({
    queryKey: [QUERY_KEY_POST_DETAIL.getPostDetail, postId],
    queryFn: () => fetchPostDetail(postId),
  });

  return data;
};

//궁금해요 여부개수 get api
export const useGetCuriousInfo = (postId: string) => {
  const { data, error } = useQuery({
    queryKey: [QUERY_KEY_POST_DETAIL.curious, postId],
    queryFn: () => fetchCuriousInfo(postId),
    retry: false,
  });
  return { data, error };
};

//궁금해요 생성 api
export const usePostCurious = (postId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.postCurious, postId],
    mutationFn: () => createPostCurious(postId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_POST_DETAIL.curious, postId] });

      const prevOption = queryClient.getQueryData([QUERY_KEY_POST_DETAIL.curious, postId]);

      queryClient.setQueryData(
        [QUERY_KEY_POST_DETAIL.curious, postId],
        (oldData: postCuriousProps | undefined) => {
          if (oldData === undefined) {
            return undefined;
          }

          return {
            ...oldData,
            data: {
              isCurious: true,
              curiousCount: oldData.data.curiousCount + 1,
            },
          };
        },
      );
      return { prevOption };
    },

    onError: (err, _, context) => {
      if (isAxiosError(err)) {
        const errCode = err.response?.data.status;
        const errStatus = err.response?.status;
        if (errCode === 40900 || errCode === 40306) {
          alert(ERROR_MESSAGE.approach + errCode);
        } else if (errStatus === 500) {
          alert(ERROR_MESSAGE.network);
        } else {
          throw new Error(ERROR_MESSAGE.unexpected);
        }
      }

      queryClient.setQueryData([QUERY_KEY_POST_DETAIL.curious, postId], context?.prevOption);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.curious, postId] });
    },
  });
  return data;
};

//글에 해당하는 댓글 리스트 조회 api
export const useGetCommentList = (postId: string) => {
  const { data, error } = useQuery({
    queryKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
    queryFn: () => fetchCommentList(postId),
    retry: false,
  });

  const commentListData = data?.data?.comments;
  return { commentListData, error };
};

//궁금해요 삭제 api
export const useDeleteCurious = (postId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.deleteCurious, postId],
    mutationFn: () => deleteCurious(postId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_POST_DETAIL.curious, postId] });

      const prevOption = queryClient.getQueryData([QUERY_KEY_POST_DETAIL.curious, postId]);

      queryClient.setQueryData(
        [QUERY_KEY_POST_DETAIL.curious, postId],
        (oldData: postCuriousProps | undefined) => {
          if (oldData === undefined) {
            return undefined;
          }
          const optimisticCuriousCount =
            oldData.data.curiousCount === 0
              ? oldData.data.curiousCount
              : oldData.data.curiousCount - 1;

          return {
            ...oldData,
            data: {
              isCurious: false,
              curiousCount: optimisticCuriousCount,
            },
          };
        },
      );

      return { prevOption };
    },
    onError: (err, _, context) => {
      if (isAxiosError(err)) {
        const errStatus = err.response?.status;
        if (errStatus === 404) {
          alert(ERROR_MESSAGE.approach + errStatus);
        } else if (errStatus === 500) {
          alert(ERROR_MESSAGE.network);
        } else {
          throw new Error(ERROR_MESSAGE.unexpected);
        }
      }
      queryClient.setQueryData([QUERY_KEY_POST_DETAIL.curious, postId], context?.prevOption);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.curious, postId] });
    },
  });
  return data;
};

//글 삭제/수정 권한 확인
export const useCheckPostAuth = (postId: string) => {
  const token = localStorage.getItem('accessToken');
  const data = useQuery({
    queryKey: [QUERY_KEY_POST_DETAIL.getAuthorization, postId],
    queryFn: () => checkPostAuth(postId),
    enabled: !!token,
  });
  return data;
};

// 글 삭제
export const useDeletePost = (postId: string, topicId: string, groupId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.deletePost, postId],
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POST_DETAIL.getPostDetail, postId],
      });
      queryClient.invalidateQueries({
        queryKey: groupKey.posts(topicId, groupId),
      });
    },
  });

  return data;
};

//댓글 생성 api
export const usePostComment = (postId: string, isAnonymous: boolean) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
    mutationFn: (comment: string) => fetchPostComment(postId, comment, isAnonymous),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
      });
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

  const postComment = (comment: string) => {
    data.mutate(comment);
  };

  return { postComment };
};

//대댓글 생성 api
export const usePostNestedComment = (commentId: string, postId: string, isAnonymous: boolean) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.postNestedComment, commentId],
    mutationFn: (comment: string) => fetchPostNestedComment(commentId, comment, isAnonymous),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
      });
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

  const postNestedComment = (comment: string) => {
    data.mutate(comment);
  };

  return { postNestedComment };
};

//댓글 삭제 api
export const useDeleteComment = (commentId: string, postId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.getCommentList, commentId],
    mutationFn: () => fetchDeleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
      });
    },
  });

  const deleteComment = () => {
    data.mutate();
  };
  return { deleteComment };
};

//대댓글 삭제 api
export const useDeleteNestedComment = (replyId: string, postId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.getCommentList, replyId],
    mutationFn: () => fetchDeleteNestedComment(replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
      });
    },
  });

  const deleteNestedComment = () => {
    data.mutate();
  };
  return { deleteNestedComment };
};
