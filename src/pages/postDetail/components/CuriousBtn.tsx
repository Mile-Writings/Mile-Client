import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import checkAuthenticate from '../../../utils/checkAuthenticate';
import { useDeleteCurious, useGetCuriousInfo, usePostCurious } from '../hooks/queries';
import { DetailPurpleFavoriteIc, DetailWhiteFavoriteIc } from './../../../assets/svgs';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
interface CuriousBtnProps {
  postId: string;
}

const CuriousBtn = ({ postId }: CuriousBtnProps) => {
  const { data, error } = useGetCuriousInfo(postId);

  const isCurious = data?.data?.isCurious ?? false;

  const curiousCount = data?.data?.curiousCount ?? 0;
  const { mutate: deleteCurious } = useDeleteCurious(postId);
  const { mutate: postCurious } = usePostCurious(postId);
  const [isClick, setIsClick] = useState(!!isCurious);

  const handleBtnClick = () => {
    if (checkAuthenticate()) {
      if (isClick) {
        deleteCurious();
      } else {
        postCurious();
      }
    } else {
      alert('모임의 유저가 아닙니다.');
    }
  };

  useEffect(() => {
    setIsClick(!!isCurious);
  }, [isCurious]);

  return error?.message == '403' || !checkAuthenticate() ? (
    <div />
  ) : (
    <CuriousBtnWrapper onClick={handleBtnClick} $isClick={isClick}>
      <CuriousTextWrapper>
        <CuriousTextContainer>
          {isClick ? <DetailWhiteFavoriteIc /> : <DetailPurpleFavoriteIc />}
          궁금해요
        </CuriousTextContainer>
        <CuriousTextWrapper>{curiousCount}</CuriousTextWrapper>
      </CuriousTextWrapper>
    </CuriousBtnWrapper>
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

  @media ${MOBILE_MEDIA_QUERY} {
    height: 4.4rem;
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
