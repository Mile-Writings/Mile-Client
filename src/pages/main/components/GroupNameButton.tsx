import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { MainIcnArrowPurple as MainIcnArrowPurpleIcon } from '../../../assets/svgs';

interface ButtonPropTypes {
  groupName: string;
  groupId: string;
}
const GroupNameButton = ({ groupId, groupName }: ButtonPropTypes) => {
  const navigate = useNavigate();
  const handleButtonOnClick = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <GroupNameButtonWrapper onClick={handleButtonOnClick}>
      {groupName}
      <MainIcnArrowPurpleIcon />
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

  color: ${({ theme }) => theme.colors.mainViolet};

  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.subtitle2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
