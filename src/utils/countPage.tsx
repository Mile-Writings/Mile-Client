import Pagenation from './Pagenation';

export const countPage = (count: number) => {
  return (
    <div>
      <Pagenation count={count} />
    </div>
  );
};

export const slicePage = (count: number, page: number) => {
  // const resultArray: number[] = [];
  // for (let i = 1; i < count; i++) {
  //   resultArray.push(page * 5 + i);
  // }
  // 1 1 2 3 4 5
  // 2 6 7 8 9 10
  const resultArray: number[] = [
    5 * (page - 1) + 1,
    5 * (page - 1) + 2,
    5 * (page - 1) + 3,
    5 * (page - 1) + 4,
    5 * (page - 1) + 5,
  ];
  console.log(resultArray, 'dfd');
  const isExistNextPage = resultArray[resultArray.length - 1] < count ? true : false;
  const isExistPreviousPage = resultArray[0] === 1 ? false : true;
  return { resultArray, isExistNextPage, isExistPreviousPage };
};
