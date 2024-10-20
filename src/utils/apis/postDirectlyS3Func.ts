import postDirectlyS3 from '../../pages/postPage/apis/postDirectlyS3';
import { EDITOR_DEFAULT_IMG } from '../../pages/postPage/constants/editorDefaultImg';
const postDirectlyS3Func = async (
  url: string,
  imageFile: File | null,
  fileName: string,
  setImageToServer: (str: string) => void,
) => {
  try {
    console.log(setImageToServer);
    if (imageFile) {
      console.log('valid ImageFile if logic');
      // const urlToServer = urlToServerParsing(url, fileName);

      // await setImageToServer(urlToServer);
      await postDirectlyS3(url, imageFile, setImageToServer, fileName);
    } else {
      console.log('no Image file else logic');
      await setImageToServer(EDITOR_DEFAULT_IMG);
    }
  } catch (err) {
    console.log(err);
  }
};
export default postDirectlyS3Func;
