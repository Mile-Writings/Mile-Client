import styled from '@emotion/styled';

import { ErrorIc } from '../../assets/svgs';
import Spacing from '../../components/commons/Spacing';

const Error = () => {
  return (
    <ErrorWrapper>
      <ErrorIc />
      <Spacing marginBottom="2.8" />
      <Title>페이지를 찾지 못했어요</Title>
      <Spacing marginBottom="1.2" />
      <SubTitle>
        문제가 발생하여 페이지를 찾지 못했어요. <br />
        관련 문의사항은 <HyperLinkText href="">이곳으로</HyperLinkText> 남겨주시면 빠르게
        해결할게요.
      </SubTitle>
      <Spacing marginBottom="4.8" />
      <BackToPrevPageButton>이전 페이지로 가기</BackToPrevPageButton>
    </ErrorWrapper>
  );
};

export default Error;

const ErrorWrapper = styled.div``;

const Title = styled.div``;

const SubTitle = styled.div``;

const HyperLinkText = styled.a``;

const BackToPrevPageButton = styled.button``;
