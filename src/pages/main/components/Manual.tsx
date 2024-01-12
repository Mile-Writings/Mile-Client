import styled from '@emotion/styled';

import Spacing from '../../../components/commons/Spacing';

const Manual = () => {
  return (
    <ManualLayout>
      <TitleWithManualContainer>
        <ManualTitle>마일 메뉴얼</ManualTitle>
        <Spacing marginBottom="3.6" />
        <ManualBox>
          <ManualRow>
            <ManualItem />
            <ManualItem />
            <ManualItem />
          </ManualRow>
          <ManualRow>
            <ManualItem />
            <ManualItem />
            <ManualItem />
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

const ManualItem = styled.div`
  width: 29.6rem;
  height: 37.2rem;

  background-color: ${({ theme }) => theme.colors.darkViolet};
`;

const ManualRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;
