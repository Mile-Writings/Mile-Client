import { devClient } from '../../../utils/apis/axios';

interface DeleteCommentResponseType {
  status: number;
  message: string;
  data: null;
}
const fetchDeleteComment = async (commentId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const data = devClient.delete<DeleteCommentResponseType>(`/api/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchDeleteComment;
