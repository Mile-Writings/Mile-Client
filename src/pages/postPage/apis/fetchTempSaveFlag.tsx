import { client } from '../../../utils/apis/axios';

export const fetchTempSaveFlag = async (moimId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get(`api/moim/${moimId}/temporary`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
