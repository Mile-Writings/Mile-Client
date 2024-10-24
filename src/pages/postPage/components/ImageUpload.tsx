import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';

import { EDITOR_DEFAULT_IMG } from '../constants/editorDefaultImg';

import { EditorThuminputIcnActiveIc, EditorThuminputIcnUnactiveIc } from './../../../assets/svgs';

interface ImageUploadPropTypes {
  setPreviewImgUrl: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  previewImgUrl: string;
}

export const ImageUpload = (props: ImageUploadPropTypes) => {
  const { previewImgUrl, setPreviewImgUrl, setImageFile } = props;
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          console.error(`file reader의 결과값이 string이 아닙니다. ${reader.result}`);
        }
      };
      reader.onerror = (err) => {
        alert(err);
      };
    } else {
      alert('등록할 수 없는 file형식입니다. ' + (file && file.type));
    }
  };

  return (
    <>
      <ThumbNailGradient>
        <ThumbNailImg src={previewImgUrl} $imgExist={previewImgUrl} />
        <ImageInput type="file" accept="image/*" id="editorImg" onChange={onImageUpload} />
        <ImageUploadLabel htmlFor="editorImg">
          <ImageIconWrapper>
            {previewImgUrl !== EDITOR_DEFAULT_IMG ? (
              <EditorThuminputIcnActiveIcon />
            ) : (
              <EditorThuminputIcnUnactiveIcon />
            )}
          </ImageIconWrapper>
        </ImageUploadLabel>
      </ThumbNailGradient>
    </>
  );
};

export default ImageUpload;

const ThumbNailGradient = styled.div`
  position: relative;
  width: 100%;
  height: 30.7rem;

  background: ${({ theme }) => theme.colors.thumbnailGradient};
  border-radius: 0 0 10px 10px;
`;

const ThumbNailImg = styled.img<{ $imgExist: string }>`
  position: relative;

  width: 100%;
  height: 30.7rem;
  object-fit: cover;

  border-radius: 0 0 10px 10px;
  ${({ $imgExist }) => $imgExist && $imgExist.length === 0 && 'content: "";'}
`;

const ImageUploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;

  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  cursor: pointer;
  border-radius: 10px;
`;

const ImageIconWrapper = styled.div`
  position: relative;
  width: 82.8rem;
  height: 100%;
`;
const EditorThuminputIcnActiveIcon = styled(EditorThuminputIcnActiveIc)`
  position: absolute;
  right: 0.5rem;
  bottom: 2.25rem;
`;

const EditorThuminputIcnUnactiveIcon = styled(EditorThuminputIcnUnactiveIc)`
  position: absolute;
  right: 0.5rem;
  bottom: 2.25rem;

  :hover {
    path {
      fill: ${({ theme }) => theme.colors.mainViolet};
    }

    rect {
      stroke: ${({ theme }) => theme.colors.mainViolet};
    }
  }
`;

const ImageInput = styled.input`
  display: none;
`;
