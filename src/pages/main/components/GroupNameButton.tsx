import styled from '@emotion/styled';

import { MainIcnArrowPurple as MainIcnArrowPurpleIcon } from '../../../assets/svgs';

interface ButtonPropTypes {
  buttonName: string;
}
const GroupNameButton = ({ buttonName }: ButtonPropTypes) => {
  const handleButtonOnClick = () => {
    alert('button clicked');
  };

  return (
    <GroupNameButtonWrapper onClick={handleButtonOnClick}>
      {buttonName}
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
