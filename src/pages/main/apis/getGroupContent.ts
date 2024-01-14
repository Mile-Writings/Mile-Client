import { client } from '../../../utils/apis/axios';

interface MoimPost {
  topicName: string;
  imageUrl: string;
  postTitle: string;
  postContent: string;
}
interface Moim {
  moimId: number;
  moimName: string;
  moimPosts: MoimPost[];
}

interface getGroupContentResponseTypes {
  status: number;
  message: string;
  data: {
    moim: Moim[];
  };
}

export const getGroupContent = async () => {
  try {
    const { data } = await client.get<getGroupContentResponseTypes>('/api/moim/best');
    console.log(data.data.moim);
    return data.data.moim;
  } catch (error) {
    console.error(error);
  }
};
