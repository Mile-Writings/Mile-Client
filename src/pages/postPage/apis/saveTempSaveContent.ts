import { authClient } from '../../../utils/apis/axios';

interface putSaveTempContentType {
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
  postId: string;
}

interface responseDataType {
  postId: string;
  writerName: string;
}

interface saveTempContentResponseType {
  status: number;
  message: string;
  data: responseDataType[];
}

const saveTempSavecontent = async ({
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
  postId,
}: putSaveTempContentType) => {
  try {
    const { data } = await authClient.put<saveTempContentResponseType>(
      `/api/post/temporary/${postId}`,
      {
        topicId: topicId,
        title: title,
        content: content,
        imageUrl: imageUrl,
        anonymous: anonymous,
        postId: postId,
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default saveTempSavecontent;
