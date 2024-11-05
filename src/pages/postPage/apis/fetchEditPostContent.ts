import { authClient } from '../../../utils/apis/axios';

export const fetchEditPostContent = async (postId: string) => {
  try {
    const response = await authClient.get(`api/post/modify/${postId}`);
    return response.data;
  } catch (err) {
    console.error('글 수정시 글 조회 api 에러 ', err);
  }
};
