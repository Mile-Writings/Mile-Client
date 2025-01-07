import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Spacing from '../../components/commons/Spacing';
import errorIlust from '/src/assets/images/errorIlust.png';
import errorWebp from '/src/assets/webps/error.webp';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';

const Error = () => {
  const navigate = useNavigate();
  const handlePrevPage = () => {
    navigate('/');
  };

  return (
    <ErrorWrapper>
      <picture>
        <source srcSet={errorWebp} type="image/webp" />
        <ErrorImg src={errorIlust} />
      </picture>
      <Title>페이지를 찾지 못했어요</Title>
      <Spacing marginBottom="1.2" />
      <SubTitle>
        문제가 발생하여 페이지를 찾지 못했어요. <br />
        관련 문의사항은 <HyperLinkText href="https://walla.my/milewriting">
          이곳으로
        </HyperLinkText>{' '}
        남겨주시면 빠르게 해결할게요.
      </SubTitle>
      <BackToPrevPageBtn onClick={handlePrevPage}>홈으로 가기</BackToPrevPageBtn>
    </ErrorWrapper>
  );
};

export default Error;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.div`
  margin-top: 0.8rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title5};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 4.5rem;
    ${({ theme }) => theme.fonts.mTitle5};
  }
`;

const ErrorImg = styled.img`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 33.5rem;
    height: 16rem;
  }
`;

const SubTitle = styled.div`
  margin-bottom: 4.8rem;

  color: ${({ theme }) => theme.colors.gray80};
  text-align: center;

  ${({ theme }) => theme.fonts.subtitle4};
  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 17.9rem;
    ${({ theme }) => theme.fonts.mSubtitle3};
  }
`;

const HyperLinkText = styled.a`
  text-decoration: underline;

  ${({ theme }) => theme.fonts.subtitle2};
  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle3};
  }
`;

const BackToPrevPageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 8rem;
  max-width: 16rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.mileViolet};

  background-color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.button3};
  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 33.5rem;
    max-width: unset;
    height: 5.1rem;
  }
`;
