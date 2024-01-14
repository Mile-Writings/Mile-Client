import { client } from '../../../utils/apis/axios';

interface GroupFeedAuthPropTypes {
  data: {
    isMember: boolean;
  };
  status: number;
  message: string;
}

export const fetchGroupFeedAuth = async (groupId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get<GroupFeedAuthPropTypes>(`/api/moim/${groupId}/authenticate`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; //"isMember" : boolean
  } catch (error) {
    console.error('에러:', error);
  }
};

interface GroupInfoPropTypes {
  data: {
    imageUrl: string;
    moimName: string;
    ownerName: string;
    startDate: string;
    writerCount: number;
    description: string;
  };
  status: number;
  message: string;
}

export const fetchGroupInfo = async (groupId: string) => {
  try {
    const response = await client.get<GroupInfoPropTypes>(`/api/moim/${groupId}/info`);

    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

interface TodayTopicPropTypes {
  data: {
    content: string;
  };
  status: number;
  message: string;
}

export const fetchTodayTopic = async (groupId: string) => {
  try {
    const response = await client.get<TodayTopicPropTypes>(`/api/moim/${groupId}/topic`);
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

interface CuriousWriterPropTypes {
  data: {
    popularWriters: [
      {
        writerName: string;
        information: string;
      },
      {
        writerName: string;
        information: string;
      },
    ];
  };
  status: number;
  message: string;
}

export const fetchCuriousWriter = async (groupId: string) => {
  try {
    const response = await client.get<CuriousWriterPropTypes>(
      `/api/moim/${groupId}/mostCuriousWriters`,
    );
    console.log(response.data, '데이터');
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};
