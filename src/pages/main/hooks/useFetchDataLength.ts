import { useEffect, useState } from 'react';

import { getGroupContent } from '../apis/getGroupContent';

export const useFetchDataLength = () => {
  const [dataLength, setDataLength] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getGroupContent();
        if (response !== undefined) setDataLength(response.length);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return dataLength;
};
