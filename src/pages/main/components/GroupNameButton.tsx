import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { MainIcnArrowBlack as MainIcnArrowBlackIcon } from '../../../assets/svgs';

interface ButtonPropTypes {
  groupName: string;
  groupId: string | undefined;
}
const GroupNameButton = ({ groupId, groupName }: ButtonPropTypes) => {
  const navigate = useNavigate();
  const handleButtonOnClick = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <GroupNameButtonWrapper onClick={handleButtonOnClick}>
      {groupName}
      <MainIcnArrowBlackIcon />
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
    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
