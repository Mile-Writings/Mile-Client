export interface groupPostTypes {
  topicName: string;
  imageUrl: string;
  postTitle: string;
  postContent: string;
  postId: string;
  isContainPhoto: boolean;
}

export interface groupPropTypes {
  moimId: string;
  moimName: string;
  moimPosts: groupPostTypes[];
}
