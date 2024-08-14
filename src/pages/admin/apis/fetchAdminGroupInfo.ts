import { authClient } from '../../../utils/apis/axios';

const fetchAdminGroupInfo = async (groupId: string) => {
  try {
    const data = await authClient.get(`/api/moim/${groupId}/info/owner`);
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchAdminGroupInfo;
