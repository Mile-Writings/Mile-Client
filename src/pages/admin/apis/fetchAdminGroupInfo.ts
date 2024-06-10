import { client } from '../../../utils/apis/axios';

const fetchAdminGroupInfo = async (groupId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const data = await client.get(`/api/moim/${groupId}/info/owner`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchAdminGroupInfo;
