import { useMutation } from '@tanstack/react-query';
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
  return useMutation({
    mutationFn: () => loginService(code, socialType),
    mutationKey: ['login'],
    onSuccess: (data) => {
      console.log('success');
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/');
    },
  });
};

export default useLoginService;
