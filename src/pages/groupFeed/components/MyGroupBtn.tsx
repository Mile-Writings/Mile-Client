import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { groupContentPropTypes } from '../../main/components/GroupContent';

const MyGroupBtn = ({ groupId }: groupContentPropTypes) => {
  const navigate = useNavigate();
  const handleRoutingGroupFeed = () => {
    navigate(`/group/${groupId}`);
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
