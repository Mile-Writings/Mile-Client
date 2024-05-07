import { client } from '../../../utils/apis/axios';

export interface HeaderGroupPropTypes {
  status: number;
  message: string;
  data: {
    moims: Moim[];
  };
}

export interface Moim {
  moimName: string;
  moimId: string;
}

export const fetchHeaderGroup = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const data = await client.get<HeaderGroupPropTypes>(`/api/user/moims`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data;
  } catch {
    console.error();
  }
};
