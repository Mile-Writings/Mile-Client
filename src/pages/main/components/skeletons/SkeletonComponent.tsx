import { useEffect, useState } from 'react';

import { carouselItemPropTypes } from '../Carousel';
import CarouselSkeleton from '../CarouselSkeleton';

import getGroupContentApi from '../../apis/getGroupContentApi';
import { useGetGroupContent } from '../../hooks/queries';

export const SkeletonComponent = ({ moimId }: carouselItemPropTypes) => {
  const [groupLength, setGroupLength] = useState<number>(0);
  const { data } = useGetGroupContent(moimId || '');
  console.log(data);

  useEffect(() => {
    const fetchGroupLength = async () => {
      try {
        const data = await getGroupContentApi();
        if (data) setGroupLength(data?.length);
      } catch (err) {
        console.error();
      }
    };
    fetchGroupLength();
  }, [groupLength]);

  return (
    <>
      {Array.from({ length: groupLength }).map((_, index) => (
        <CarouselSkeleton key={index} />
      ))}
    </>
  );
};
