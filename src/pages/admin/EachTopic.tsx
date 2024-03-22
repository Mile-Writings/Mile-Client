import styled from '@emotion/styled';
import React from 'react';

const EachTopic = () => {
  return (
    <TopicWrapper>
      <TopicData>
        <Topic>
          <TopicTitle>인생을 똑바로 사는법</TopicTitle>
          <TopicDate>2023.03.04</TopicDate>
        </Topic>
        <TopicTag>인생</TopicTag>
        <TopicDescription>본인의 인생 사는 기준을 말해주세요</TopicDescription>
      </TopicData>
    </TopicWrapper>
  );
};

export default EachTopic;

const TopicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: center;
  width: 74.5rem;
  height: 8.4rem;
`;

const TopicData = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  width: 64.9rem;
  height: 5.2rem;
`;

const Topic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 20.8rem;
  padding: 0.6rem 0;

  border: 1px solid red;
`;

const TopicTitle = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body1};
`;

const TopicDate = styled.p`
  color: ${({ theme }) => theme.colors.gray60};
  ${({ theme }) => theme.fonts.body6};
`;

const TopicTag = styled.p`
  width: 7rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body1};
  text-align: center;
`;

const TopicDescription = styled.p`
  width: 29rem;

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.body8};
`;
