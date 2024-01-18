import { client } from '../../../utils/apis/axios';

interface PostCuriousResponseType {
  status: number;
  message: string;
  data: {
    isCurious: boolean;
  };
}

const createPostCurious = async (postId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await client.post<PostCuriousResponseType>(
      `/api/post/${postId}/curious`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default createPostCurious;
