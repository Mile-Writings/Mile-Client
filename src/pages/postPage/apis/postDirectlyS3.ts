import axios from 'axios';
import { urlToServerParsing } from '../../../utils/urlToServerParsing';
import { fetchPresignedUrl } from './fetchPresignedUrl';
const postDirectlyS3 = async (url: string, imageFile: File, fileName: string) => {
  try {
    await axios.put(`${url}`, imageFile, {
      headers: {
        'Content-Type': 'image/jpg',
        //'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const urlToServer = urlToServerParsing(url, fileName);

    return urlToServer;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 403) {
      try {
        // presigned url 발급로직
        const data = await fetchPresignedUrl();

        await axios.put(`${data?.data.url}`, imageFile, {
          headers: {
            'Content-Type': 'image/jpg',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (data?.data.fileName) {
          const newUrl = urlToServerParsing(data?.data.url, data?.data.fileName);
          return newUrl;
        }
      } catch (err) {
        throw new Error(`알 수 없는 에러 ${JSON.stringify(err)}`);
      }
    } else {
      throw new Error(` ${JSON.stringify(err)}`);
    }
  }
};

export default postDirectlyS3;
