import { authClient } from '../../../utils/apis/axios';

interface postContentType {
  groupId: string;
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
  contentWithoutTag: string;
  // eslint-disable-next-line no-unused-vars
  setPostErrorMessage: (errorMessage: string) => void;
}

interface PostContentResponseType {
  status: number;
  message: string;
  data: {
    postId: string;
    writerName: string;
  };
}

const createPostContent = async ({
  groupId,
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
  contentWithoutTag,
  setPostErrorMessage,
}: postContentType) => {
  if (title.trim().length === 0) {
    setPostErrorMessage('제목을 입력해주세요');
  } else if (contentWithoutTag.trim().length === 0) {
    setPostErrorMessage('글을 입력해주세요');
  } else {
    try {
      const { data } = await authClient.post<PostContentResponseType>(`/api/post`, {
        moimId: groupId,
        topicId: topicId,
        title: title,
        content: content,
        imageUrl: imageUrl,
        anonymous: anonymous,
      });

      return data.data.postId;
    } catch (err) {
      console.log(err);
    }
  }
};

export default createPostContent;
