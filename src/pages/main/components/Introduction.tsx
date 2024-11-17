import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainIcnArrowWhite as MainArrowWhiteIc,
  MainGraphicLogo as MainGraphicLogoIc,
  MainIcnArrowPurple as MainIcnArrowPurpleIcon,
} from '../../../assets/svgs';
import Responsive from '../../../components/commons/Responsive/Responsive';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import { INTRODUCTION_DATA } from '../constants/introductionData';

const Introduction = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/group/Mzg=');
  };
  const [IsHovered, setIsHovered] = useState(false);

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
        <Responsive only="desktop">
          <Spacing marginBottom="8" />

          <GroupRoutingButton
            type="button"
            onClick={handleOnClick}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            마일 글 모임 바로가기
            {IsHovered ? <MainIcnArrowPurpleIcon /> : <MainArrowWhiteIc />}
          </GroupRoutingButton>
        </Responsive>
      </MileMakersTextLayout>
      <IntroduceMileLayout>
        <HookText>{INTRODUCTION_DATA[0].hookText}</HookText>
        <Spacing marginBottom="0.4" />
        <GreetingText>{INTRODUCTION_DATA[0].greetingText}</GreetingText>
        <Spacing marginBottom="3" />
        <DiscriptionText>{INTRODUCTION_DATA[0].discriptionText}</DiscriptionText>
      </IntroduceMileLayout>

      <Responsive only="mobile" asChild>
        <ButtonWrapper>
          <GroupRoutingButton
            type="button"
            onClick={handleOnClick}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            마일 글 모임 바로가기
            {IsHovered ? <MainIcnArrowPurpleIcon /> : <MainArrowWhiteIc />}
          </GroupRoutingButton>
        </ButtonWrapper>
      </Responsive>
    </IntroductionWrapper>
  );
};

export default Introduction;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 40rem;
`;
const IntroductionWrapper = styled.section`
  display: flex;
  gap: 10.2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10rem 21.8rem 10rem 28.4rem;

  background-color: ${({ theme }) => theme.colors.backGroundViolet};

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 3rem;
    padding: 4.6rem 2rem;
  }
`;

const MileMakersTextLayout = styled.div`
  display: flex;
  flex-direction: column;

  white-space: nowrap;
`;

const MainText = styled.h1`
  ${({ theme }) => theme.fonts.title3};
`;

const SubText = styled.span`
  color: ${({ theme }) => theme.colors.darkViolet};
  ${({ theme }) => theme.fonts.subtitle3};
`;

const GroupRoutingButton = styled.button`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: fit-content;
  padding: 0.6rem 1rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button1};

  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 0.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};
    ${({ theme }) => theme.fonts.button1};

    background-color: ${({ theme }) => theme.colors.white};

    transition: all 0.5s;
  }
`;

const IntroduceMileLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  padding: 3.6rem;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
  border-radius: 1rem;
`;

const HookText = styled.span`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const GreetingText = styled.span`
  white-space: nowrap;
  ${({ theme }) => theme.fonts.title5};
`;

const DiscriptionText = styled.p`
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body3};
`;
