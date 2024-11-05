import { authClient } from '../../../utils/apis/axios';

interface postContentType {
  groupId: string;
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;

  // eslint-disable-next-line no-unused-vars
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
}: postContentType) => {
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
};

export default createPostContent;
