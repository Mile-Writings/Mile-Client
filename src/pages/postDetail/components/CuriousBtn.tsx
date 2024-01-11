import { useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { QuestioHoverIc, QuestionDefaultIc } from './../../../assets/svgs';

interface Curious {
  curiousNum: number;
}
const CuriousBtn = ({ curiousNum }: Curious) => {
  const [isClick, setIsClick] = useState(false);

  return (
    <>
      <CuriousBtnWrapper onClick={() => setIsClick(!isClick)} $isClick={isClick}>
        <CuriousTextWrapper>
          <CuriousTextContainer>
            {isClick ? <QuestioHoverIc /> : <QuestionDefaultIc />}
            궁금해요
          </CuriousTextContainer>
          <CuriousTextWrapper>{curiousNum}</CuriousTextWrapper>
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
  align-items: center;
  justify-content: center;
`;
export default CuriousBtn;
