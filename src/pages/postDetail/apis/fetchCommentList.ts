import { client } from '../../../utils/apis/axios';

interface GetCommentListResponseTypes {
  status: string;
  message: string;
  data: {
    comments: {
      commentId: string;
      name: string;
      moimName: string;
      content: string;
      isMyComment: boolean;
    }[];
  };
}

const fetchCommentList = async (postId: string) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await client.get<GetCommentListResponseTypes>(`/api/post/${postId}/comment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchCommentList;
