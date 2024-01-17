import { useEffect } from 'react';

import useLoginService from './hooks/useLoginService';

const RedirectLogin = () => {
  const code: string = new URL(window.location.href).searchParams.get('code') || '';

  const { mutate } = useLoginService({ code, socialType: 'KAKAO' });
  useEffect(() => {
    mutate();
  }, [mutate]);
  return <div>loading...</div>;
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
