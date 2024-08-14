import { authClient } from './axios';

const refresh = async () => {
  const data = await authClient.get(`/api/user/refresh-token`);

  return data;
};

export default refresh;
