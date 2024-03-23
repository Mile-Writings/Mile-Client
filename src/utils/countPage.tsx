import Pagenation from './Pagenation';

export const countPage = (count: number) => {
  return (
    <div>
      <Pagenation count={count} />
    </div>
  );
};

export const slicePage = (count: number, page: number) => {
  const resultArray: number[] = [];
  for (let i = 1; i < 6; i++) {
    if (5 * (page - 1) + i <= count && 5 * (page - 1) + i > 0) {
      resultArray.push(5 * (page - 1) + i);
    }
  }

  const isExistNextPage = resultArray[resultArray.length - 1] === count ? false : true;
  const isExistPreviousPage = resultArray[0] === 1 ? false : true;

  return { resultArray, isExistNextPage, isExistPreviousPage };
};
