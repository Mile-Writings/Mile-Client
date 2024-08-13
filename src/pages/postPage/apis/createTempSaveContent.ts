import { authClient } from '../../../utils/apis/axios';

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
    const { data } = await authClient.post<PostTempSaveResponseType>(`/api/post/temporary`, {
      moimId: groupId,
      topicId: topicId,
      title: title,
      content: content,
      imageUrl: imageUrl,
      anonymous: anonymous,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default createTempSaveContent;
