import { authClient } from '../../../utils/apis/axios';

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
    const response = await authClient.get<TempSaveFlagPropTypes>(`/api/moim/${groupId}/temporary`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
