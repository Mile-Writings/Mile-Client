import { useState, ChangeEvent } from 'react';

const useHandleGroupImage = () =>
  // postDirectlyS3Func: (url: string, file: File) => void,
  // url: string,
  {
    const [groupImageView, setGroupImageView] = useState('');

    const handleGroupImage = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (
        file &&
        (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')
      ) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            // postDirectlyS3Func(url, file);
            setGroupImageView(reader.result);
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
      handleGroupImage,
    };
  };

export default useHandleGroupImage;
