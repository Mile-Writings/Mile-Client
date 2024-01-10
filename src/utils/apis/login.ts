import { client } from './axios';

interface LoginProps {
  authriazationCode: string;
  socialType: string;
}

const login = async ({ authriazationCode, socialType }: LoginProps) => {
  try {
    const { data } = await client.post(`/api/user/login?authorizationCode=?${authriazationCode}`, {
      socialType,
    });
    localStorage.setItem('token', data.accesToken);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

export default login;
