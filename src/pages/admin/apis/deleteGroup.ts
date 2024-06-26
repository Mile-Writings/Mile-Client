import { client } from '../../../utils/apis/axios';

interface DeleteGroupResponseType {
  status: number;
  message: string;
  data: object;
}
const deleteGroup = async (moimId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const data = client.delete<DeleteGroupResponseType>(`/api/moim/${moimId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default deleteGroup;
