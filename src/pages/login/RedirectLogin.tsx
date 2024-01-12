import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import loginService from './queries/loginService';
// import { client } from '../../utils/apis/axios';
const RedirectLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code') || '';
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const data = loginService({ authorizationCode: code, socialType: 'KAKAO' });
      console.log(data);

      // localStorage.setItem('accessToken', accessToken);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  }, []);
  return <div>RedirectLogin</div>;
};

export default RedirectLogin;
