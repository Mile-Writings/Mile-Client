import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDeleteCurious, useGetCuriousInfo, usePostCurious } from '../hooks/queries';

import { DetailPurpleFavoriteIc, DetailWhiteFavoriteIc } from './../../../assets/svgs';

const CuriousBtn = () => {
  const { postId } = useParams();
  const { data, isSuccess } = useGetCuriousInfo(postId || '');
  const [isClick, setIsClick] = useState(!!data?.data?.isCurious);
  // if (isSuccess) {
  //   if (data?.data?.isCurious) {
  //     setIsClick(data?.data?.isCurious);
  //   }
  // }
  const { mutate: postCurious } = usePostCurious(postId || '');
  const { mutate: deleteCurious } = useDeleteCurious(postId || ' ');
  console.log(data);
  const handleBtnClick = () => {
    if (isClick) {
      deleteCurious();
      console.log('좋아요 삭제');
    } else {
      postCurious();
      console.log('좋아요 생성');
    }
    setIsClick((prev) => !prev);
  };
  return (
    <>
      <CuriousBtnWrapper onClick={handleBtnClick} $isClick={isClick}>
        <CuriousTextWrapper>
          <CuriousTextContainer>
            {isClick ? <DetailWhiteFavoriteIc /> : <DetailPurpleFavoriteIc />}
            궁금해요
          </CuriousTextContainer>
          <CuriousTextWrapper>{data?.data?.curiousCount}</CuriousTextWrapper>
        </CuriousTextWrapper>
      </CuriousBtnWrapper>
    </>
  );
};

const ButtonCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 11.6rem;
  height: 4rem;

  border-radius: 8px;
`;

const CuriousBtnWrapper = styled.button<{ $isClick: boolean }>`
  color: ${({ $isClick, theme }) => ($isClick ? theme.colors.white : theme.colors.mainViolet)};

  background-color: ${({ $isClick, theme }) =>
    $isClick ? theme.colors.mainViolet : theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  ${ButtonCSS}
  ${({ theme }) => theme.fonts.button3};

  :hover {
    background-color: ${({ $isClick, theme }) =>
      !$isClick ? theme.colors.mileViolet : theme.colors.mainViolet};
  }
`;

const CuriousTextWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
`;

const CuriousTextContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  justify-content: center;
`;
export default CuriousBtn;
