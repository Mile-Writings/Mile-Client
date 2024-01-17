import { client } from '../../../utils/apis/axios';

interface CheckPostAuth {
  status: number;
  message: string;
  data: {
    canEdit: boolean;
  };
}
const checkPostAuth = (postId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const data = client.get<CheckPostAuth>(`/api/post/${postId}/authenticate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default checkPostAuth;
