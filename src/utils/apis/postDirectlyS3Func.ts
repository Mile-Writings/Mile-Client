import postDirectlyS3 from '../../pages/postPage/apis/postDirectlyS3';
import { EDITOR_DEFAULT_IMG } from '../../pages/postPage/constants/editorDefaultImg';
const postDirectlyS3Func = async (
  url: string,
  fileName: string,
  imageFile: File | null,
  imageUrl: string | undefined,
  setImageToServer: (str: string) => void,
) => {
  try {
    if (imageFile) {
      const serverImageUrl = await postDirectlyS3(url, imageFile, fileName);
      if (serverImageUrl) {
        setImageToServer(serverImageUrl);
        return serverImageUrl;
      } else {
        throw new Error('서버로 보내는 이미지가 undefined 입니다.');
      }
    } else if (imageUrl === '') {
      setImageToServer(EDITOR_DEFAULT_IMG);
      return EDITOR_DEFAULT_IMG;
    } else {
      return imageUrl;
    }
  } catch (err) {
    throw new Error(`예기치 못한 에러 ${JSON.stringify(err)}`);
  }
};
export default postDirectlyS3Func;
