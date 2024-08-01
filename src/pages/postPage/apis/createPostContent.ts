import { client } from '../../../utils/apis/axios';

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
      const token = localStorage.getItem('accessToken');
      const { data } = await client.post<PostContentResponseType>(
        `/api/post`,
        {
          moimId: groupId,
          topicId: topicId,
          title: title,
          content: content,
          imageUrl: imageUrl,
          anonymous: anonymous,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data.data.postId;
      setPostErrorMessage('');
    } catch (err) {
      console.log(err);
    }
  }
};

export default createPostContent;
