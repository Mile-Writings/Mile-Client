import { client } from '../../../utils/apis/axios';

interface PostCuriousResponseType {
  status: string;
  message: string;
  data: {
    isCurious: boolean;
  };
}

const createPostCurious = async (postId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await client.get<PostCuriousResponseType>(`api/post/${postId}/curiousInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default createPostCurious;
