import { useState } from 'react';
import { preventScroll, allowScroll } from '../pages/postPage/utils/modalPreventScroll';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
    preventScroll();
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    allowScroll();
  };

  return {
    isModalOpen,
    handleShowModal,
    handleCloseModal,
  };
};

export default useModal;
