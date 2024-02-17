import { useState } from 'react';

import getGroupContentApi from '../../../utils/apis/getGroupContentApi';

export const useFetchDataLength = () => {
  const [dataLength, setDataLength] = useState<number>(0);

  const getData = async () => {
    try {
      const response = await getGroupContentApi();
      if (response !== undefined) setDataLength(response.length);
    } catch (error) {
      console.error(error);
    }
  };
  getData();

  return dataLength;
};
