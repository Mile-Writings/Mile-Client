import { devClient } from '../../../utils/apis/axios';

interface DeleteCommentResponseType {
  status: number;
  message: string;
  data?: null;
}
const fetchDeleteNestedComment = async (replyId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const data = devClient.delete<DeleteCommentResponseType>(`/api/comment/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchDeleteNestedComment;
