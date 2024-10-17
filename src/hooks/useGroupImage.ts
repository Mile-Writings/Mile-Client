import { ChangeEvent, useState } from 'react';

import postDirectlyS3 from '../pages/postPage/apis/postDirectlyS3';
import { s3UrlParsing } from '../utils/s3UrlParsing';

// 이미지 보낼 url 받아오기
const postDirectlyS3Func = async (url: string, imageFile: File, fileName: string) => {
  try {
    await postDirectlyS3(url, imageFile);
    const s3url = s3UrlParsing(url) || '';

    const urlToServer = `${s3url + fileName}`;

    return urlToServer;
  } catch (err) {
    if (err instanceof Error) throw err;
  }
};

const useHandleGroupImage = (fileName: string, url: string) =>
  // postDirectlyS3Func: (url: string, file: File) => void,
  // url: string,
  {
    const [groupImageView, setGroupImageView] = useState('');
    const [groupImageServerUrl, setGroupImageServerUrl] = useState('');
    const handleGroupImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (
        file &&
        (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')
      ) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
            setGroupImageView(reader.result);
            const serverUrl = await postDirectlyS3Func(url, file, fileName);
            setGroupImageServerUrl(serverUrl || '');
          } else {
            console.log('Image Error');
          }
        };
        reader.onerror = (err) => {
          alert(err);
        };
      } else {
        alert('file 형식을 확인해주세요.');
      }
    };

    return {
      groupImageView,
      setGroupImageView,
      handleGroupImageUpload,
      groupImageServerUrl,
      setGroupImageServerUrl,
    };
  };

export default useHandleGroupImage;
