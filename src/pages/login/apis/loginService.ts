import { client } from '../../../utils/apis/axios';

const loginService = async (code: string, socialType: string) => {
  const RERIRECT_URL = import.meta.env.VITE_REDIRECT_URL;
  try {
    const { data } = await client.post(`/api/user/login?authorizationCode=${code}`, {
      RERIRECT_URL,
      socialType,
    });

    return data.data;
  } catch (e) {
    console.error(e);
  }
};

export default loginService;
