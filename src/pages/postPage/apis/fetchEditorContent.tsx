import { client } from '../../../utils/apis/axios';

// 임시저장된 글 있는지 조회
interface TempSaveFlagPropTypes {
  data: {
    isTemporaryPostExist: boolean;
    postId: string;
  };
  status: number;
  message: string;
}

export const fetchTempSaveFlag = async (groupId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get<TempSaveFlagPropTypes>(`/api/moim/${groupId}/temporary`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 임시저장된 글 불러오기
interface TopicField {
  topicId: string;
  topicName: string;
  isSelected: boolean;
}

interface TempSaveContentPropTypes {
  data: {
    topicList: TopicField[];
    title: string;
    content: string;
    imageUrl: string;
    anonymous: string;
  };
  status: number;
  message: string;
}

export const fetchTempSaveContent = async (postId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get<TempSaveContentPropTypes>(`/api/post/temporary/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
