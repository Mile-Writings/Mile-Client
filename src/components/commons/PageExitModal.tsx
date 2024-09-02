import { useEffect, useState } from 'react';

import { DefaultModal, DefaultModalBtn } from './modal/DefaultModal';
import useBlockPageExit from '../../hooks/useBlockPageExit';

const PageExitModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { blocker } = useBlockPageExit();

  useEffect(() => {
    setIsModalOpen(blocker.state === 'blocked');
  }, [blocker.state]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    blocker?.reset && blocker.reset();
  };

  return (
    <DefaultModal
      isModalOpen={isModalOpen}
      handleClickBg={handleCloseModal}
      content={`입력 중인 내용이 있습니다. \n페이지를 나가시겠습니까?`}
    >
      <DefaultModalBtn
        type="NEGATIVE"
        onClickLeft={() => {
          blocker?.proceed && blocker.proceed();
        }}
        onClickRight={handleCloseModal}
      />
    </DefaultModal>
  );
};

export default PageExitModal;
