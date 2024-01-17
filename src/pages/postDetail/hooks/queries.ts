//한 파일에서 사용하는 쿼리키를 모아두고 쿼리를 선언해주세요

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import checkPostAuth from '../apis/checkPostAuth';
import createPostCurious from '../apis/createPostCurious';
import deleteCurious from '../apis/deleteCurious';
import fetchCommentList from '../apis/fetchCommentList';
import fetchCuriousInfo from '../apis/fetchCuriousInfo';
import fetchDeleteComment from '../apis/fetchDeleteComment';
import fetchPostComment from '../apis/fetchPostComment';
import fetchPostDetail from '../apis/fetchPostDetail';
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
  const data = useQuery({
    queryKey: [QUERY_KEY_POST_DETAIL.getCurious, postId],
    queryFn: () => fetchCuriousInfo(postId),
  });
  return data;
};

//궁금해요 생성 api
export const usePostCurious = (postId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.postCurious],
    mutationFn: () => createPostCurious(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.getCurious, postId] });
    },
  });
  return data;
};

//글에 해당하는 댓글 리스트 조회 api
export const useGetCommentList = (postId: string) => {
  const data = useQuery({
    queryKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
    queryFn: () => fetchCommentList(postId),
  });

  const commentListData = data.data?.data.comments;
  console.log(commentListData, 'data');
  return { commentListData };
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
  const data = useQuery({
    queryKey: [QUERY_KEY_POST_DETAIL.getAuthorization, postId],
    queryFn: () => checkPostAuth(postId),
  });
  return data;
};

interface UsePostComment {
  postComment: (props: string) => void;
}

//댓글 생성 api
export const usePostComment = (postId: string): UsePostComment => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
    mutationFn: (comment: string) => fetchPostComment(postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId] });
    },
  });

  const postComment = (comment: string) => {
    data.mutate(comment);
  };

  return { postComment };
};

//궁금해요 삭제 api
export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId],
    mutationFn: () => fetchDeleteComment(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POST_DETAIL.getCommentList, postId] });
    },
  });
  return data;
};
