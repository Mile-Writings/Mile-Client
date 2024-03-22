import styled from '@emotion/styled';

import { EditIc, DeleteIc } from '../../assets/svgs';

const EachTopic = () => {
  return (
    <TopicWrapper>
      <TopicData>
        <Topic>
          <TopicTitle>인생을 똑바로 사는법</TopicTitle>
          <TopicDate>2023.03.04</TopicDate>
        </Topic>
        <TopicTag>인생</TopicTag>
        <TopicDescription>
          안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이
        </TopicDescription>
      </TopicData>
      <TopicAction>
        <EditIc />
        <DeleteIc />
      </TopicAction>
    </TopicWrapper>
  );
};

export default EachTopic;

const TopicWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
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
  display: -webkit-box;
  width: 29rem;
  height: 4.8rem;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.body8};
`;

const TopicAction = styled.div`
  display: flex;
  gap: 0.8rem;
`;
