import styled from '@emotion/styled';

import { FooterLogoSvg, FooterInstaSvg, FooterKakaoSvg, FooterMailSvg } from './assets/svgs';
import Spacing from './components/commons/Spacing';

const Footer = () => {
  return (
    <Wrapper>
      <Layout>
        <FooterLogoSvg />
        <MileText>Make it look easy, 글쓰기를 쉽고 편안하게</MileText>
      </Layout>
      <Layout>
        <IconContainer>
          <FooterMailSvg />
          <FooterKakaoSvg />
          <FooterInstaSvg />
        </IconContainer>
        <Spacing marginBottom="2rem" />
      </Layout>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 136.7rem;
  height: 24.6rem;
  padding: 8rem 16.5rem;

  background-color: ${({ theme }) => theme.colors.grayViolet};
  border: 1px solid red;
`;

const Layout = styled.div`
  width: 24.5rem;
  height: 8.09rem;
`;

const MileText = styled.div`
  width: 24.3rem;
  height: 8.09rem;

  ${({ theme }) => theme.colors.gray80}
  ${({ theme }) => theme.fonts.body6}
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: flex-end;
  height: 2.4rem;
`;
