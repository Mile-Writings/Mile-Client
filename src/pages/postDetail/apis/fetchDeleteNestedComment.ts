import { authClient } from '../../../utils/apis/axios';

interface DeleteCommentResponseType {
  status: number;
  message: string;
  data?: null;
}
const fetchDeleteNestedComment = async (replyId: string) => {
  try {
    const data = authClient.delete<DeleteCommentResponseType>(`/api/comment/reply/${replyId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchDeleteNestedComment;
