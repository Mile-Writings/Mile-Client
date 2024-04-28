import { client } from '../../../utils/apis/axios';

// 글 모임 초대 페이지 글모임 정보 GET
interface FetchGroupInfoResponseTypes {
  data: {
    moimTitle: string;
    imageUrl: string;
    leader: string;
    foundedDate: string;
    memberCount: number;
    description: string;
  };
  status: number;
  message: string;
}

export const fetchGroupInfo = async (groupId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await client.get<FetchGroupInfoResponseTypes>(`/api/moim/${groupId}/invite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
