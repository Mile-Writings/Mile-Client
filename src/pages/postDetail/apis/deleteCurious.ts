import { authClient } from '../../../utils/apis/axios';

interface DeleteResponseType {
  status: number;
  message: string;
  data: {
    isCurious: boolean;
  };
}
const deleteCurious = async (postId: string) => {
  const data = await authClient.delete<DeleteResponseType>(`/api/post/${postId}/curious`);
  return data;
};

export default deleteCurious;
