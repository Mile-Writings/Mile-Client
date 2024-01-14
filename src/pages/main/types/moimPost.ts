export interface moimPostPropTypes {
  topicName: string;
  imageUrl: string | null;
  postTitle: string;
  postContent: string;
}

export interface moimPropTypes {
  moimId: number;
  moimName: string;
  moimPosts: moimPostPropTypes[];
}

export interface dataPropTypes {
  data: moimPropTypes;
}

export interface groupContentPropTypes {
  topicName: string;
  imageUrl: string | null;
  postTitle: string;
  postContent: string;
  groupId: number;
  isLast: boolean;
}
