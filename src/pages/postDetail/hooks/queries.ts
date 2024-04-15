//한 파일에서 사용하는 쿼리키를 모아두고 쿼리를 선언해주세요

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import checkPostAuth from '../apis/checkPostAuth';
import createPostCurious from '../apis/createPostCurious';
import deleteCurious from '../apis/deleteCurious';
import deletePost from '../apis/deletePost';
import fetchCommentList from '../apis/fetchCommentList';
import fetchCuriousInfo from '../apis/fetchCuriousInfo';
import fetchDeleteComment from '../apis/fetchDeleteComment';
import fetchPostComment from '../apis/fetchPostComment';
import fetchPostDetail from '../apis/fetchPostDetail';
import fetchPostNestedComment from '../apis/fetchPostNestedComment';
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
  getCurious: 'getCurious',
  postNestedComment: 'postNestedComment',
};

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
    queryKey: [QUERY_KEY_POST_DETAIL.getCurious, postId],
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.getCurious, postId] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.getCurious, postId] });
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
export const useDeletePost = (postId: string, topicId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.deletePost, postId],
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getArticleList', topicId],
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
    mutationFn: () => fetchDeleteComment(replyId),
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
