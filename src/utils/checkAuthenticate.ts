const checkAuthenticate = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};

export default checkAuthenticate;
