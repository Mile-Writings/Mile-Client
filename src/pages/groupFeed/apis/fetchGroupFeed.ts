import { authClient, client } from '../../../utils/apis/axios';

interface GroupFeedAuthPropTypes {
  data: {
    isMember: boolean;
    isOwner: boolean;
  };
  status: number;
  message: string;
}

export const fetchGroupFeedAuth = async (groupId: string) => {
  const response = await authClient.get<GroupFeedAuthPropTypes>(
    `/api/moim/${groupId}/authenticate`,
  );
  return response.data; //"isMember" : boolean, "isOwner" : boolean
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

interface GroupPublicStatusPropTypes {
  data: {
    isPublic: boolean;
  };
  status: number;
  message: string;
}

export const fetchGroupPublicStatus = async (groupId: string) => {
  try {
    const response = await client.get<GroupPublicStatusPropTypes>(
      `/api/moim/${groupId}/public-status`,
    );

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
    const response = await client.get<TodayTopicPropTypes>(`/api/moim/${groupId}/topic/today`);
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
      `/api/moim/${groupId}/writers/top-rank`,
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
    const response = await client.get<TopicListPropTypes>(`/api/moim/${groupId}/topics`);
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
    const response = await client.get<CuriousPostPropTypes>(`/api/moim/${groupId}/posts/top-rank`);
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

interface ArticleListPropTypes {
  data: {
    hasNext: boolean;
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
      hitsCount: number;
      commentCount: number;
      imageUrl: string;
      isImageContained: boolean;
    }[];
  };
  status: number;
  message: string;
}

export const fetchArticleList = async (topicId: string, pageParam: string | null) => {
  try {
    const response = await client.get<ArticleListPropTypes>(`/api/topic/${topicId}`, {
      params: { lastPostId: pageParam === '' ? null : pageParam },
    });

    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

//[GET] 필명만 GET
interface WriterNamePropTypes {
  status: number;
  message: string;
  data: {
    writerName: string;
    writerNameId: number;
  };
}
export const fetchWriterNameOnly = async (groupId: string) => {
  try {
    const response = await authClient.get<WriterNamePropTypes>(`/api/moim/${groupId}/writername`);
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

//[GET] 필명 + 프로필 설명 GET
interface WriterInfoPropTypes {
  status: number;
  message: string;
  data: {
    name: string;
    description: string;
  };
}
export const fetchWriterInfo = async (writerNameId: number | undefined) => {
  try {
    const response = await authClient.get<WriterInfoPropTypes>(
      `/api/writername/${writerNameId}/profile`,
    );

    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};

//[PATCH] 필명 소개글 수정
interface WriterIntroPropTypes {
  status: number;
  message: string;
  data: null;
}
interface editWriterInfoPropType {
  writerNameId: number | undefined;
  description: string | undefined;
}
export const fetchEditIntro = async ({ writerNameId, description }: editWriterInfoPropType) => {
  try {
    const response = await authClient.patch<WriterIntroPropTypes>(
      `/api/writername/${writerNameId}/description`,
      {
        description: description,
      },
    );
    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};
