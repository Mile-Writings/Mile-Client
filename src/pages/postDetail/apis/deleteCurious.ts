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
  try {
    const data = client.delete<DeleteResponseType>(`api/delete/${postId}`, {
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
