import { authClient } from '../../../utils/apis/axios';

interface putEditContentType {
  topicId: string;
  title: string;
  content: string;
  imageUrl: string;
  anonymous: boolean;
  postId: string;
  contentWithoutTag: string;
  // eslint-disable-next-line no-unused-vars
  setPostErrorMessage: (errorMessage: string) => void;
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
  contentWithoutTag,
  setPostErrorMessage,
}: putEditContentType) => {
  if (title.trim().length === 0) {
    setPostErrorMessage('제목을 입력해주세요');
  } else if (contentWithoutTag.trim().length === 0) {
    setPostErrorMessage('글을 입력해주세요');
  } else {
    try {
      const { data } = await authClient.put<EditContentResponseType>(`api/post/${postId}`, {
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
  }
};

export default editPutContent;
