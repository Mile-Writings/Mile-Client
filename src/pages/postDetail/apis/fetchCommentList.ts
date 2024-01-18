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
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      return { comments: [] }; // 빈 배열 반환
    } else {
      console.error('댓글 가져오기 실패:', err);
      throw err;
    }
  }
};

export default fetchCommentList;
