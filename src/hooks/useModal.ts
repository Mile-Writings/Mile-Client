import { useEffect, useState } from 'react';
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

  useEffect(() => {
    !isModalOpen && allowScroll();
  }, [isModalOpen]);

  return {
    isModalOpen,
    setIsModalOpen,
    handleShowModal,
    handleCloseModal,
  };
};

export default useModal;
