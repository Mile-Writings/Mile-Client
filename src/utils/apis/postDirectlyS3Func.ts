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
    console.log(setImageToServer);
    if (imageFile) {
      console.log('valid ImageFile if logic');

      const serverImageUrl = await postDirectlyS3(url, imageFile, fileName);
      if (serverImageUrl) {
        console.log('🚀 post Directly S3 리턴받은 ~ serverImageUrl:', serverImageUrl);

        setImageToServer(serverImageUrl);
      } else {
        throw new Error('서버로 보내는 이미지가 undefined 입니다.');
      }
    } else if (imageUrl === '') {
      console.log('no Image file else logic');
      setImageToServer(EDITOR_DEFAULT_IMG);
    } else {
      console.log('🚀 ~ imageUrl 없는 else logic:', imageUrl);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
export default postDirectlyS3Func;
