import { authClient } from '../../../utils/apis/axios';

interface DeleteCommentResponseType {
  status: number;
  message: string;
  data: null;
}
const fetchDeleteComment = async (commentId: string) => {
  try {
    const data = authClient.delete<DeleteCommentResponseType>(`/api/comment/${commentId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchDeleteComment;
