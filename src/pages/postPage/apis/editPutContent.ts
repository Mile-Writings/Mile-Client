import { client } from '../../../utils/apis/axios';

interface putEditContentType {
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
  postId: string;
}

interface EditContentResponseType {
  status: number;
  message: string;
  data: null;
}

const editPutContent = async ({
  topicId,
  title,
  content,
  imageUrl,
  anonymous,
  postId,
}: putEditContentType) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await client.put<EditContentResponseType>(
      `api/post/${postId}`,
      {
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

export default editPutContent;
