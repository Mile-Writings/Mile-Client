import { authClient } from '../../../utils/apis/axios';

// 필명 중복 확인 GET
interface FetchWriterNameConflictResponseTypes {
  data: {
    isConflict: boolean;
  };
  status: number;
  message: string;
}

export const fetchWriterNameConflict = async (groupId: string, writerName: string) => {
  try {
    const response = await authClient.get<FetchWriterNameConflictResponseTypes>(
      `/api/moim/${groupId}/name/validation?writerName=${writerName}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
