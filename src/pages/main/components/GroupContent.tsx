import styled from '@emotion/styled';

import Spacing from '../../../components/commons/Spacing';

const GroupContent = () => {
  return (
    <ContentBox>
      <Topic>글쓰기 주제가 입력될 공간</Topic>
      <MainText>작성된 글의 제목이 들어갈 공간입니다.</MainText>
      <Spacing marginBottom="3.2" />
      <SubText>
        텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가
        들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈
        공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈
        공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈
        공간입니...
      </SubText>
    </ContentBox>
  );
};

export default GroupContent;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.6rem;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body6};
`;

const MainText = styled.div`
  ${({ theme }) => theme.fonts.title10};
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body3};
`;
