import { authClient } from '../../../utils/apis/axios';

interface PostCommentResponseType {
  status: number;
  message: string;
  data: null;
}

const fetchPostComment = async (postId: string, comment: string, isAnonymous: boolean) => {
  try {
    const response = await authClient.post<PostCommentResponseType>(`/api/post/${postId}/comment`, {
      content: comment,
      isAnonymous: isAnonymous,
    });
    return response.data;
  } catch (err) {
    console.error();
  }
};

export default fetchPostComment;
