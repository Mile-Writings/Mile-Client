import { client } from '../../../utils/apis/axios';

interface postContentType {
  groupId: string;
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
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
    // console.log(`data: ${data.data.postId}`);
    return data.data.postId;
  } catch (err) {
    console.log(err);
  }
};

export default createPostContent;
