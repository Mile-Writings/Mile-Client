import { authClient } from '../../../utils/apis/axios';

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
  const response = await authClient.get<FetchGroupInfoResponseTypes>(`/api/moim/${groupId}/invite`);
  return response.data;
};
