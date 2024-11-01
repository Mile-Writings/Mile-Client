import { authClient } from '../../../utils/apis/axios';

const fetchAdminGroupInfo = async (groupId: string) => {
  const data = await authClient.get(`/api/moim/${groupId}/info/owner`);

  return data;
};

export default fetchAdminGroupInfo;
