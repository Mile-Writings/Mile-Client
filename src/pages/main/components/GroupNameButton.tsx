import styled from '@emotion/styled';

import { MainIcnArrowPurple as MainIcnArrowPurpleIcon } from '../../../assets/svgs';

const GroupNameBtn = () => {
  return (
    <GroupNameButtonBox>
      글 모임 이름
      <MainIcnArrowPurpleIcon />
    </GroupNameButtonBox>
  );
};

export default GroupNameBtn;

const GroupNameButtonBox = styled.button`
  display: flex;
  gap: 0.8rem;
  padding: 0.6rem 1rem;
  align-items: center;
  border-radius: 0.8rem;
  justify-content: flex-start;

  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.subtitle2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
