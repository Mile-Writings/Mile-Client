import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';

import postDirectlyS3 from '../apis/postDirectlyS3';
import { EDITOR_DEFAULT_IMG } from '../constants/editorDefaultImg';

import { EditorThuminputIcnActiveIc, EditorThuminputIcnUnactiveIc } from './../../../assets/svgs';
import { s3UrlParsing } from '../../../utils/s3UrlParsing';

interface ImageUploadPropTypes {
  setPreviewImgUrl: Dispatch<SetStateAction<string>>;
  url: string;
  setImageToServer: (imageUrl: string) => void;
  fileName: string;
  previewImgUrl: string;
}

const ImageUpload = (props: ImageUploadPropTypes) => {
  const { previewImgUrl, setPreviewImgUrl, url, setImageToServer, fileName } = props;
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      if (target) {
        setPreviewImgUrl(target.result as string);
      }
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      postDirectlyS3Func(url, e.target.files[0]); //url 파싱해서 넣기
    }
  };

  const postDirectlyS3Func = async (url: string, imageFile: File) => {
    try {
      const data = await postDirectlyS3(url, imageFile);
      const s3url = s3UrlParsing(url);
      const urlToServer = `${s3url + fileName}`;
      setImageToServer(urlToServer);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ThumbNailGradient>
        <ThumbNailImg src={previewImgUrl} $imgExist={previewImgUrl} />
      </ThumbNailGradient>
      <ImageInput type="file" accept="image/*" id="editorImg" onChange={onImageUpload} />
      <ImageUploadLabel htmlFor="editorImg">
        {previewImgUrl !== EDITOR_DEFAULT_IMG ? (
          <EditorThuminputIcnActiveIcon />
        ) : (
          <EditorThuminputIcnUnactiveIcon />
        )}
      </ImageUploadLabel>
    </>
  );
};

export default ImageUpload;

const ThumbNailGradient = styled.div`
  width: 100%;

  background: ${({ theme }) => theme.colors.thumbnailGradient};
  border-radius: 10px;
`;

const ThumbNailImg = styled.img<{ $imgExist: string }>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 30.7rem;
  object-fit: cover;

  border-radius: 10px;
  ${({ $imgExist }) => $imgExist && $imgExist.length === 0 && 'content: "";'}
`;

const ImageUploadLabel = styled.label`
  position: relative;
  top: -7.1rem;
  right: 0;
  z-index: 3;
  width: 100%;

  cursor: pointer;
  border-radius: 10px;
`;

const EditorThuminputIcnActiveIcon = styled(EditorThuminputIcnActiveIc)`
  margin-left: 74%;
`;

const EditorThuminputIcnUnactiveIcon = styled(EditorThuminputIcnUnactiveIc)`
  margin-left: 74%;

  :hover {
    path {
      fill: ${({ theme }) => theme.colors.mainViolet};
      stroke: ${({ theme }) => theme.colors.mainViolet};
    }
  }
`;

const ImageInput = styled.input`
  display: none;
`;
