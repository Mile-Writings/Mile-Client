import { client } from '../../../utils/apis/axios';

interface PostDetailRespnseTypes {
  data: {
    content: string;
    createdAt: string;
    imageUrl: string;
    moimName: string;
    title: string;
    topic: string;
    writerName: string;
    writerInfo: string;
  };
  status: number;
  message: string;
}

const fetchPostDetail = async (postId: string) => {
  try {
    const { data } = await client.get<PostDetailRespnseTypes>(`/api/post/${postId}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default fetchPostDetail;
