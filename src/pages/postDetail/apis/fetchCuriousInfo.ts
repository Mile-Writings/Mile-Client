import { client } from '../../../utils/apis/axios';

interface GetCuriousInfo {
  status: string;
  message: string;
  data: {
    isCurious: boolean;
    curiousCount: number;
  };
}

const fetchCuriousInfo = async (postId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await client.get<GetCuriousInfo>(`/api/post/${postId}/cusiousInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export default fetchCuriousInfo;
