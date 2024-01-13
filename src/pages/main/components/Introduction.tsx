import styled from '@emotion/styled';

import {
  MainIcnArrowWhite as MainArrowWhiteIc,
  MainGraphicLogo as MainGraphicLogoIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const Introduction = () => {
  const handleOnClick = () => {
    alert('Button Clicked!');
  };

  return (
    <IntroductionWrapper>
      <MileMakersTextLayout>
        <MainGraphicLogoIc />
        <Spacing marginBottom="2.9" />
        <MainText>
          마일은 어떻게 만들어졌을까? <br />
          마일 메이커들의 에피소드
        </MainText>
        <Spacing marginBottom="0.8" />
        <SubText>메이커들의 글 모임에서 확인해 보세요</SubText>
        <Spacing marginBottom="8" />
        <GroupRoutingButtonBox onClick={handleOnClick}>
          마일 글 모임 바로가기
          <MainArrowWhiteIc />
        </GroupRoutingButtonBox>
      </MileMakersTextLayout>
      <IntroduceZakmiBox>
        <HookText>마일의 첫 번째 에피소드</HookText>
        <Spacing marginBottom="0.4" />
        <GreetingText>우리가 글쓰기 모임에 주목한 이유</GreetingText>
        <Spacing marginBottom="3" />
        <DiscriptionText>
          “체취가 느껴지는 글은 오랜만에 읽어보는 것 같아. 솔직담백해서 좋다!” 내가 처음으로 올린
          블로그 글에 친구가 달아준 댓글이었다. 사실 글쓰기에 중요한 건, ‘잘’ 쓰는 것이 아니라 그냥
          내 마음을 담아 쓰는 것이라는 걸 알게 됐었다. 그리고 그렇게 마음을 담은 글...
        </DiscriptionText>
      </IntroduceZakmiBox>
    </IntroductionWrapper>
  );
};

export default Introduction;

const IntroductionWrapper = styled.section`
  display: flex;
  gap: 7.4rem;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  padding: 10.1rem 21.8rem 10rem 28.4rem;

  background-color: ${({ theme }) => theme.colors.mileViolet};
`;

const MileMakersTextLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainText = styled.p`
  width: fit-content;

  white-space: nowrap;
  ${({ theme }) => theme.fonts.title3};
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.darkViolet};
  ${({ theme }) => theme.fonts.subtitle3};
`;

const GroupRoutingButtonBox = styled.button`
  display: inline-flex;
  gap: 0.8rem;
  align-items: center;
  width: fit-content;
  height: 3.6rem;
  padding: 0.6rem 1rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button1};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 0.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};
    ${({ theme }) => theme.fonts.button1};

    background-color: ${({ theme }) => theme.colors.mileViolet};

    & > svg {
      path {
        stroke: ${({ theme }) => theme.colors.mainViolet};
      }
    }
  }
`;

const IntroduceZakmiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  height: 26.7rem;
  padding: 3.6rem;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
  border-radius: 1rem;
`;

const HookText = styled.p`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const GreetingText = styled.p`
  width: fit-content;

  white-space: nowrap;
  ${({ theme }) => theme.fonts.title5};
`;

const DiscriptionText = styled.p`
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body3};
`;
