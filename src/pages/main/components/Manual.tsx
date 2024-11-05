import styled from '@emotion/styled';

import Spacing from '../../../components/commons/Spacing';
import { MAIN_MANUAL_IMG_URL, MAIN_MANUAL_WEBP_URL } from '../constants/mainManualImgURL';

const Manual = () => {
  return (
    <ManualWrapper>
      <ManualTitle>마일 메뉴얼</ManualTitle>
      <Spacing marginBottom="3.6" />
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
`;

const ManualTitle = styled.h1`
  display: flex;
  margin-top: 10rem;
  ${({ theme }) => theme.fonts.title3};

  cursor: default;
`;

const ManualLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 92.8rem;
`;

const ManualImg = styled.img`
  width: 29.6rem;
  height: 37.2rem;
`;
