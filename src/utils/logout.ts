const logout = () => {
  alert('로그아웃 되었습니다.');
  location.reload();
  localStorage.removeItem('accessToken');
};

export default logout;
