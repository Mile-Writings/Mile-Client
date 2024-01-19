import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { INTRODUCTION_DATA } from '../constants/introductionData';

import {
  MainIcnArrowWhite as MainArrowWhiteIc,
  MainGraphicLogo as MainGraphicLogoIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const Introduction = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/group/MQ==');
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
        <SubText>{INTRODUCTION_DATA[0].subText}</SubText>
        <Spacing marginBottom="8" />
        <GroupRoutingButtonBox onClick={handleOnClick}>
          마일 글 모임 바로가기
          <MainArrowWhiteIc />
        </GroupRoutingButtonBox>
      </MileMakersTextLayout>
      <IntroduceZakmiBox>
        <HookText>{INTRODUCTION_DATA[0].hookText}</HookText>
        <Spacing marginBottom="0.4" />
        <GreetingText>{INTRODUCTION_DATA[0].greetingText}</GreetingText>
        <Spacing marginBottom="3" />
        <DiscriptionText>{INTRODUCTION_DATA[0].discriptionText}</DiscriptionText>
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
  width: 100%;
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

    background-color: ${({ theme }) => theme.colors.middleViolet};

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
