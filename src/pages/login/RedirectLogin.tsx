import { useEffect } from 'react';

import useLoginService from './hooks/useLoginService';

import Loading from '../loading/Loading';

const RedirectLogin = () => {
  const code: string = new URL(window.location.href).searchParams.get('code') || '';
  console.log(code);
  const { mutate } = useLoginService({ code, socialType: 'KAKAO' });
  useEffect(() => {
    mutate();
  }, [mutate]);
  return <Loading />;
};

export default RedirectLogin;
// axios로 구현한거 refactoring한 부분이라 남겨둘게요~
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const { accessToken } = await loginService({
//         authorizationCode: code,
//         socialType: 'KAKAO',
//       });

//       if (accessToken) {
//         console.log(accessToken);
//         localStorage.setItem('accessToken', accessToken);
//         navigate('/');
//       } else {
//         console.error('No data received from loginService');
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   fetchData();
// }, [code]);
