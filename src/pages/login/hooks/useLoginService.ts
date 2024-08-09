import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import loginService from '../apis/loginService';
import { LoginProps } from '../types/loginType';

export const useLoginService = ({ code, socialType }: LoginProps) => {
  const navigate = useNavigate();
  const beforePathname = localStorage.getItem('beforePathname');
  return useMutation({
    mutationFn: () => loginService(code, socialType),
    mutationKey: ['login'],
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);

      if (beforePathname) {
        localStorage.removeItem('beforePathname');
        navigate(beforePathname);
      } else {
        navigate('/');
      }
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        if (err.response.status === 400) {
          alert(err.response.data.message);
          navigate('/error');
        } else {
          console.error();
        }
      }
    },
  });
};

export default useLoginService;
