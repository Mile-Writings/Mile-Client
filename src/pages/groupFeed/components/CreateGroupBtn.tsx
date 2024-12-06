import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MakeGroupPlusBtn, MakeGroupPlusHoverBtn } from '../../../assets/svgs';
import { FullModal, FullModalBtn } from '../../../components/commons/modal/FullModal';
import useModal from '../../../hooks/useModal';
import { MODAL } from '../constants/modalContent';
import { CreateGroupBtnWrapper } from '../../../components/commons/HeaderButton';

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
      navigate('/group/create');
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
        content={MODAL.ALERT_GROUP_LIMIT}
        onClickBg={handleCloseModal}
      >
        <FullModalBtn
          isPrimary={false}
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
