import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';

import postDirectlyS3 from '../apis/postDirectlyS3';
import { s3UrlPasing } from '../utils/s3UrlPasing';

import { EditorThuminputIcnActiveIc, EditorThuminputIcnUnactiveIc } from './../../../assets/svgs';

interface ImageUploadPropTypes {
  saveImage: Dispatch<SetStateAction<string>>;
  imageUrl: string;
  url: string;
  setImageToserver: Dispatch<SetStateAction<string>>;
}

const ImageUpload = (props: ImageUploadPropTypes) => {
  const { imageUrl, saveImage, url, setImageToserver } = props;
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      if (target) {
        saveImage(target.result as string);
        postDirectlyS3Func(url, imageUrl); //url 파싱해서 넣기
      }
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const postDirectlyS3Func = async (url: string, imageUrl: string) => {
    try {
      const data = await postDirectlyS3(url, imageUrl || '');
      const s3url = s3UrlPasing(url);
      const urlToServer = `${s3url}${imageUrl}`;
      setImageToserver(urlToServer);
      console.log(data);
      // const pasingedURL = url;
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
        {imageUrl.length > 0 ? (
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
  object-fit: cover; //픽스
  background-color: ${({ theme }) => theme.colors.secondGreen};

  ${({ $imgExist }) => $imgExist.length === 0 && 'content: "";'}
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
