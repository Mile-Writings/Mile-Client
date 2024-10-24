import axios from 'axios';
import { urlToServerParsing } from '../../../utils/urlToServerParsing';
import { fetchPresignedUrl } from './fetchPresignedUrl';
const postDirectlyS3 = async (
  url: string,
  imageFile: File,

  fileName: string,
) => {
  try {
    await axios.put(`${url}`, imageFile, {
      headers: {
        'Content-Type': 'image/jpg',
        //'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const urlToServer = urlToServerParsing(url, fileName);
    console.log('🚀 ~ urlToServer:', urlToServer);

    return urlToServer;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 403) {
      try {
        const data = await fetchPresignedUrl();
        console.log(data);

        await axios.put(`${data?.data.url}`, imageFile, {
          headers: {
            'Content-Type': 'image/jpg',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (data?.data.fileName) {
          console.log('fileName Change');
          const newUrl = urlToServerParsing(data?.data.url, data?.data.fileName);
          return newUrl;
        }
      } catch (err) {
        console.log('new Error' + err);
      }
    } else {
      console.log(err);
    }
  }
};

export default postDirectlyS3;
