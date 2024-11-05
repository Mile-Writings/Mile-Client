import { isAxiosError } from 'axios';

import { authClient } from '../../../utils/apis/axios';
//[GET] 관리자페이지 글감 LIST

export const fetchAdminTopic = async (groupId: string | undefined, pageNum: number) => {
  const response = await authClient.get<AdminTopicPropTypes>(
    `/api/moim/${groupId}/admin/topics?page=${pageNum}`,
  );

  return response.data;
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
    const response = await authClient.post(`/api/moim/${groupId}/topic`, {
      topicName: topic,
      topicTag: topicTag,
      topicDescription: topicDescription,
    });
    return response.data;
  } catch (error) {
    throw error;
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
    const response = await authClient.put(`/api/topic/${topicId}`, {
      topic: topic,
      topicTag: topicTag,
      topicDescription: topicDescription,
    });
    return response.data;
  } catch (error) {
    console.log('에러:', error);
  }
};

//[DELETE] 관리자페이지 글감삭제
export const deleteAdminTopic = async (topicId: string) => {
  try {
    const response = await authClient.delete<AdminTopicPropTypes>(`/api/topic/${topicId}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error?.response?.status == 400)
      alert('모임에는 최소 1개 이상의 글감이 필요합니다');
    else console.log('에러:', error);
  }
};
