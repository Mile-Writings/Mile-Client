import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyGroupBtn } from '../../../components/commons/HeaderButton';
import { Moim } from '../apis/fetchHeaderGroup';

import useClickOutside from '../../../hooks/useClickOutside';

interface CreateGroupBtnProps {
  groupData: Moim[] | [];
}

const MyGroupDropDown = ({ groupData }: CreateGroupBtnProps) => {
  const navigate = useNavigate();
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
      <MyGroupBtn onClick={handleOnClick}>내 글 모임</MyGroupBtn>
      <MyGroupListLayout $isOpen={isOpen}>
        {groupData?.length > 0 ? (
          groupData.map(({ moimId, moimName }: Moim) => (
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
  width: 15.2rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};
  line-height: ${({ $isEmpty }) => ($isEmpty ? '150%' : '120%')};
  white-space: pre-line;
  text-align: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'left')};

  cursor: ${({ $isEmpty }) => ($isEmpty ? 'default' : 'cursor')};
  border-radius: 0.8rem;
  ${({ $isEmpty, theme }) => ($isEmpty ? theme.fonts.body9 : theme.fonts.body1)};

  &:hover {
    color: ${({ $isEmpty, theme }) => !$isEmpty && theme.colors.black};

    background-color: ${({ $isEmpty, theme }) => !$isEmpty && theme.colors.gray10};

    ${({ $isEmpty, theme }) => !$isEmpty && theme.fonts.subtitle6};
  }
`;
