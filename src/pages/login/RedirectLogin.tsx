import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useLoginService from './hooks/useLoginService';

const RedirectLogin = () => {
  const code: string = new URL(window.location.href).searchParams.get('code') || '';

  const navigate = useNavigate();

  const { mutate, data, isSuccess, isError } = useLoginService({ code, socialType: 'KAKAO' });

  const handleOnclickLogin = () => {
    mutate();
    if (isSuccess) {
      console.log(data);
      navigate('/');
    }
    console.log(data);
    if (isError) {
      console.log('Error');
    }
  };
  useEffect(() => {
    handleOnclickLogin();
  }, []);

  return <div>login</div>;
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
