import styled from '@emotion/styled';

import { FOOTER_LINK } from '../../constants/footerLink';
import Spacing from './Spacing';

import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';
import {
  FooterInstaIc,
  FooterLogoIc,
  FooterMailIc,
  FooterNotionIc,
  FooterWallaIc,
} from './../../assets/svgs';
import theme from './../../styles/theme';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLogoLayout>
        <FooterLogoIc />
        <Spacing marginBottom="1.6" />
        <MileText>Make it look easy, 글쓰기를 쉽고 편안하게</MileText>
      </FooterLogoLayout>
      <FooterLayout>
        <IconContainer>
          <a href={FOOTER_LINK.MAIL} target="_blank">
            <FooterMailIc />
          </a>
          <a href={FOOTER_LINK.INSTAGRAM} target="_blank">
            <FooterInstaIc />
          </a>
          <a href={FOOTER_LINK.NOTION} target="_blank">
            <FooterNotionIc />
          </a>
          <a href={FOOTER_LINK.WALLA} target="_blank">
            <FooterWallaIc />
          </a>
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

  /* min-width: 136.7rem; */
  height: 24.6rem;
  padding: 8rem 16.5rem;

  background-color: ${({ theme }) => theme.colors.grayViolet};

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 4rem;
    align-items: center;
    height: fit-content;
    padding: 5rem;
  }
`;

const FooterLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 24.5rem;
  height: 8.6rem;

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: flex-start;
  }
`;

const FooterLogoLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 24.5rem;
  height: 8.6rem;
`;

const FooterBox = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  width: 24.5rem;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
  }
`;

const MileText = styled.div`
  height: 1.7rem;

  color: ${theme.colors.gray80};

  ${({ theme }) => theme.fonts.body6}
`;

const MilePrivacy = styled.div`
  display: flex;
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
  height: 2.4rem;
`;
