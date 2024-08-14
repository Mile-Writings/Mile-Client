import { authClient } from '../../../utils/apis/axios';

interface CheckPostAuth {
  status: number;
  message: string;
  data: {
    role: string;
  };
}
const checkPostAuth = (postId: string) => {
  try {
    const data = authClient.get<CheckPostAuth>(`/api/post/${postId}/authenticate`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default checkPostAuth;
