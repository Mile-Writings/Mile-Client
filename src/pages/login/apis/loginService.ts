import { client } from '../../../utils/apis/axios';

const loginService = async (code: string, socialType: string) => {
  try {
    const { data } = await client.post(`/api/user/login?authorizationCode=${code}`, {
      socialType,
    });

    return data.data;
  } catch (e) {
    console.error(e);
  }
};

export default loginService;
