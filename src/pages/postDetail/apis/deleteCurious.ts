import { authClient } from '../../../utils/apis/axios';

interface DeleteResponseType {
  status: number;
  message: string;
  data: {
    isCurious: boolean;
  };
}
const deleteCurious = async (postId: string) => {
  try {
    const data = authClient.delete<DeleteResponseType>(`/api/post/${postId}/curious`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default deleteCurious;
