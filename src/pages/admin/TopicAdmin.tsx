import styled from '@emotion/styled';
import React from 'react';

const TopicAdmin = () => {
  return (
    <TopicListWrapper>
      <TopicAdminCategory>
        <Topic>글감</Topic>
        <TopicTag>글감 태그</TopicTag>
        <TopicDescription>글감 설명</TopicDescription>
      </TopicAdminCategory>
    </TopicListWrapper>
  );
};

export default TopicAdmin;

const TopicListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.1rem;
  height: 39.2rem;

  border: 1px solid red;
`;

const TopicAdminCategory = styled.ul`
  display: flex;
  gap: 4rem;
  align-items: center;
  height: 4.8rem;
  padding: 0 1.8rem;

  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button3};

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 8px 8px 0 0;
`;

const Topic = styled.li`
  width: 20.8rem;
`;

const TopicTag = styled.li`
  width: 7rem;

  text-align: center;
`;

const TopicDescription = styled.li`
  width: 21.3rem;
`;
