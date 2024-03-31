import axios from 'axios';

export const fetchAdminTopic = async () => {
  try {
    const response = await axios.get<AdminTopicPropTypes>('/api/moim/moimId/topicList?page=1');
    const data = await response;
    return data;
  } catch (error) {
    console.log('에러:', error);
  }
};

interface AdminTopicPropTypes {
  topicCount: number;
  topics: {
    topicId: string;
    topicName: string;
    topicTag: string;
    topicDescription: string;
    createdAt: string;
  }[];
}

export interface postAdminTopicPropTypes {
  topic: string;
  topicTag: string;
  topicDescription: string;
}

//[POST] 관리자페이지 글감 생성
export const postAdminTopic = async ({
  topic,
  topicTag,
  topicDescription,
}: postAdminTopicPropTypes) => {
  try {
    const response = await axios.post('/api/moim/moimId/topic', {
      topic: topic,
      topicTag: topicTag,
      topicDescription: topicDescription,
    });
    const data = await response;
    console.log(data, 'data');
    return data;
  } catch (error) {
    console.log('에러:', error);
  }
};

//[PUT] 관리자 페이지 글감 수정
export const editAdminTopic = async ({
  topic,
  topicTag,
  topicDescription,
}: postAdminTopicPropTypes) => {
  try {
    const response = await axios.put('/api/topic/topicId', {
      topic: topic,
      topicTag: topicTag,
      topicDescription: topicDescription,
    });
    const data = response;
    return data;
  } catch (error) {
    console.log('에러:', error);
  }
};
