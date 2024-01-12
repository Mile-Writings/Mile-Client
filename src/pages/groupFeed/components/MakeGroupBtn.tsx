import { useState } from 'react';

import styled from '@emotion/styled';

import { MakeGroupPlusBtn, MakeGroupPlusHoverBtn } from '../../../assets/svgs';

const MakeGroupBtn = () => {
  const [showHoverIcon, setShowHoverIcon] = useState(false);
  return (
    <MakeGroupBtnWrapper
      onMouseOver={() => setShowHoverIcon(true)}
      onMouseLeave={() => setShowHoverIcon(false)}
    >
      {showHoverIcon ? <MakeGroupPlusHoverBtn /> : <MakeGroupPlusBtn />} 글모임 만들기
    </MakeGroupBtnWrapper>
  );
};

export default MakeGroupBtn;

const MakeGroupBtnWrapper = styled.button`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.mileViolet};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  cursor: pointer;
  border-radius: 8px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
  ${({ theme }) => theme.fonts.button3};
`;
