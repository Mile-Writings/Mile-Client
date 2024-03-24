import axios from 'axios';

export const fetchAdminTopic = async () => {
  try {
    const response = await axios.get<AdminTopicPropTypes>('/api/moim/moimId/topicList?page=1');
    const data = await response.data;
    console.log(data, 'res');

    return data;
  } catch (error) {
    console.log('에러:', error);
  }
};

interface AdminTopicPropTypes {
  data: {
    topicCount: number;
    topics: {
      topicId: string;
      topicName: string;
      topicTag: string;
      topicDescription: string;
      createdAt: string;
    }[];
  };

  status: number;
}
