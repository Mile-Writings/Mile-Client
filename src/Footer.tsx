import styled from '@emotion/styled';

import { FooterLogoSvg, FooterInstaSvg, FooterKakaoSvg, FooterMailSvg } from './assets/svgs';
import Spacing from './components/commons/Spacing';
import theme from './styles/theme';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLayout>
        <FooterLogoSvg />
        <Spacing marginBottom="1.6rem" />
        <MileText1>Make it look easy, 글쓰기를 쉽고 편안하게</MileText1>
      </FooterLayout>
      <FooterLayout>
        <IconContainer>
          <FooterMailSvg />
          <FooterKakaoSvg />
          <FooterInstaSvg />
        </IconContainer>
        <Spacing marginBottom="2rem" />
        <MileText2>이용약관 및 개인정보 취급방침</MileText2>
        <Spacing marginBottom="0.8rem" />
        <FooterBox>
          <MileText1>Made by ZAKMI 2024</MileText1>
          <MileText3>© 마일 MILE</MileText3>
        </FooterBox>
      </FooterLayout>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 136.7rem;
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

const MileText1 = styled.div`
  height: 1.7rem;

  color: ${theme.colors.gray80};

  ${({ theme }) => theme.fonts.body6}
`;

const MileText2 = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 1.7rem;

  color: ${theme.colors.gray70};

  ${({ theme }) => theme.fonts.body6}
`;

const MileText3 = styled.span`
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
