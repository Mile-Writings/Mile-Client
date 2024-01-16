import { client } from '../../../utils/apis/axios';

export interface PostContentRequestTypes {
  groupId: string;
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
}

interface PostContentResponseType {
  status: string;
  message: string;
  data: {
    postId: string;
    writerName: string;
  };
}

export const postContent = async ({
  groupId,
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
}: PostContentRequestTypes) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.post<PostContentResponseType>(
      `/api/post`,
      { groupId, topicId, title, content, imageUrl, anonymous },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
