import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';

import postDirectlyS3 from '../apis/postDirectlyS3';
import { s3UrlPasing } from '../utils/s3UrlPasing';

import { EditorThuminputIcnActiveIc, EditorThuminputIcnUnactiveIc } from './../../../assets/svgs';

interface ImageUploadPropTypes {
  saveImage: Dispatch<SetStateAction<string>>;
  imageUrl: string;
  url: string;
  setImageToServer: Dispatch<SetStateAction<string>>;
  fileName: string;
}

const ImageUpload = (props: ImageUploadPropTypes) => {
  const { imageUrl, saveImage, url, setImageToServer, fileName } = props;
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      if (target) {
        saveImage(target.result as string);
      }
    };
    if (e.target.files && e.target.files[0]) {
      postDirectlyS3Func(url, e.target.files[0]); //url 파싱해서 넣기
      reader.readAsDataURL(e.target.files[0]);
      console.log(reader);
    }
  };

  const postDirectlyS3Func = async (url: string, imageFile: File) => {
    try {
      const data = await postDirectlyS3(url, imageFile);
      const s3url = s3UrlPasing(url);
      const urlToServer = `${s3url + fileName}`;
      setImageToServer(urlToServer);
      // saveImage(urlToServer);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ThumbNailGradient>
        <ThumbNailImg src={imageUrl} $imgExist={imageUrl} />
      </ThumbNailGradient>
      <ImageInput type="file" accept="image/*" id="editorImg" onChange={onImageUpload} />
      <ImageUploadLabel htmlFor="editorImg">
        {imageUrl && imageUrl.length > 0 ? (
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
`;

const ThumbNailImg = styled.img<{ $imgExist: string }>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 30.7rem;
  object-fit: cover;

  ${({ $imgExist }) => $imgExist && $imgExist.length === 0 && 'content: "";'}
`;

const ImageUploadLabel = styled.label`
  position: relative;
  top: -7.1rem;
  right: 0;
  z-index: 3;
  width: 100%;

  cursor: pointer;
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
