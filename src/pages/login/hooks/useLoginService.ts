import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import loginService from '../apis/loginService';
import { LoginProps } from '../types/loginType';
//추후 타입 필요할 지도 몰라서 넣어둠
// interface LoginType {
//   status: number;
//   message: string;
//   data: {
//     accessToken: string;
//   };
// }
export const useLoginService = ({ code, socialType }: LoginProps) => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => loginService(code, socialType),
    mutationKey: ['login'],
    onSuccess: (data) => {
      console.log('success');
      // queryClient.invalidateQueries({ queryKey: ['products'] });
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/');
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
