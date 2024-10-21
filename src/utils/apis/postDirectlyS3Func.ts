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

      await postDirectlyS3(url, imageFile, setImageToServer, fileName);
    } else if (imageUrl === '') {
      console.log('no Image file else logic');
      await setImageToServer(EDITOR_DEFAULT_IMG);
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
export default postDirectlyS3Func;
