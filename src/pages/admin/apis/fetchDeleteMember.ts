import { client } from '../../../utils/apis/axios';

interface DeleteMemberPropTypes {
  status: number;
  message: string;
}

const fetchDeleteMember = async (writerNameId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const data = await client.delete<DeleteMemberPropTypes>(
      `/api/moim/:moimId/writerName/:${writerNameId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchDeleteMember;
