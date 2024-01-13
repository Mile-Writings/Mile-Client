import styled from '@emotion/styled';

import { FooterInstaIc, FooterKakaoIc, FooterLogoIc, FooterMailIc } from './../../assets/svgs';
import theme from './../../styles/theme';

import Spacing from './Spacing';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLayout>
        <FooterLogoIc />
        <Spacing marginBottom="1.6" />
        <MileText>Make it look easy, 글쓰기를 쉽고 편안하게</MileText>
      </FooterLayout>
      <FooterLayout>
        <IconContainer>
          <FooterMailIc />
          <FooterKakaoIc />
          <FooterInstaIc />
        </IconContainer>
        <Spacing marginBottom="2" />
        <MilePrivacy>이용약관 및 개인정보 취급방침</MilePrivacy>
        <Spacing marginBottom="0.8" />
        <FooterBox>
          <MileText>Made by ZAKMI 2024</MileText>
          <MileCopyright>© 마일 MILE</MileCopyright>
        </FooterBox>
      </FooterLayout>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 136.7rem;
  height: 24.6rem;
  padding: 8rem 16.5rem;

  background-color: ${({ theme }) => theme.colors.grayViolet};
`;

const FooterLayout = styled.div`
  width: 24.5rem;
  height: 8.6rem;
`;

const FooterBox = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  width: 24.5rem;
`;

const MileText = styled.div`
  height: 1.7rem;

  color: ${theme.colors.gray80};

  ${({ theme }) => theme.fonts.body6}
`;

const MilePrivacy = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 1.7rem;

  color: ${theme.colors.gray70};

  ${({ theme }) => theme.fonts.body6}
`;

const MileCopyright = styled.span`
  height: 1.7rem;

  color: ${theme.colors.gray80};

  ${({ theme }) => theme.fonts.body5}
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: flex-end;
  height: 2.4rem;
`;
