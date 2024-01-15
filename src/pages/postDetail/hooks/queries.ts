//한 파일에서 사용하는 쿼리키를 모아두고 쿼리를 선언해주세요

import { useMutation, useQuery } from '@tanstack/react-query';

import createPostCurious from '../apis/createPostCurious';
import fetchCuriousInfo from '../apis/fetchCuriousInfo';
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
    queryKey: [QUERY_KEY_POST_DETAIL.getPostDetail],
    queryFn: () => fetchPostDetail(postId),
  });

  return data;
};

//궁금해요 여부개수 get api
export const useGetCuriousInfo = (postId: string) => {
  const data = useQuery({
    queryKey: [QUERY_KEY_POST_DETAIL.getCurious],
    queryFn: () => fetchCuriousInfo(postId),
  });
  return data;
};

//궁금해요 생성 api
export const usePostCurious = (postId: string) => {
  const data = useMutation({
    mutationKey: [QUERY_KEY_POST_DETAIL.postCurious],
    mutationFn: () => createPostCurious(postId),
  });
  return data;
};
