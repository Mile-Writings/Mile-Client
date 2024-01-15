import styled from '@emotion/styled';

import React, { useState } from 'react';

import {
  EditorThuminputIcnUnactiveIc,
  EditorThuminputIcnHoverIc,
  EditorThuminputIcnActiveIc,
} from './../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const ImageUpload = () => {
  const [editorThumImg, setEditorThumImg] = useState('');
  const onImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setEditorThumImg(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // 기본 이미지 박아넣기 (조건부 렌더링 - state하나 만들기)
  // 이미지 업로드 버튼 위치 조정
  // 이미지 업로드 버튼 호버, active 조정 (위에서 만든 state로 관리 가능)
  // 이미지 업로드 함수 타입 지정해서 에러 없애기

  return (
    <>
      <ThumbNailGradient>
        <ThumbNailImg src={editorThumImg} $imgExist={editorThumImg} />
      </ThumbNailGradient>
      <ImageInput type="file" accept="image/*" id="editorImg" onChange={onImageUpload} />
      <ImageUploadBtn htmlFor="editorImg">
        {editorThumImg.length > 0 ? (
          <EditorThuminputIcnActiveIc />
        ) : (
          <EditorThuminputIcnActiveIcon />
        )}
      </ImageUploadBtn>
      <Spacing marginBottom="3.4" />
    </>
  );
};

export default ImageUpload;

const ThumbNailGradient = styled.div`
  background: ${({ theme }) => theme.colors.thumbnailGradient};
`;

const ThumbNailImg = styled.img<{ $imgExist: string }>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 30.7rem;
  object-fit: cover;

  background-color: #e4f4b5;

  ${({ $imgExist }) => $imgExist.length === 0 && 'content: "";'}
`;

const ImageUploadBtn = styled.label`
  position: absolute;
  top: 23rem;
  right: 27.495rem;
  z-index: 3;

  cursor: pointer;
`;

const EditorThuminputIcnActiveIcon = styled(EditorThuminputIcnUnactiveIc)`
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
