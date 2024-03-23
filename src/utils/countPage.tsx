import styled from '@emotion/styled';
import React from 'react';

import Pagenation from './Pagenation';

export const countPage = (count: number) => {
  return (
    <div>
      <Pagenation count={count} />
    </div>
  );
};

export const slicePage = (count: number, page: number) => {
  const resultArray: number[] = [1, 2, 3, 4, 5];
  //   for (let i = 0; i < count; i++) {
  //     resultArray.push(page * 5 + i);
  //   }
  const isExistNextPage = resultArray[length - 1] < count ? true : false;
  const isExistPreviousPage = resultArray[0] === 1 ? false : true;
  return { resultArray, isExistNextPage, isExistPreviousPage };
};
