import styled from '@emotion/styled';

import { FooterLogoSvg, FooterInstaSvg, FooterKakaoSvg, FooterMailSvg } from './assets/svgs';

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
  width: 24.3rem;
  height: 8.09rem;
`;
