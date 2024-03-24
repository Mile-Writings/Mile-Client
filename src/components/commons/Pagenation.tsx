import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { ArrowLeftIc, ArrowRightIc } from '../../assets/svgs';
import { slicePage } from '../../utils/countPage';
import PageNumber from '../../utils/PageNumber';

const Pagenation = ({ count, allocatedCount }: { count: number; allocatedCount: number }) => {
  const [activePage, setActivePage] = useState(1);
  const [activeCount, setActiveCount] = useState(1);

  const { resultArray, isExistNextPage, isExistPreviousPage } = slicePage(
    count,
    activePage,
    allocatedCount,
  );

  useEffect(() => {
    setActiveCount(5 * (activePage - 1) + 1);
  }, [activePage]);

  return (
    <PageWrapper>
      {activeCount != 1 && (
        <ArrowLeftIc
          onClick={() =>
            isExistPreviousPage
              ? setActivePage(activePage - 1)
              : setActiveCount((prev) => {
                  return prev - 1;
                })
          }
          style={{ cursor: 'pointer' }}
        />
      )}
      {resultArray.map((index) => (
        <PageNumber
          key={index + 1}
          isActive={activeCount === index}
          onClick={() => setActiveCount(index)}
        >
          {index}
        </PageNumber>
      ))}
      {isExistNextPage && (
        <ArrowRightIc
          onClick={() => {
            setActivePage(activePage + 1);
          }}
          style={{ cursor: 'pointer' }}
        />
      )}
    </PageWrapper>
  );
};

export default Pagenation;

const PageWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
`;
