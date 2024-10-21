import { Dispatch, SetStateAction } from 'react';
import postDirectlyS3 from '../../pages/postPage/apis/postDirectlyS3';
import { EDITOR_DEFAULT_IMG } from '../../pages/postPage/constants/editorDefaultImg';
const postDirectlyS3Func = async (
  url: string,
  fileName: string,
  imageFile: File | null,
  imageUrl: string | undefined,
  setImageToServer: (str: string) => void,
  setReadyPresignedURL: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    console.log(setImageToServer);
    if (imageFile) {
      console.log('valid ImageFile if logic');
      // const urlToServer = urlToServerParsing(url, fileName);

      // await setImageToServer(urlToServer);
      await postDirectlyS3(url, imageFile, setImageToServer, fileName, setReadyPresignedURL);
    } else if (!imageUrl) {
      console.log('no Image file else logic');
      await setImageToServer(EDITOR_DEFAULT_IMG);
      setReadyPresignedURL(true);
    } else {
      console.log(imageUrl);
      console.log(imageFile);
      console.log('pDs3 else logic');
    }
  } catch (err) {
    console.log(err);
  }
};
export default postDirectlyS3Func;
