import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    setIsModalOpen,
    showModal,
    closeModal,
  };
};

export default useModal;
