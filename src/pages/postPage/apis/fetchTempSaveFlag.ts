import { client } from '../../../utils/apis/axios';

interface TempSaveFlagPropTypes {
  data: {
    isTemporaryPostExist: boolean;
    postId: string;
  };
  status: number;
  message: string;
}

// 임시저장된 글 있는지 조회
export const fetchTempSaveFlag = async (groupId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get<TempSaveFlagPropTypes>(`/api/moim/${groupId}/temporary`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
