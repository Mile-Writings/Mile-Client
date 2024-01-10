import styled from '@emotion/styled';

import { MainGroupRoutingBtn as MainGroupRoutingBtnIcon } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const Curious = () => {
  const handleOnClick = () => {
    alert('Button Clicked!');
  };

  return (
    <CuriousContentContainer>
      <CuriousGroupText>
        이 모임에 대해서
        <br /> 더 궁금하신가요?
      </CuriousGroupText>
      <Spacing marginBottom="1.6" />
      <GroupRoutingBtnBox>
        <MainGroupRoutingBtnIcon onClick={handleOnClick} />
      </GroupRoutingBtnBox>
    </CuriousContentContainer>
  );
};

export default Curious;

const CuriousContentContainer = styled.section`
  display: flex;
  padding-left: 4.2rem;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const CuriousGroupText = styled.p`
  width: 12.3rem;
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title8};
`;

const GroupRoutingBtnBox = styled.div`
  &:hover {
    path {
      fill: ${({ theme }) => theme.colors.mileViolet};
    }
  }
`;
