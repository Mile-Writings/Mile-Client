export const copyLink = async (link: string) => {
  try {
    await navigator.clipboard.writeText(link);
    alert('초대 링크가 복사되었습니다.');
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    alert('클립보드 복사 실패');
  }
};
