import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    handleShowModal,
    handleCloseModal,
  };
};

export default useModal;
