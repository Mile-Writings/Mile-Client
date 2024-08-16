import { authClient } from '../../../utils/apis/axios';

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
    const data = await authClient.get<HeaderGroupPropTypes>(`/api/user/moims`);

    return data.data;
  } catch {
    console.error();
  }
};
