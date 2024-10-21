import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { urlToServerParsing } from '../../../utils/s3UrlParsing';
import { fetchPresignedUrl } from './fetchPresignedUrl';
const postDirectlyS3 = async (
  url: string,
  imageFile: File,
  setImageToServer: (str: string) => void,
  fileName: string,
  setReadyPresignedURL: Dispatch<SetStateAction<boolean>>,
) => {
  console.log(setImageToServer);
  try {
    await axios.put(`${url}`, imageFile, {
      headers: {
        // 'Content-Type': 'application/octet-stream',
        'Content-Type': 'image/jpeg',
        //'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const urlToServer = urlToServerParsing(url, fileName);
    await setImageToServer(urlToServer);
    setReadyPresignedURL(true);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 403) {
      try {
        const data = await fetchPresignedUrl();
        console.log(data);

        await axios.put(`${data?.data.url}`, imageFile, {
          headers: {
            'Content-Type': 'image/jpeg',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (data?.data.fileName) {
          console.log('fileName Change');
          console.log(setImageToServer);
          const newUrl = urlToServerParsing(data?.data.url, data?.data.fileName);
          await setImageToServer(newUrl);
        }

        setReadyPresignedURL(true);
      } catch (err) {
        console.log('new Error' + err);
      }
    } else {
      console.log(err);
    }
  }
};

export default postDirectlyS3;
