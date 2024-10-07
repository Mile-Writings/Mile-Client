import { authClient } from '../../../utils/apis/axios';

interface PostCuriousResponseType {
  status: number;
  message: string;
  data: {
    isCurious: boolean;
  };
}

const createPostCurious = async (postId: string) => {
  const { data } = await authClient.post<PostCuriousResponseType>(`/api/post/${postId}/curious`);

  return data;
};
export default createPostCurious;
