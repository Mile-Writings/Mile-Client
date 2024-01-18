import { client } from '../../../utils/apis/axios';

interface PostTempSaveContent {
  groupId: string;
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
}

interface PostTempSaveResponseType {
  status: number;
  message: string;
}

const createTempSaveContent = async ({
  groupId,
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
}: PostTempSaveContent) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await client.post<PostTempSaveResponseType>(
      `/api/post/temporary`,
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
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default createTempSaveContent;
