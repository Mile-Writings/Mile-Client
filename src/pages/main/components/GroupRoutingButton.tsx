import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MainGroupRoutingBtn as MainGroupRoutingBtnIcon } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface groupRoutingPropTypes {
  groupId: string;
}

const GroupRoutingButton = ({ groupId }: groupRoutingPropTypes) => {
  const navigate = useNavigate();
  const handleOnClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/group/${groupId}`);
  };

  return (
    <GroupRoutingWrapper>
      <CuriousGroupText>
        이 모임에 대해서
        <br /> 더 궁금하신가요?
      </CuriousGroupText>
      <Spacing marginBottom="1.6" />
      <GroupRoutingBtnLayout>
        <MainGroupRoutingBtnIcon onClick={(e) => handleOnClick(e)} />
      </GroupRoutingBtnLayout>
    </GroupRoutingWrapper>
  );
};

export default GroupRoutingButton;

const GroupRoutingWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 4.2rem;

  text-align: center;
`;

const CuriousGroupText = styled.p`
  width: 12.3rem;

  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title8};
`;

const GroupRoutingBtnLayout = styled.div`
  & > svg {
    cursor: pointer;
  }

  & > svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.mileViolet};
    }
  }
`;
