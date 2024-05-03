import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { ErrorIc } from '../../assets/svgs';
import Spacing from '../../components/commons/Spacing';

const Error = () => {
  const navigate = useNavigate();
  const handlePrevPage = () => {
    navigate('/');
  };

  return (
    <ErrorWrapper>
      <ErrorIc />
      <Spacing marginBottom="0.8" />
      <Title>페이지를 찾지 못했어요</Title>
      <Spacing marginBottom="1.2" />
      <SubTitle>
        문제가 발생하여 페이지를 찾지 못했어요. <br />
        관련 문의사항은 <HyperLinkText href="https://walla.my/milewriting">
          이곳으로
        </HyperLinkText>{' '}
        남겨주시면 빠르게 해결할게요.
      </SubTitle>
      <Spacing marginBottom="4.8" />
      <BackToPrevPageBtn onClick={handlePrevPage}>이전 페이지로 가기</BackToPrevPageBtn>
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
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title5};
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.gray80};
  text-align: center;
  ${({ theme }) => theme.fonts.subtitle4};
`;

const HyperLinkText = styled.a`
  text-decoration: underline;
  ${({ theme }) => theme.fonts.subtitle2};
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
`;
