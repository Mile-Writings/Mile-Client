import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface UseImageUploadPropTypes {
  setPreviewImgUrl: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}
const useImageUpload = ({ setPreviewImgUrl, setImageFile }: UseImageUploadPropTypes) => {
  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log('🚀 ~ onImageUpload ~ file:', file);
    if (
      file &&
      (file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/webp')
    ) {
      console.log('🚀 ~ onImageUpload ~ file.type :', file.type);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const target = e.target as FileReader;
        console.log('🚀 ~ onImageUpload ~ target:', target);
        if (target && typeof target.result === 'string') {
          setPreviewImgUrl(target.result);
          setImageFile(file);
        } else {
          alert(`읽을 수 없는 file입니다. 다른 파일을 업로드해 주세요. 
            ${reader.result} `);
        }
      };
      reader.onerror = (err) => {
        alert(err);
      };
    } else {
      alert('등록할 수 없는 file형식입니다. ' + (file && file.type));
    }
  };

  return {
    onImageUpload,
  };
};

export default useImageUpload;
