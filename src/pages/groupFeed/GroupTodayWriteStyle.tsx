import styled from '@emotion/styled';

import Button from '../../components/commons/Button';

const GroupTodayWriteStyle = () => {
  const onHandleSubmit = () => {
    console.log('submit');
  };
  return (
    <TodayWriteStyleWrapper>
      <TextLayout>
        <MainText>글감 카테고리 자리</MainText>
        <SubText>
          오늘의 주제는 <SubBoldText>글감자리</SubBoldText> 입니다.
        </SubText>
      </TextLayout>
      <Button typeName="writingFlowType" onClick={onHandleSubmit}>
        {' '}
        나의 글 작성하러가기{' '}
      </Button>
    </TodayWriteStyleWrapper>
  );
};

export default GroupTodayWriteStyle;

const TodayWriteStyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 8px;
`;

const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MainText = styled.div`
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title6};
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.colors.gray80};

  ${({ theme }) => theme.fonts.title8};
`;

const SubBoldText = styled.span`
  color: ${({ theme }) => theme.colors.gray90};
`;
