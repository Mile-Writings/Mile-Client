import styled from '@emotion/styled';
import React, { useState } from 'react';

import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import { MainToggleArrowOpenedIc, MainTogglearrowClosedIc } from './../../../assets/svgs';
import { faqDataPropTypes } from './../constants/faqData';

const FaqDropdown = ({ id, question, answer }: faqDataPropTypes) => {
  const [dropDownOpened, setDropdDownOpened] = useState(false);

  const handleDropDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdDownOpened(!dropDownOpened);
  };

  return (
    <FaqWrapper>
      <DropdownLayout onClick={handleDropDown}>
        <QuestionAnswerBox key={id}>
          <Question>
            <TextWrapper>
              <QuestionMarkText>Q.</QuestionMarkText>
              <QuestionText>{question}</QuestionText>
            </TextWrapper>
            <ToggleWrapper>
              {dropDownOpened ? <MainTogglearrowClosedIc /> : <MainToggleArrowOpenedIc />}
            </ToggleWrapper>
          </Question>
          {dropDownOpened && <AnswerTextBox>{answer}</AnswerTextBox>}
        </QuestionAnswerBox>
      </DropdownLayout>
    </FaqWrapper>
  );
};

export default FaqDropdown;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: cneter;
  width: 1.4rem;
  height: 1.4rem;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
const FaqWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.4rem;
`;

const DropdownLayout = styled.section`
  width: fit-content;
  width: 87.4rem;
  padding: 2.4rem 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    min-width: 33.5rem;
    max-width: 81rem;
  }
`;

// const FaqContainer = styled.div`

// `;

const QuestionAnswerBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  /* position: relative; */
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;

  & > svg {
    /* position: absolute;
    right: 0; */
  }
`;

const QuestionMarkText = styled.p`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title5};

  @media ${MOBILE_MEDIA_QUERY} {
    font-weight: 400;
    font-size: 14px;

    /* mBody 2 */

    font-style: normal;
    line-height: 140%; /* 19.6px */
  }
`;

const QuestionText = styled.p`
  ${({ theme }) => theme.fonts.title5};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 85%;

    font-weight: 600;
    font-size: 16px;

    /* mTitle 6 */

    font-style: normal;
  }
`;

const AnswerTextBox = styled.div`
  padding: 1.6rem 2.8rem 0;

  color: ${({ theme }) => theme.colors.gray80};
  white-space: pre-wrap;
  word-break: keep-all;

  user-select: none;

  ${({ theme }) => theme.fonts.body3};
`;
