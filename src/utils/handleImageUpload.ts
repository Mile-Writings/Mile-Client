import directUploadS3 from '../pages/postPage/apis/directUploadS3';
import { EDITOR_DEFAULT_IMG } from '../pages/postPage/constants/editorDefaultImg';
const handleImageUpload = async (
  url: string,
  fileName: string,
  imageFile: File | null,
  imageUrl: string | undefined,
) => {
  try {
    if (imageFile) {
      const serverImageUrl = await directUploadS3(url, imageFile, fileName);
      if (serverImageUrl) {
        return serverImageUrl;
      } else {
        throw new Error('서버로 보내는 이미지가 undefined 입니다.');
      }
    } else if (imageUrl === '' || imageUrl === null) {
      return EDITOR_DEFAULT_IMG;
    } else {
      return imageUrl;
    }
  } catch (err) {
    throw new Error(`예기치 못한 에러 ${JSON.stringify(err)}`);
  }
};
export default handleImageUpload;
