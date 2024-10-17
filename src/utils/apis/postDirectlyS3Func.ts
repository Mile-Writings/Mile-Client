import postDirectlyS3 from '../../pages/postPage/apis/postDirectlyS3';
import { s3UrlParsing } from '../s3UrlParsing';

const postDirectlyS3Func = async (
  url: string,
  imageFile: File | null,
  fileName: string,
  setImageToServer: (str: string) => void,
) => {
  try {
    if (imageFile) {
      await postDirectlyS3(url, imageFile);
      const s3url = s3UrlParsing(url);
      const urlToServer = `${s3url + fileName}`;
      setImageToServer(urlToServer);
      console.log(urlToServer);
      console.log('post Direfctly Func Test');
    }
  } catch (err) {
    console.log(err);
  }
};
export default postDirectlyS3Func;
