import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateLoginWithPath = () => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const handleOnclick = () => {
    navigate('/login', { state: pathname });
  };
  return {
    navigateToLogin: handleOnclick,
  };
};

export default useNavigateLoginWithPath;
