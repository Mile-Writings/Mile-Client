import { useEffect } from 'react';

import useLoginService from './hooks/useLoginService';

import Loading from '../loading/Loading';

const RedirectLogin = () => {
  const code: string = new URL(window.location.href).searchParams.get('code') || '';

  const { mutate } = useLoginService({ code, socialType: 'KAKAO' });
  useEffect(() => {
    mutate();
  }, [mutate]);
  return <Loading />;
};

export default RedirectLogin;
