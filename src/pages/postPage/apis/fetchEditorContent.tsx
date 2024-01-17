import { client } from '../../../utils/apis/axios';

// 에디터 상단 글감 조회 GET
export interface Topics {
  topicId: string;
  topicName: string;
}

interface FetchTopicResponseTypes {
  data: {
    topics: Topics[];
  };
  status: number;
  message: string;
}

export const fetchTopic = async (groupId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get<FetchTopicResponseTypes>(`/api/moim/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
