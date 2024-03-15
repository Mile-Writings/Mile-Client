import styled from '@emotion/styled';
import { useState } from 'react';

import { MakeGroupPlusBtn, MakeGroupPlusHoverBtn } from '../../../assets/svgs';

const CreateGroupBtn = () => {
  const [showHoverIcon, setShowHoverIcon] = useState(false);
  return (
    <CreateGroupBtnWrapper
      onMouseOver={() => setShowHoverIcon(true)}
      onMouseLeave={() => setShowHoverIcon(false)}
      onClick={() => alert('아직 준비중인 기능이에요')}
    >
      {showHoverIcon ? <MakeGroupPlusHoverBtn /> : <MakeGroupPlusBtn />} 글모임 만들기
    </CreateGroupBtnWrapper>
  );
};

export default CreateGroupBtn;

const CreateGroupBtnWrapper = styled.button`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  border-radius: 8px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 16%);
    transform: scale(0.95);

    transition: 0.5s;
  }
  ${({ theme }) => theme.fonts.button3};

  :active {
    transform: scale(1.1);

    transition: 0.5s;
  }
`;
