import axios from 'axios';

import { client, devClient } from '../../../utils/apis/axios';

interface GroupFeedAuthPropTypes {
  data: {
    isMember: boolean;
    isOwner: boolean;
  };
  status: number;
  message: string;
}

export const fetchGroupFeedAuth = async (groupId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get<GroupFeedAuthPropTypes>(
      //   `/api/moim/${groupId}/authenticate`,
      '/api/moim/:moimId/authenticate',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data, 'fetchgRoup');
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
    popularWriters: {
      writerName: string;
      information: string;
    }[];
  };
  status: number;
  message: string;
}

export const fetchCuriousWriters = async (groupId: string) => {
  try {
    const response = await client.get<CuriousWriterPropTypes>(
      `/api/moim/${groupId}/mostCuriousWriters`,
    );
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

interface TopicListPropTypes {
  data: {
    topicList: {
      topicId: string;
      topicName: string;
    }[];
  };
  status: number;
  message: string;
}

export const fetchTopicList = async (groupId: string) => {
  try {
    const response = await client.get<TopicListPropTypes>(`/api/moim/${groupId}/topicList`);
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

interface CuriousPostPropTypes {
  data: {
    postList: {
      postId: string;
      imageUrl: string;
      topic: string;
      title: string;
      content: string;
      isContainPhoto: boolean;
    }[];
  };
  status: number;
  message: string;
}

export const fetchCuriousPost = async (groupId: string) => {
  try {
    const response = await client.get<CuriousPostPropTypes>(`/api/moim/${groupId}/mostCuriousPost`);
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

interface ArticleListPropTypes {
  data: {
    topicInfo: {
      topic: string;
      topicDescription: string;
    };
    postList: {
      postId: string;
      postTitle: string;
      postContent: string;
      writerName: string;
      createdAt: string;
      curiousCount: number;
      imageUrl: string;
      isImageContained: boolean;
    }[];
  };
  status: number;
  message: string;
}

export const fetchArticleList = async (topicId: string) => {
  try {
    const response = await client.get<ArticleListPropTypes>(`/api/topic/${topicId}`);
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};
