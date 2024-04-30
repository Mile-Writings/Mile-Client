import { client } from '../../../utils/apis/axios';

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
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get<FetchWriterNameConflictResponseTypes>(
      `/api/moim/${groupId}/name/validation?writerName=${writerName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken},`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
