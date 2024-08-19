import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MakeGroupPlusBtn, MakeGroupPlusHoverBtn } from '../../../assets/svgs';
import FullModal from '../../../components/commons/modal/FullModal';
import FullModalBtn from '../../../components/commons/modal/FullModalBtn';
import useModal from '../../../hooks/useModal';

interface groupCountProps {
  groupCount: number;
}

const CreateGroupBtn = ({ groupCount }: groupCountProps) => {
  const [showHoverIcon, setShowHoverIcon] = useState(false);
  // modal 열고닫음
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();
  const navigate = useNavigate();

  const handleCreateGroupBtn = () => {
    if (groupCount < 5) {
      navigate('/createGroup');
    } else {
      handleShowModal();
    }
  };

  return (
    <>
      <CreateGroupBtnWrapper
        onMouseOver={() => setShowHoverIcon(true)}
        onMouseLeave={() => setShowHoverIcon(false)}
        onClick={handleCreateGroupBtn}
      >
        {showHoverIcon ? <MakeGroupPlusHoverBtn /> : <MakeGroupPlusBtn />} 글모임 만들기
      </CreateGroupBtnWrapper>
      <FullModal
        isModalOpen={isModalOpen}
        content="글모임은 최대 5개까지 가입할 수 있습니다."
        handleClickBg={handleCloseModal}
      >
        <FullModalBtn
          isTop={false}
          content="확인"
          onClick={() => {
            handleCloseModal();
          }}
        />
      </FullModal>
    </>
  );
};

export default CreateGroupBtn;

const CreateGroupBtnWrapper = styled.button`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;

  background-color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  border-radius: 8px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 16%);
    transform: scale(0.95);

    transition: 0.5s;
  }
  ${({ theme }) => theme.fonts.button3};

  :active {
    transform: scale(1.1);

    transition: 0.5s;
  }
`;
