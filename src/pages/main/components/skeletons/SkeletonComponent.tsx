import { useEffect, useState } from 'react';

import CarouselSkeleton from '../CarouselSkeleton';

import getGroupContentApi from '../../../../utils/apis/getGroupContentApi';

export const SkeletonComponent = () => {
  const [groupLength, setGroupLength] = useState<number>(0);

  useEffect(() => {
    const fetchGroupLength = async () => {
      try {
        const data = await getGroupContentApi();
        if (data != undefined) setGroupLength(data?.length);
      } catch (err) {
        console.error();
      }
    };
    fetchGroupLength();
  });

  return (
    <>
      {Array.from({ length: groupLength }).map((_, index) => (
        <CarouselSkeleton key={index} />
      ))}
    </>
  );
};
