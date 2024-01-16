import { client } from '../../../utils/apis/axios';

interface DeleteResponseType {
  status: number;
  message: string;
  data: {
    isCurious: boolean;
  };
}
const deleteCurious = async (postId: string) => {
  const token = localStorage.getItem('accessToken');
  console.log('12345');
  try {
    const data = client.delete<DeleteResponseType>(`/api/post/${postId}/curious`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default deleteCurious;
