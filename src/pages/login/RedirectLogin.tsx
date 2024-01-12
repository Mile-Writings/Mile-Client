import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import loginService from './queries/loginService';
// import { client } from '../../utils/apis/axios';
const RedirectLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code') || '';
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { accessToken } = await loginService({
          authorizationCode: code,
          socialType: 'KAKAO',
        });

        if (accessToken) {
          console.log(accessToken);
          localStorage.setItem('accessToken', accessToken);
          navigate('/');
        } else {
          console.error('No data received from loginService');
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [code]);

  return <div>RedirectLogin</div>;
};

export default RedirectLogin;
