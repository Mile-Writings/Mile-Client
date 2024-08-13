import { client } from '../../../utils/apis/axios';

const loginService = async (code: string, socialType: string) => {
  const RERIRECT_URL = import.meta.env.VITE_REDIRECT_URL;
  // try {
  //   const { data } = await client.post(`/api/user/login?authorizationCode=${code}`, {
  //     redirectUri: RERIRECT_URL,
  //     socialType,
  //   });

  //   return data.data;
  // } catch (e) {
  //   if (isAxiosError(e)) {
  //     if (e.response?.status === 400) {
  //       alert(e.response.data.message);
  //     }
  //   }
  // }
  const { data } = await client.post(`/api/user/login?authorizationCode=${code}`, {
    redirectUri: RERIRECT_URL,
    socialType,
  });

  return data.data;
};

export default loginService;
