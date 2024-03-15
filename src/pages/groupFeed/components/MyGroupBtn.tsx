import styled from '@emotion/styled';
import { useRef, useState } from 'react';

import { MYGROUP } from '../constants/MYGROUP';

const MyGroupBtn = () => {
  // const navigate = useNavigate();
  // const handleRoutingGroupFeed = () => {
  //   navigate(`/group/MQ==`);
  // };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef(null);
  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MyGroupDropDownWrapper ref={dropDownRef}>
      <MyGroupBtnLayout onClick={handleOnClick}>내 글 모임</MyGroupBtnLayout>
      <MyGroupListLayout $isOpen={isOpen}>
        {MYGROUP.map(({ data }) =>
          data.groups.map(({ groupId, groupName }) => (
            <GroupContentContainer key={groupId}>{groupName}</GroupContentContainer>
          )),
        )}
      </MyGroupListLayout>
    </MyGroupDropDownWrapper>
  );
};

export default MyGroupBtn;

const MyGroupDropDownWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyGroupBtnLayout = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9.5rem;
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  cursor: pointer;

  ${({ theme }) => theme.fonts.subtitle6}

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.gray10};
    border-radius: 0.8rem;
  }
`;

const MyGroupListLayout = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 6rem;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 16%);
  border: ${({ theme }) => theme.colors.grayViolet};
  border-radius: 0.8rem;
`;

const GroupContentContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};

  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body1};

  &:hover {
    color: ${({ theme }) => theme.colors.black};

    background-color: ${({ theme }) => theme.colors.gray10};
    ${({ theme }) => theme.fonts.subtitle6};
  }
`;
