import { client } from '../../../utils/apis/axios';

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
    const token = localStorage.getItem('accessToken');
    const { data } = await client.put<saveTempContentResponseType>(
      `/api/post/temporary/${postId}`,
      {
        topicId: topicId,
        title: title,
        content: content,
        imageUrl: imageUrl,
        anonymous: anonymous,
        postId: postId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default saveTempSavecontent;
