import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    console.log(isModalOpen);
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
