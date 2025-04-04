import styled from '@emotion/styled';

import Responsive from '../../../components/commons/Responsive/Responsive';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import { MAIN_MANUAL_IMG_URL, MAIN_MANUAL_WEBP_URL } from '../constants/mainManualImgURL';
const Manual = () => {
  return (
    <ManualWrapper>
      <ManualTitle>마일 메뉴얼</ManualTitle>
      <Responsive only="desktop">
        <Spacing marginBottom="3.6" />
      </Responsive>
      <Responsive only="mobile">
        <Spacing marginBottom="1.8" />
      </Responsive>
      <ManualLayout>
        {MAIN_MANUAL_WEBP_URL.map((webpSrc, idx) => (
          <picture key={idx}>
            <source srcSet={webpSrc} type="image/webp" />
            <ManualImg src={MAIN_MANUAL_IMG_URL[idx]} alt={`매뉴얼 이미지 ${idx}`} />
          </picture>
        ))}
      </ManualLayout>
    </ManualWrapper>
  );
};

export default Manual;

const ManualWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 10rem;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 40rem;
  }
`;

const ManualTitle = styled.h1`
  display: flex;
  margin-top: 10rem;
  ${({ theme }) => theme.fonts.title3};

  cursor: default;

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle4};
  }
`;

const ManualLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 92.8rem;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.3rem;
    width: 100%;
  }
`;

const ManualImg = styled.img`
  width: 29.6rem;
  height: 37.2rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 19.2rem;
    height: 24rem;
  }

  @media screen and (width <= 400px) {
    width: 16.2rem;
    height: 20rem;
  }
`;
