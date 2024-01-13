import { client } from '../../../utils/apis/axios';

const fetchPostDetail = async (postId: string) => {
  try {
    const data = await client.get(`/api/post/${postId}`);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default fetchPostDetail;
