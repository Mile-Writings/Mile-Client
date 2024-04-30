import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ArrowLeftIc, ArrowRightIc } from '../../assets/svgs';
import { slicePage } from '../../utils/countPage';
import PageNumber from '../../utils/PageNumber';

interface pagenationPropTypes {
  count: number;
  allocatedCount: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  activePage: number;
}

const Pagenation = ({ count, allocatedCount, setActivePage, activePage }: pagenationPropTypes) => {
  const [activeChunk, setActiveChunk] = useState(1);
  const { resultArray, isExistNextPage, isExistPreviousPage } = slicePage(
    count,
    activeChunk,
    allocatedCount,
  );

  useEffect(() => {
    setActivePage(5 * (activeChunk - 1) + 1);
  }, [activeChunk]);

  return (
    <PageWrapper>
      {activePage != 1 && (
        <ArrowLeftIc
          onClick={() =>
            isExistPreviousPage
              ? setActiveChunk(activeChunk - 1)
              : setActivePage((prev) => {
                  return prev - 1;
                })
          }
          style={{ cursor: 'pointer' }}
        />
      )}
      {resultArray.map((index) => (
        <PageNumber
          key={index + 1}
          isActive={activePage === index}
          onClick={() => {
            setActivePage(index);
          }}
        >
          {index}
        </PageNumber>
      ))}
      {isExistNextPage && (
        <ArrowRightIc
          onClick={() => {
            setActiveChunk(activeChunk + 1);
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
