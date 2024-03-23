import styled from '@emotion/styled';
import React, { useState } from 'react';

import { slicePage } from './countPage';
import PageNumber from './PageNumber';

const Pagenation = ({ count }: { count: number }) => {
  const { resultArray } = slicePage(count, 2);
  const [activeCount, setActiveCount] = useState(1);
  return (
    <PageWrapper>
      {resultArray.map((index) => (
        <PageNumber
          key={index}
          isActive={activeCount === index}
          onClick={() => setActiveCount(index)}
        >
          {index}
        </PageNumber>
      ))}
    </PageWrapper>
  );
};

export default Pagenation;

const PageWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
`;
