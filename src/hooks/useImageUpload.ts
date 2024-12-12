import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { convertImageToWebP } from '../utils/convertImageToWebP';
interface UseImageUploadPropTypes {
  setPreviewImgUrl: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null | Blob>>;
}
const useImageUpload = ({ setPreviewImgUrl, setImageFile }: UseImageUploadPropTypes) => {
  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (
      file &&
      (file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/webp')
    ) {
      const webpBlob = await convertImageToWebP(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const target = e.target as FileReader;

        if (target && typeof target.result === 'string') {
          setPreviewImgUrl(target.result);
          setImageFile(webpBlob as Blob);
          // 추후 Blob 통신에서 에러가 발생한다면 아래 주석을 활용해야하기에 남겨둠
          //setImageFile(file);
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
