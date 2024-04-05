import { client } from '../../../utils/apis/axios';

export interface Members {
  writerNameId: string;
  writerName: string;
  postNumber: number;
  commentNumber: number;
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

const fetchMemberInfo = async (moimId: string, params: number) => {
  const token = localStorage.getItem('accessToken');
  try {
    const { data } = await client.get<FetchMemberPropTypes>(
      `/api/moim/:${moimId}/writerNameList?page=${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(data);
    return data.data;
  } catch (error) {
    console.error();
  }
};

export default fetchMemberInfo;
