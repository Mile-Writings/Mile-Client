import { authClient } from '../../../utils/apis/axios';

interface DeleteGroupResponseType {
  status: number;
  message: string;
  data: object;
}
const deleteGroup = async (moimId: string) => {
  try {
    const data = authClient.delete<DeleteGroupResponseType>(`/api/moim/${moimId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default deleteGroup;
