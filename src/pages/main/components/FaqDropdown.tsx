import React, { useState } from 'react';

import styled from '@emotion/styled';

import { MainToggleArrowOpenedIc } from '../../../assets/svgs';

const FaqDropdown = () => {
  const [dropDown, setDropdDown] = useState(false);

  const handleDropDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdDown(!dropDown);
  };

  return (
    <FaqWrapper>
      <TitleText>자주 묻는 질문</TitleText>
      <DropdownContainer>
        <QuestionTextBox>
          <QuestionMarkText>Q.</QuestionMarkText>
          <QuestionText>작자미상으로 글을 써도 다른 사람들이 알 수 있나요?</QuestionText>
        </QuestionTextBox>
        <MainToggleArrowOpenedIc onClick={handleDropDown} />
      </DropdownContainer>
    </FaqWrapper>
  );
};

export default FaqDropdown;

const FaqWrapper = styled.section``;

const TitleText = styled.p`
  ${({ theme }) => theme.fonts.title3};
`;

const DropdownContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 2.4rem 2.8rem;

  background-color: ${({ theme }) => theme.colors.gray30};
`;

const QuestionTextBox = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 85.3rem;
`;

const QuestionMarkText = styled.p`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title5};
`;

const QuestionText = styled.p`
  ${({ theme }) => theme.fonts.title5};
`;
