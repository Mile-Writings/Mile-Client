import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import loginService from '../apis/loginService';
import { LoginProps } from '../types/loginType';

export const useLoginService = ({ code, socialType }: LoginProps) => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => loginService(code, socialType),
    mutationKey: ['login'],
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['products'] });
      localStorage.setItem('accessToken', data.accessToken);
      if (localStorage.getItem('history')) {
        navigate(`${localStorage.getItem('history')}`);
      } else {
        navigate('/');
      }
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        if (err.response.status === 400) {
          navigate('/login');
        } else {
          console.error();
        }
      }
    },
  });
};

export default useLoginService;
