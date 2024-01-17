import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { groupPropTypes } from '../../main/apis/getGroupContent';

const MyGroupBtn = ({ moimId }: groupPropTypes) => {
  const navigate = useNavigate();
  const handleRoutingGroupFeed = () => {
    navigate(`/group/${moimId}`);
  };

  return <MyGroupBtnWrapper onClick={handleRoutingGroupFeed}>내 글 모임</MyGroupBtnWrapper>;
};

export default MyGroupBtn;

const MyGroupBtnWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 6.2rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  cursor: pointer;

  ${({ theme }) => theme.fonts.subtitle6}

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};
  }
`;
