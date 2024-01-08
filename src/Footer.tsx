import styled from '@emotion/styled';

import { FooterLogoSvg } from './assets/svgs';

const Footer = () => {
  return (
    <Wrapper>
      footer
      <Layout>
        <FooterLogoSvg />
      </Layout>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 103.4rem;
  height: 8.6rem;
  padding: 8rem 16.5rem;

  border: 1px solid red;
`;

const Layout = styled.div`
  width: 24.3rem;
  height: 8.09rem;

  border: 1px solid yellow;
`;
