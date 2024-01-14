export interface MoimPostPropTypes {
  topicName: string;
  imageUrl: string | null;
  postTitle: string;
  postContent: string;
}

export interface MoimPropTypes {
  moimId: number;
  moimName: string;
  moimPosts: MoimPostPropTypes[];
}

export interface DataPropTypes {
  moim: MoimPropTypes;
}
