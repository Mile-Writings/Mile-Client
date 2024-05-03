import styled from '@emotion/styled';

import { MainOnBoardingIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const OnBoarding = () => {
  return (
    <OnBoardingWrapper>
      <OnBoardingIcWithTextLayout>
        <TextLayout>
          <MainText>글 모임을 위한 글쓰기 공간, 마일</MainText>
          <Spacing marginBottom="1.4" />
          <SubText>
            마일은 글쓰기를 쉽고 편안하게 만들어 주는 공간이에요.
            <br />
            모임원들과 함께 글을 쓰면서 여러분만의 공간을 만들어 보세요.
          </SubText>
        </TextLayout>
        <Spacing marginBottom="3.2" />
        <MainOnBoardingIcon />
      </OnBoardingIcWithTextLayout>
    </OnBoardingWrapper>
  );
};

export default OnBoarding;

const OnBoardingWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 6.8rem 21.8rem 4.8rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

const OnBoardingIcWithTextLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
`;

const MainText = styled.p`
  justify-content: flex-start;
  width: fit-content;
  ${({ theme }) => theme.fonts.title12};
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle7};
`;

const MainOnBoardingIcon = styled(MainOnBoardingIc)`
  padding: 0 2.2rem;
`;
