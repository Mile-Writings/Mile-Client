import { devClient } from '../../../utils/apis/axios';

interface DeleteMemberPropTypes {
  status: number;
  message: string;
}

const fetchDeleteMember = async (writerNameId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const data = await devClient.delete<DeleteMemberPropTypes>(`/api/writerName/${writerNameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchDeleteMember;
