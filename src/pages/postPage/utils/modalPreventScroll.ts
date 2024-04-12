// 모달이 열리면 배경 스크롤 방지
export const preventScroll = () => {
  const currentScrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${currentScrollY}px`;
  document.body.style.overflowY = 'scroll';
  return currentScrollY;
};

// 모달이 닫히면 스크롤 리셋
export const allowScroll = () => {
  const prevScrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, parseInt(prevScrollY || '0', 10) * -1);
};
