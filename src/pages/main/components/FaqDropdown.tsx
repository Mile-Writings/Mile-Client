import styled from '@emotion/styled';
import React, { useState } from 'react';

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
        <FaqContainer>
          <QuestionAnswerBox key={id}>
            <Question>
              <QuestionMarkText>Q.</QuestionMarkText>
              <QuestionText>{question}</QuestionText>
              {dropDownOpened ? <MainTogglearrowClosedIc /> : <MainToggleArrowOpenedIc />}
            </Question>
            {dropDownOpened && <AnswerTextBox>{answer}</AnswerTextBox>}
          </QuestionAnswerBox>
        </FaqContainer>
      </DropdownLayout>
    </FaqWrapper>
  );
};

export default FaqDropdown;

const FaqWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.4rem;
`;

const DropdownLayout = styled.section`
  width: fit-content;
  padding: 2.4rem 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  border-radius: 8px;
`;

const FaqContainer = styled.div`
  width: 87.4rem;
`;

const QuestionAnswerBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  & > svg {
    margin-left: auto;
  }
`;

const QuestionMarkText = styled.p`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title5};
`;

const QuestionText = styled.p`
  ${({ theme }) => theme.fonts.title5};
`;

const AnswerTextBox = styled.div`
  padding: 1.6rem 2.8rem 0;

  color: ${({ theme }) => theme.colors.gray80};
  word-break: keep-all;

  ${({ theme }) => theme.fonts.body3};
`;
