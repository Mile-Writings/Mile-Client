import axios from 'axios';

import { devClient } from '../../../utils/apis/axios';
//[GET] 관리자페이지 글감 LIST
export const fetchAdminTopic = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await devClient.get(`/api/moim/MQ==/admin/topicList?page=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response.data, 'data');
    return response.data;
  } catch (error) {
    console.log('에러:', error);
  }
};

// interface AdminTopicPropTypes {
//   topicCount: number;
//   topics: {
//     topicId: string;
//     topicName: string;
//     topicTag: string;
//     topicDescription: string;
//     createdAt: string;
//   }[];
// }

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
    const response = await devClient.post('/api/moim/moimId/topic', {
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
    const response = await devClient.put('/api/topic/topicId', {
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
