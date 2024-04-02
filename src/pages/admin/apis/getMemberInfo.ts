import { client } from '../../../utils/apis/axios';

export interface Members {
  writerNameId: string;
  writerName: string;
  Information: string;
}

export interface FetchMemberPropTypes {
  status: number;
  message: string;
  data: {
    pageNumber: number;
    writerNameCount: number;
    writerNameList: Members[];
  };
}

const getMemberInfo = async (moimId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const { data } = await client.get<FetchMemberPropTypes>(
      `/api/moim/:${moimId}/writerNameList?page=1`,
      {
        params: {
          page: Number,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data.data;
  } catch (error) {
    console.error();
  }
};

export default getMemberInfo;
