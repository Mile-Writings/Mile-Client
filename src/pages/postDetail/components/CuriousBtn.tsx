import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDeleteCurious, useGetCuriousInfo, usePostCurious } from '../hooks/queries';

import { DetailPurpleFavoriteIc, DetailWhiteFavoriteIc } from './../../../assets/svgs';

const CuriousBtn = () => {
  const { postId } = useParams();
  const { data } = useGetCuriousInfo(postId || '');

  const { mutate: postCurious } = usePostCurious(postId || '');
  const { mutate: deleteCurious } = useDeleteCurious(postId || ' ');
  const isCurious = data?.data?.isCurious;
  const [isClick, setIsClick] = useState(!!isCurious);

  const handleBtnClick = () => {
    if (isClick) {
      deleteCurious();
    } else {
      postCurious();
    }
    setIsClick((prev) => !prev);
  };

  useEffect(() => {
    setIsClick(!!data?.data?.isCurious);
  }, [data?.data?.isCurious]);
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
