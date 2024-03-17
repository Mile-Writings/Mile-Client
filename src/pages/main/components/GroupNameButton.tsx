import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  MainIcnArrowBlack as MainIcnArrowBlackIcon,
  MainIcnArrowPurple as MainIcnArrowPurpleIcon,
} from '../../../assets/svgs';

interface ButtonPropTypes {
  groupName: string;
  groupId: string | undefined;
}
const GroupNameButton = ({ groupId, groupName }: ButtonPropTypes) => {
  const navigate = useNavigate();
  const handleButtonOnClick = () => {
    navigate(`/group/${groupId}`);
  };
  const [IsHovered, setIsHovered] = useState<boolean>(false);

  return (
    <GroupNameButtonWrapper
      onClick={handleButtonOnClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {groupName}
      {IsHovered ? <MainIcnArrowPurpleIcon /> : <MainIcnArrowBlackIcon />}
    </GroupNameButtonWrapper>
  );
};

export default GroupNameButton;

const GroupNameButtonWrapper = styled.button`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0.6rem 1rem;

  color: ${({ theme }) => theme.colors.black};

  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.subtitle2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.white};
  }
`;
