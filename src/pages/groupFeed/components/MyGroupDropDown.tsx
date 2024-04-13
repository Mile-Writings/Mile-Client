import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Moim } from '../apis/fetchHeaderGroup';
import { useFetchHeaderGroup } from '../hooks/queries';

import useClickOutside from '../../../hooks/useClickOutside';

const MyGroupDropDown = () => {
  const navigate = useNavigate();
  const { data } = useFetchHeaderGroup();
  const handleRoutingGroupFeed = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef(null);
  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };
  const handleOutSideClick = () => {
    setIsOpen(false);
  };

  // 기존 커스텀 훅 재사용 - 바깥 영역 클릭시 드롭다운 닫힘
  useClickOutside(dropDownRef, handleOutSideClick);

  return (
    <MyGroupDropDownWrapper ref={dropDownRef}>
      <MyGroupBtnLayout onClick={handleOnClick}>내 글 모임</MyGroupBtnLayout>
      <MyGroupListLayout $isOpen={isOpen}>
        {data ? (
          data.data.moims.map(({ moimId, moimName }: Moim) => (
            <GroupContentContainer
              $isEmpty={false}
              key={moimId}
              onClick={() => handleRoutingGroupFeed(moimId)}
            >
              {moimName}
            </GroupContentContainer>
          ))
        ) : (
          <GroupContentContainer
            $isEmpty={true}
          >{`가입한 글 모임이\n 없습니다.`}</GroupContentContainer>
        )}
      </MyGroupListLayout>
    </MyGroupDropDownWrapper>
  );
};

export default MyGroupDropDown;

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
    transform: scale(0.95);
    border-radius: 0.8rem;

    transition: 0.5s;
  }

  :active {
    transform: scale(1.1);

    transition: 0.5s;
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
  cursor: pointer;
  border: ${({ theme }) => theme.colors.grayViolet};
  border-radius: 0.8rem;
`;

const GroupContentContainer = styled.div<{ $isEmpty: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 15.2em;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};
  line-height: ${({ $isEmpty }) => ($isEmpty ? '150%' : '120%')};
  white-space: pre-line;
  text-align: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'left')};

  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body1};

  &:hover {
    color: ${({ theme }) => theme.colors.black};

    background-color: ${({ theme }) => theme.colors.gray10};

    ${({ theme }) => theme.fonts.subtitle6};
  }
`;
