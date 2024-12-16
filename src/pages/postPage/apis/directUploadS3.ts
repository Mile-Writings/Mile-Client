import axios from 'axios';
import { DirectToS3Types } from '../../../types/imageUploadType';
import { urlToServerParsing } from '../../../utils/urlToServerParsing';
import { fetchPresignedUrl } from './fetchPresignedUrl';

const directUploadS3 = async ({ url, fileName, imageFile }: DirectToS3Types) => {
  try {
    await axios.put(`${url}`, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
            'Content-Type': 'multipart/form-data',
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

export default directUploadS3;
