//totalCount는 전체 배열의 개수, chunk는 한 묶음, allocatedCount는 한 묶음당의 배열 수
export const slicePage = (totalCount: number, chunk: number, allocatedCount: number) => {
  //pageCount로 나올 수 있는 최대 페이지 수를 구하고, 1부터 pageCount를 담은 배열을 만든다
  const pageCount = Math.ceil(totalCount / allocatedCount);
  const pageArray = Array.from({ length: pageCount }, (_, index) => index + 1);
  const resultArray: number[] = [];

  for (let i = 1; i < allocatedCount + 1; i++) {
    //값이 마지막 페이지값보다 작거나 같고, 0보다 클때
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
