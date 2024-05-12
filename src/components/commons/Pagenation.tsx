import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

import { ArrowLeftIc, ArrowRightIc } from '../../assets/svgs';
import { slicePage } from '../../utils/countPage';
import PageNumber from '../../utils/PageNumber';

interface pagenationPropTypes {
  count: number;
  allocatedCount: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  activePage: number;
  setActiveChunk: Dispatch<SetStateAction<number>>;
  activeChunk: number;
}

const Pagenation = ({
  count,
  allocatedCount,
  setActivePage,
  activePage,
  setActiveChunk,
  activeChunk,
}: pagenationPropTypes) => {
  const { resultArray, isExistNextPage, isExistPreviousPage } = slicePage(
    count,
    activeChunk,
    allocatedCount,
  );

  return (
    <PageWrapper>
      {activePage != 1 && (
        <ArrowLeftIc
          onClick={() => {
            if (isExistPreviousPage) {
              const newChunk = activeChunk - 1;
              setActiveChunk(newChunk);
              setActivePage(5 * (newChunk - 1) + 1);
            } else {
              setActivePage((prev) => prev - 1);
            }
          }}
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
            const newChunk = activeChunk + 1;
            setActiveChunk(newChunk);
            setActivePage(5 * (newChunk - 1) + 1);
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
