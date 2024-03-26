import styled from '@emotion/styled';

import {
  MainManualCuriousIc,
  MainManualJoinIc,
  MainManualLookIc,
  MainManualMakeIc,
  MainManualShareIc,
  MainManualWriteIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const Manual = () => {
  return (
    <ManualLayout>
      <TitleWithManualContainer>
        <ManualTitle>마일 메뉴얼</ManualTitle>
        <Spacing marginBottom="3.6" />
        <ManualBox>
          <ManualRow>
            <MainManualMakeIc />
            <MainManualJoinIc />
            <MainManualWriteIc />
          </ManualRow>
          <ManualRow>
            <MainManualShareIc />
            <MainManualCuriousIc />
            <MainManualLookIc />
          </ManualRow>
        </ManualBox>
      </TitleWithManualContainer>
    </ManualLayout>
  );
};

export default Manual;

const ManualLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10rem;
`;

const TitleWithManualContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
`;

const ManualTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10rem;
  ${({ theme }) => theme.fonts.title3};
`;

const ManualBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 92.8rem;
`;

const ManualRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;
