import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { SUPPORTED_IMAGE_TYPES } from '../constants/supportedImageType';
import { convertImageToWebP } from '../utils/convertImageToWebP';
import { isSupportedImageType } from '../utils/isSupportedImageType';

interface UseImageUploadPropTypes {
  setPreviewImgUrl: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null | Blob>>;
}

const useImageUpload = ({ setPreviewImgUrl, setImageFile }: UseImageUploadPropTypes) => {
  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file && isSupportedImageType(file.type)) {
      try {
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
          alert(`이미지를 읽는 중 오류가 발생하였습니다. 다시 시도해주세요. ${err}`);
        };
      } catch (convertImageError) {
        alert(`이미지를 변환하는 도중 오류가 발생하였습니다 ${convertImageError}`);
      }
    } else {
      alert(
        `등록할 수 없는 파일 형식입니다. \n지원되는 파일 형식: ${SUPPORTED_IMAGE_TYPES.join(
          ', ',
        )}\n` + `업로드된 파일 형식: ${file?.type || '없음'}`,
      );
    }
  };

  return {
    onImageUpload,
  };
};

export default useImageUpload;
