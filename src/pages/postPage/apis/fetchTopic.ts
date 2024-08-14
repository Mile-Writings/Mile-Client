import { authClient } from '../../../utils/apis/axios';

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
    const response = await authClient.get<FetchTopicResponseTypes>(`/api/moim/${groupId}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
