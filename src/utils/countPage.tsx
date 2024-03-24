//count는 전체 배열의 개수, page는 한 페이지
export const slicePage = (count: number, chunk: number, allocatedCount: number) => {
  const pageCount = Math.ceil(count / allocatedCount);
  const pageArray = Array.from({ length: pageCount }, (_, index) => index + 1);
  const resultArray: number[] = [];

  for (let i = 1; i < allocatedCount + 1; i++) {
    //페이지에 있는 값이 마지막 값이 아니고, 페이지에 있는 값이 0보다 크면
    if (
      allocatedCount * (chunk - 1) + i <= pageArray[pageArray.length - 1] &&
      allocatedCount * (chunk - 1) + i > 0
    ) {
      resultArray.push(allocatedCount * (chunk - 1) + i);
    }
  }
  const isExistNextPage =
    resultArray[resultArray.length - 1] === pageArray[pageArray.length - 1] ? false : true;
  const isExistPreviousPage = resultArray[0] === 1 ? false : true;

  return { resultArray, isExistNextPage, isExistPreviousPage };
};
