import React from 'react';

import { slicePage } from './countPage';

const Pagenation = ({ count }: { count: number }) => {
  const { resultArray, isExistNextPage, isExistPreviousPage } = slicePage(count, 2);
  return;
};

export default Pagenation;
