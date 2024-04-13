import { devClient } from '../../../utils/apis/axios';

export interface Members {
  writerNameId: string;
  writerName: string;
  postCount: number;
  commentCount: number;
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

export interface MemberPropTypes {
  writerNameCount: number;
  writerNameList: Members[];
}

const fetchMemberInfo = async (groupId: string, page: number) => {
  try {
    const token = localStorage.getItem('accessToken');
    const data = await devClient.get<FetchMemberPropTypes>(
      `/api/moim/${groupId}/writerNameList?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(data, 'data');
    return data.data;
  } catch (error) {
    console.error();
  }
};

export default fetchMemberInfo;
