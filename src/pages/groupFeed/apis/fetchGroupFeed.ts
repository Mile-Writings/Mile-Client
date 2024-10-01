import { authClient, client } from '../../../utils/apis/axios';
import checkAuthenticate from '../../../utils/checkAuthenticate';

interface GroupFeedAuthPropTypes {
  data: {
    isMember: boolean;
    isOwner: boolean;
  };
  status: number;
  message: string;
}

export const fetchGroupFeedAuth = async (groupId: string) => {
  if (checkAuthenticate()) {
    const response = await authClient.get<GroupFeedAuthPropTypes>(
      `/api/moim/${groupId}/authenticate`,
    );
    return response.data; //"isMember" : boolean, "isOwner" : boolean
  } else {
    const response = await client.get<GroupFeedAuthPropTypes>(`/api/moim/${groupId}/authenticate`);
    return response.data; //"isMember" : boolean, "isOwner" : boolean
  }
};

interface InfoResPropTypes {
  imageUrl: string;
  moimName: string;
  ownerName: string;
  startDate: string;
  writerCount: number;
  description: string;
}

interface CuriousWriterPropTypes {
  writerName: string;
}

interface CuriousPostPropTypes {
  postId: string;
  imageUrl: string;
  topic: string;
  title: string;
  content: string;
  isContainPhoto: boolean;
}

interface GroupInfoPropTypes {
  data: {
    groupInfo: InfoResPropTypes;
    mostCuriousPost: {
      postList: CuriousPostPropTypes[];
    };
    mostCuriousWriter: {
      popularWriters: CuriousWriterPropTypes[];
    };
  };
  status: number;
  message: string;
}
//[GET] 글모임 통합 정보 GET
export const fetchGroupInfo = async (groupId: string) => {
  try {
    const response = await client.get<GroupInfoPropTypes>(`/api/moim/${groupId}/information`);
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
//[GET] 글모임별 글감 카테고리
export const fetchTopicList = async (groupId: string) => {
  try {
    const response = await client.get<TopicListPropTypes>(`/api/moim/${groupId}/topics`);
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

//[GET] 필명 + 프로필 설명 GET
interface WriterNamePropTypes {
  status: number;
  message: string;
  data: {
    writerName: string;
    writerNameId: number;
    description: string;
  };
}
export const fetchWriterInfo = async (groupId: string) => {
  if (checkAuthenticate()) {
    const response = await authClient.get<WriterNamePropTypes>(`/api/moim/${groupId}/writername`);
    console.log(response.data, 'fetch');
    return response.data;
  } else {
    const response = await client.get<WriterNamePropTypes>(`/api/moim/${groupId}/writername`);
    return response.data;
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
