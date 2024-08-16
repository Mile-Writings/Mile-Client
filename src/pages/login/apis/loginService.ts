import { authClient, client } from '../../../utils/apis/axios';

const loginService = async (code: string, socialType: string) => {
  const RERIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

  const { data } = await client.post(`/api/user/login?authorizationCode=${code}`, {
    redirectUri: RERIRECT_URL,
    socialType,
  });
  authClient.defaults.headers['Authorization'] = `Bearer ${data.data.accessToken}`;

  return data.data;
};

export default loginService;
