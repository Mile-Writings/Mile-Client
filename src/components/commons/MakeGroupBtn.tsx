import { useState } from 'react';

import styled from '@emotion/styled';

import { MakeGroupPlusBtn, MakeGroupPlusHoverBtn } from '../../assets/svgs';

const MakeGroupBtn = () => {
  const [showHoverIcon, setShowHoverIcon] = useState(false);
  return (
    <MakeGroupBtnWrapper
      onMouseOver={() => setShowHoverIcon(true)}
      onMouseLeave={() => setShowHoverIcon(false)}
    >
      {showHoverIcon ? <MakeGroupPlusHoverBtn /> : <MakeGroupPlusBtn />}
    </MakeGroupBtnWrapper>
  );
};

export default MakeGroupBtn;

const MakeGroupBtnWrapper = styled.button`
  color: ${({ theme }) => theme.colors.mileViolet};

  background-color: ${({ theme }) => theme.colors.mainViolet};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
  ${({ theme }) => theme.fonts.button3};
`;
