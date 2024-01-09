// import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// import { client } from '../../utils/apis/axios';
const RedirectLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {});

  return <div>RedirectLogin</div>;
};

export default RedirectLogin;
