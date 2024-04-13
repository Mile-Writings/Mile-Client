import { devClient } from '../../../utils/apis/axios';

//[GET] 관리자페이지 글감 LIST
export const fetchAdminTopic = async (groupId: string | undefined, pageNum: number) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await devClient.get<AdminTopicPropTypes>(
      `/api/moim/${groupId}/admin/topicList?page=${pageNum}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data, 'data');

    return response.data;
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
}

export interface postAdminTopicPropTypes {
  topic: string;
  topicTag: string;
  topicDescription: string;
  groupId: string | undefined;
}

//[POST] 관리자페이지 글감 생성
export const postAdminTopic = async ({
  topic,
  topicTag,
  topicDescription,
  groupId,
}: postAdminTopicPropTypes) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await devClient.post(
      `/api/moim/${groupId}/topic`,
      {
        topicName: topic,
        topicTag: topicTag,
        topicDescription: topicDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data, 'data');
    return response.data;
  } catch (error) {
    console.log('에러:', error);
  }
};

interface editTopicPropType {
  topic: string;
  topicTag: string;
  topicDescription: string;
  topicId: string | undefined;
}

//[PUT] 관리자 페이지 글감 수정
export const editAdminTopic = async ({
  topic,
  topicTag,
  topicDescription,
  topicId,
}: editTopicPropType) => {
  try {
    const response = await devClient.put(`/api/topic/${topicId}`, {
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
