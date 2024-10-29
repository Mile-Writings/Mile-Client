import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/commons/Button';

interface TodayInfoPropTypes {
  topicId: string;
  topicName: string;
  content: string;
}

interface GroupTodayWriteStylePropTypes {
  todayInfo: TodayInfoPropTypes | undefined;
  isMember: boolean | undefined; //나의 글 작성하기 권한 확인
  groupId: string | undefined; //오늘의 주제
}

const GroupTodayWriteStyle = (props: GroupTodayWriteStylePropTypes) => {
  const navigate = useNavigate();

  const { todayInfo, isMember, groupId } = props;

  const handleNavigatePostPage = () => {
    navigate(`/post/${groupId}/post`);
  };

  return (
    <TodayWriteStyleWrapper>
      <TextLayout>
        <MainText>{todayInfo?.topicName}</MainText>
        <SubText>
          오늘의 주제는 <SubBoldText>{todayInfo?.content}</SubBoldText> 입니다.
        </SubText>
      </TextLayout>
      {isMember && (
        <Button typeName="writingFlowType" onClick={handleNavigatePostPage}>
          나의 글 작성하러가기
        </Button>
      )}
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

  ${({ theme }) => theme.fonts.subtitle4};
`;

const SubBoldText = styled.span`
  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.title8};
`;
