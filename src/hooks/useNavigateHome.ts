import { useNavigate } from 'react-router-dom';

const useNavigateToHome = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return {
    navigateToHome: handleOnClick,
  };
};

export default useNavigateToHome;
