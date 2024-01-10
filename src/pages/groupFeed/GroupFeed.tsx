import { useState } from 'react';

import styled from '@emotion/styled';

import Carousel from './carousel/Carousel';
import EachArticle from './carousel/EachArticle';
import Spacing from '../../components/commons/Spacing';

const GroupFeed = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);

  return (
    <>
      <Carousel activeCategoryId={activeCategoryId} setActiveCategoryId={setActiveCategoryId} />
      <Spacing marginBottom="3.2" />
      <Topic>글감자리입니다.최대 공백포함 15자입니다.</Topic>
      <Spacing marginBottom="0.8" />
      <TopicDescription>
        글감 소개 자리입니다. 최대 공백포함90자입니다. 글감 소개 자리입니다. 최대
        공백포함90자입니다. 글감 소개 자리입니다. 최대 공백포함90자입니다. 글감 소개 자리입니다.
        최대 공백포함90자입니다.
      </TopicDescription>
      <EachArticle />
    </>
  );
};

export default GroupFeed;

const Topic = styled.div`
  width: 63.1rem;

  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title5};
`;

const TopicDescription = styled.div`
  width: 63.1rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body3};
`;
