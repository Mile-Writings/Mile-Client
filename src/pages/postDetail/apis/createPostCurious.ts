import { authClient } from '../../../utils/apis/axios';

interface PostCuriousResponseType {
  status: number;
  message: string;
  data: {
    isCurious: boolean;
  };
}

const createPostCurious = async (postId: string) => {
  try {
    const { data } = await authClient.post<PostCuriousResponseType>(`/api/post/${postId}/curious`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default createPostCurious;
