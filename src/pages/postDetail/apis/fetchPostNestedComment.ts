import { authClient } from '../../../utils/apis/axios';

interface PostCommentResponseType {
  status: number;
  message: string;
}

const fetchPostNestedComment = async (commentId: string, comment: string, isAnonymous: boolean) => {
  try {
    const response = await authClient.post<PostCommentResponseType>(`/api/comment/${commentId}`, {
      content: comment,
      isAnonymous: isAnonymous,
    });
    return response.data;
  } catch (err) {
    console.error();
  }
};

export default fetchPostNestedComment;
