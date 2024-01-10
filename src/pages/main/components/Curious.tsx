import styled from '@emotion/styled';

import { MainGroupRoutingBtn } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const Curious = () => {
  return (
    <CuriousContentContainer>
      <CuriousGroupText>
        이 모임에 대해서
        <br /> 더 궁금하신가요?
      </CuriousGroupText>
      <Spacing marginBottom="1.6" />
      <GroupRoutingBtnBox>
        <MainGroupRoutingBtn />
      </GroupRoutingBtnBox>
    </CuriousContentContainer>
  );
};

export default Curious;

const CuriousContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const CuriousGroupText = styled.p`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title8};
`;

const GroupRoutingBtnBox = styled.div`
  & > MainGroupRoutingBtn:hover {
    fill: ${({ theme }) => theme.colors.mileGreen};
  }
`;
