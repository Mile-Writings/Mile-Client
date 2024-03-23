import { client } from '../../../utils/apis/axios';

export const fetchAdminTopic = async () => {
  try {
    const response = await client.get<AdminTopicPropTypes>('/api/moim/moimId/topicList?page=1');
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

interface AdminTopicPropTypes {
  data: {
    topicCount: number;
    topics: {
      topicId: string;
      topicName: string;
      topicTag: string;
      topicDescripton: string;
      createdAt: string;
    }[];
  };
  status: number;
  message: string;
}
