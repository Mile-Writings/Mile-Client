const logout = () => {
  localStorage.removeItem('accessToken');
};

export default logout;
