import React, { useState } from 'react';

import styled from '@emotion/styled';

import { MainToggleArrowOpenedIc, MainTogglearrowClosedIc } from './../../../assets/svgs';
import FaqTitle from './FaqTitle';

const FaqDropdown = () => {
  const [dropDownOpened, setDropdDownOpened] = useState(false);

  const handleDropDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdDownOpened(!dropDownOpened);
  };

  return (
    <FaqWrapper>
      <FaqTitle />
      <DropdownLayout onClick={handleDropDown}>
        <FaqContainer>
          <QuestionBox>
            <QuestionMarkText>Q.</QuestionMarkText>
            <QuestionText>작자미상과 필명은 무엇이 다른가요?</QuestionText>
            {dropDownOpened ? <MainToggleArrowOpenedIc /> : <MainTogglearrowClosedIc />}
          </QuestionBox>
          {dropDownOpened && (
            <AnswerTextBox>
              작자미상은 글쓴이가 누군지 알 수 없는 철저한 익명의 상태입니다. 작자미상으로 글을
              쓰면, 유저는 글쓴이의 어떠한 정보도 모른 채 글의 제목과 내용만을 볼 수 있습니다. 반면,
              필명은 모임 안에서 사용되는 닉네임으로 글쓴이를 표현하는 기능입니다. 필명으로 글을
              쓰면 유저들은 글쓴이가 설정한 필명 및 소개도 볼 수 있습니다. 자신을 완전히 드러내 글을
              쓰고 싶다면, 필명을 실명으로 설정하는 방법도 있답니다.
            </AnswerTextBox>
          )}
        </FaqContainer>
      </DropdownLayout>
    </FaqWrapper>
  );
};

export default FaqDropdown;

const FaqWrapper = styled.section``;

const DropdownLayout = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 2.4rem 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

const FaqContainer = styled.div`
  width: 85.3rem;
`;

const QuestionBox = styled.div`
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
  padding: 1.6rem 2.8rem 2.4rem;
  ${({ theme }) => theme.fonts.body3};
`;
