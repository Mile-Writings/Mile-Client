import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MainGroupRoutingBtn as MainGroupRoutingBtnIcon } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface curiousGroupPropTypes {
  groupId: string;
}

const CuriousGroup = ({ groupId }: curiousGroupPropTypes) => {
  const navigate = useNavigate();
  const handleOnClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/group/${groupId}`);
  };

  return (
    <CuriousContentContainer>
      <CuriousGroupText>
        이 모임에 대해서
        <br /> 더 궁금하신가요?
      </CuriousGroupText>
      <Spacing marginBottom="1.6" />
      <GroupRoutingBtnBox>
        <MainGroupRoutingBtnIcon onClick={(e) => handleOnClick(e)} />
      </GroupRoutingBtnBox>
    </CuriousContentContainer>
  );
};

export default CuriousGroup;

const CuriousContentContainer = styled.section`
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

const GroupRoutingBtnBox = styled.div`
  &:hover {
    path {
      fill: ${({ theme }) => theme.colors.mileViolet};
    }
  }
`;
